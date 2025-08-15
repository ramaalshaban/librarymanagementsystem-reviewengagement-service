const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");
const { Review } = require("models");

const { DBUpdateMongooseCommand } = require("dbCommand");

const { ReviewQueryCacheInvalidator } = require("./query-cache-classes");

const { ElasticIndexer } = require("serviceCommon");
const getReviewById = require("./utils/getReviewById");

class DbUpdateReviewCommand extends DBUpdateMongooseCommand {
  constructor(input) {
    const instanceMode = true;
    input.isBulk = false;
    input.updateEach = false;
    super(input, Review, instanceMode);
    this.commandName = "dbUpdateReview";
    this.nullResult = false;
    this.objectName = "review";
    this.serviceLabel = "librarymanagementsystem-reviewengagement-service";
    this.joinedCriteria = false;
    this.dbEvent =
      "librarymanagementsystem-reviewengagement-service-dbevent-review-updated";
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
    this.queryCacheInvalidator = new ReviewQueryCacheInvalidator();
  }

  async indexDataToElastic() {
    const elasticIndexer = new ElasticIndexer(
      "review",
      this.session,
      this.requestId,
    );
    const dbData = await getReviewById(this.dbData.id);
    await elasticIndexer.indexData(dbData);
  }

  // ask about this should i rename the whereClause to dataClause???

  async setCalculatedFieldsAfterInstance(data) {
    const input = this.input;
  }
}

const dbUpdateReview = async (input) => {
  input.id = input.reviewId;
  const dbUpdateCommand = new DbUpdateReviewCommand(input);
  return await dbUpdateCommand.execute();
};

module.exports = dbUpdateReview;
