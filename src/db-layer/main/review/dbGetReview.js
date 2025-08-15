const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { Review } = require("models");
const { ObjectId } = require("mongoose").Types;

const { DBGetMongooseCommand } = require("dbCommand");

class DbGetReviewCommand extends DBGetMongooseCommand {
  constructor(input) {
    super(input, Review);
    this.commandName = "dbGetReview";
    this.nullResult = false;
    this.objectName = "review";
    this.serviceLabel = "librarymanagementsystem-reviewengagement-service";
  }

  loadHookFunctions() {
    super.loadHookFunctions({});
  }

  async getCqrsJoins(data) {
    if (Review.getCqrsJoins) {
      await Review.getCqrsJoins(data);
    }
  }

  // populateQuery(query) {
  //  if (!this.input.getJoins) return query;
  //
  //  return query;
  //}

  initOwnership(input) {
    super.initOwnership(input);
  }

  async checkEntityOwnership(entity) {
    return true;
  }

  // ask about this should i rename the whereClause to dataClause???

  async transposeResult() {
    // transpose dbData
  }
}

const dbGetReview = (input) => {
  input.id = input.reviewId;
  const dbGetCommand = new DbGetReviewCommand(input);
  return dbGetCommand.execute();
};

module.exports = dbGetReview;
