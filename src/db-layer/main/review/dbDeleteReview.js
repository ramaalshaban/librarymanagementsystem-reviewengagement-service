const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");
// do i need to add the referring part or does the mongodb use the things differently
// is there specific approch to handle the referential integrity or it done interrenly
const { Review } = require("models");
const { ObjectId } = require("mongoose").Types;

const { ReviewQueryCacheInvalidator } = require("./query-cache-classes");

const { ElasticIndexer } = require("serviceCommon");

const { DBSoftDeleteMongooseCommand } = require("dbCommand");

class DbDeleteReviewCommand extends DBSoftDeleteMongooseCommand {
  constructor(input) {
    const instanceMode = true;
    super(input, Review, instanceMode);
    this.commandName = "dbDeleteReview";
    this.nullResult = false;
    this.objectName = "review";
    this.serviceLabel = "librarymanagementsystem-reviewengagement-service";
    this.dbEvent =
      "librarymanagementsystem-reviewengagement-service" +
      "-dbevent-" +
      "review-deleted";
  }

  loadHookFunctions() {
    super.loadHookFunctions({});
  }

  initOwnership(input) {
    super.initOwnership(input);
  }

  async createQueryCacheInvalidator() {
    this.queryCacheInvalidator = new ReviewQueryCacheInvalidator();
  }

  async indexDataToElastic() {
    const elasticIndexer = new ElasticIndexer(
      "review",
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

const dbDeleteReview = async (input) => {
  input.id = input.reviewId;
  const dbDeleteCommand = new DbDeleteReviewCommand(input);
  return dbDeleteCommand.execute();
};

module.exports = dbDeleteReview;
