const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");

const { EngagementEvent } = require("models");
const { ObjectId } = require("mongoose").Types;

const { DBGetMongooseCommand } = require("dbCommand");

class DbGetEngagementeventCommand extends DBGetMongooseCommand {
  constructor(input) {
    super(input, EngagementEvent);
    this.commandName = "dbGetEngagementevent";
    this.nullResult = false;
    this.objectName = "engagementEvent";
    this.serviceLabel = "librarymanagementsystem-reviewengagement-service";
  }

  loadHookFunctions() {
    super.loadHookFunctions({});
  }

  async getCqrsJoins(data) {
    if (EngagementEvent.getCqrsJoins) {
      await EngagementEvent.getCqrsJoins(data);
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

const dbGetEngagementevent = (input) => {
  input.id = input.engagementEventId;
  const dbGetCommand = new DbGetEngagementeventCommand(input);
  return dbGetCommand.execute();
};

module.exports = dbGetEngagementevent;
