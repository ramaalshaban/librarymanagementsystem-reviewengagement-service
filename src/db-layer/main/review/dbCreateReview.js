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

const { Review } = require("models");

const { DBCreateMongooseCommand } = require("dbCommand");

const { ReviewQueryCacheInvalidator } = require("./query-cache-classes");

const { ElasticIndexer } = require("serviceCommon");
const getReviewById = require("./utils/getReviewById");

class DbCreateReviewCommand extends DBCreateMongooseCommand {
  constructor(input) {
    super(input);
    this.commandName = "dbCreateReview";
    this.objectName = "review";
    this.serviceLabel = "librarymanagementsystem-reviewengagement-service";
    this.dbEvent =
      "librarymanagementsystem-reviewengagement-service-dbevent-review-created";
  }

  loadHookFunctions() {
    super.loadHookFunctions({});
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

  async create_childs() {}

  async transposeResult() {
    // transpose dbData
  }

  async runDbCommand() {
    await super.runDbCommand();

    let review = null;
    let whereClause = {};
    let updated = false;
    let exists = false;
    try {
      whereClause = {
        bookId: this.dataClause.bookId,
        userId: this.dataClause.userId,
      };

      review = review || (await Review.findOne(whereClause));

      if (review) {
        throw new BadRequestError(
          "errMsg_DuplicateIndexErrorWithFields:" + "bookId-userId",
        );
      }

      if (!updated && this.dataClause.id && !exists) {
        review = review || (await Review.findById(this.dataClause.id));
        if (review) {
          delete this.dataClause.id;
          this.dataClause.isActive = true;
          await review.update(this.dataClause);
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
        "Error in checking unique index when creating Review",
        eDetail,
      );
    }

    if (!updated && !exists) {
      review = await Review.create(this.dataClause);
    }

    this.dbData = review.getData();
    this.input.review = this.dbData;
    await this.create_childs();
  }
}

const dbCreateReview = async (input) => {
  const dbCreateCommand = new DbCreateReviewCommand(input);
  return await dbCreateCommand.execute();
};

module.exports = dbCreateReview;
