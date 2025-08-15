const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");
// do i need to add the referring part or does the mongodb use the things differently
// is there specific approch to handle the referential integrity or it done interrenly
const { Recommendation } = require("models");
const { ObjectId } = require("mongoose").Types;

const {
  RecommendationQueryCacheInvalidator,
} = require("./query-cache-classes");

const { ElasticIndexer } = require("serviceCommon");

const { DBSoftDeleteMongooseCommand } = require("dbCommand");

class DbDeleteRecommendationCommand extends DBSoftDeleteMongooseCommand {
  constructor(input) {
    const instanceMode = true;
    super(input, Recommendation, instanceMode);
    this.commandName = "dbDeleteRecommendation";
    this.nullResult = false;
    this.objectName = "recommendation";
    this.serviceLabel = "librarymanagementsystem-reviewengagement-service";
    this.dbEvent =
      "librarymanagementsystem-reviewengagement-service" +
      "-dbevent-" +
      "recommendation-deleted";
  }

  loadHookFunctions() {
    super.loadHookFunctions({});
  }

  initOwnership(input) {
    super.initOwnership(input);
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
    await elasticIndexer.deleteData(this.dbData.id);
  }

  // ask about this should i rename the whereClause to dataClause???

  async transposeResult() {
    // transpose dbData
  }
}

const dbDeleteRecommendation = async (input) => {
  input.id = input.recommendationId;
  const dbDeleteCommand = new DbDeleteRecommendationCommand(input);
  return dbDeleteCommand.execute();
};

module.exports = dbDeleteRecommendation;
