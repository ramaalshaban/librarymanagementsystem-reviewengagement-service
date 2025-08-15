const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { Recommendation } = require("models");
const { ObjectId } = require("mongoose").Types;

const { DBGetMongooseCommand } = require("dbCommand");

class DbGetRecommendationCommand extends DBGetMongooseCommand {
  constructor(input) {
    super(input, Recommendation);
    this.commandName = "dbGetRecommendation";
    this.nullResult = false;
    this.objectName = "recommendation";
    this.serviceLabel = "librarymanagementsystem-reviewengagement-service";
  }

  loadHookFunctions() {
    super.loadHookFunctions({});
  }

  async getCqrsJoins(data) {
    if (Recommendation.getCqrsJoins) {
      await Recommendation.getCqrsJoins(data);
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

const dbGetRecommendation = (input) => {
  input.id = input.recommendationId;
  const dbGetCommand = new DbGetRecommendationCommand(input);
  return dbGetCommand.execute();
};

module.exports = dbGetRecommendation;
