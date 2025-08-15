// exsik olan :
//if exits update and if not exits create
//if index.onDuplicate == "throwError" throw error
//

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { Recommendation } = require("models");

const { DBCreateMongooseCommand } = require("dbCommand");

const {
  RecommendationQueryCacheInvalidator,
} = require("./query-cache-classes");

const { ElasticIndexer } = require("serviceCommon");
const getRecommendationById = require("./utils/getRecommendationById");

class DbCreateRecommendationCommand extends DBCreateMongooseCommand {
  constructor(input) {
    super(input);
    this.commandName = "dbCreateRecommendation";
    this.objectName = "recommendation";
    this.serviceLabel = "librarymanagementsystem-reviewengagement-service";
    this.dbEvent =
      "librarymanagementsystem-reviewengagement-service-dbevent-recommendation-created";
  }

  loadHookFunctions() {
    super.loadHookFunctions({});
  }

  async createQueryCacheInvalidator() {
    this.queryCacheInvalidator = new RecommendationQueryCacheInvalidator();
  }

  async indexDataToElastic() {
    const elasticIndexer = new ElasticIndexer(
      "recommendation",
      this.session,
      this.requestId,
    );
    const dbData = await getRecommendationById(this.dbData.id);
    await elasticIndexer.indexData(dbData);
  }

  // ask about this should i rename the whereClause to dataClause???

  async create_childs() {}

  async transposeResult() {
    // transpose dbData
  }

  async runDbCommand() {
    await super.runDbCommand();

    let recommendation = null;
    let whereClause = {};
    let updated = false;
    let exists = false;
    try {
      whereClause = {
        userId: this.dataClause.userId,
      };

      recommendation =
        recommendation || (await Recommendation.findOne(whereClause));

      if (recommendation) {
        delete this.dataClause.id;
        this.dataClause.isActive = true;
        if (!updated) await recommendation.update(this.dataClause);
        updated = true;
      }

      if (!updated && this.dataClause.id && !exists) {
        recommendation =
          recommendation || (await Recommendation.findById(this.dataClause.id));
        if (recommendation) {
          delete this.dataClause.id;
          this.dataClause.isActive = true;
          await recommendation.update(this.dataClause);
          updated = true;
        }
      }
    } catch (error) {
      const eDetail = {
        dataClause: this.dataClause,
        errorStack: error.stack,
        checkoutResult: this.input.checkoutResult,
      };
      throw new HttpServerError(
        "Error in checking unique index when creating Recommendation",
        eDetail,
      );
    }

    if (!updated && !exists) {
      recommendation = await Recommendation.create(this.dataClause);
    }

    this.dbData = recommendation.getData();
    this.input.recommendation = this.dbData;
    await this.create_childs();
  }
}

const dbCreateRecommendation = async (input) => {
  const dbCreateCommand = new DbCreateRecommendationCommand(input);
  return await dbCreateCommand.execute();
};

module.exports = dbCreateRecommendation;
