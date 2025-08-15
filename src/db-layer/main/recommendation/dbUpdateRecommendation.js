const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");
const { Recommendation } = require("models");

const { DBUpdateMongooseCommand } = require("dbCommand");

const {
  RecommendationQueryCacheInvalidator,
} = require("./query-cache-classes");

const { ElasticIndexer } = require("serviceCommon");
const getRecommendationById = require("./utils/getRecommendationById");

class DbUpdateRecommendationCommand extends DBUpdateMongooseCommand {
  constructor(input) {
    const instanceMode = true;
    input.isBulk = false;
    input.updateEach = false;
    super(input, Recommendation, instanceMode);
    this.commandName = "dbUpdateRecommendation";
    this.nullResult = false;
    this.objectName = "recommendation";
    this.serviceLabel = "librarymanagementsystem-reviewengagement-service";
    this.joinedCriteria = false;
    this.dbEvent =
      "librarymanagementsystem-reviewengagement-service-dbevent-recommendation-updated";
  }

  loadHookFunctions() {
    super.loadHookFunctions({});
  }

  initOwnership(input) {
    super.initOwnership(input);
  }

  async transposeResult() {
    // transpose dbData
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

  async setCalculatedFieldsAfterInstance(data) {
    const input = this.input;
  }
}

const dbUpdateRecommendation = async (input) => {
  input.id = input.recommendationId;
  const dbUpdateCommand = new DbUpdateRecommendationCommand(input);
  return await dbUpdateCommand.execute();
};

module.exports = dbUpdateRecommendation;
