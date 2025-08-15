const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");
// do i need to add the referring part or does the mongodb use the things differently
// is there specific approch to handle the referential integrity or it done interrenly
const { EngagementEvent } = require("models");
const { ObjectId } = require("mongoose").Types;

const {
  EngagementEventQueryCacheInvalidator,
} = require("./query-cache-classes");

const { ElasticIndexer } = require("serviceCommon");

const { DBSoftDeleteMongooseCommand } = require("dbCommand");

class DbDeleteEngagementeventCommand extends DBSoftDeleteMongooseCommand {
  constructor(input) {
    const instanceMode = true;
    super(input, EngagementEvent, instanceMode);
    this.commandName = "dbDeleteEngagementevent";
    this.nullResult = false;
    this.objectName = "engagementEvent";
    this.serviceLabel = "librarymanagementsystem-reviewengagement-service";
    this.dbEvent =
      "librarymanagementsystem-reviewengagement-service" +
      "-dbevent-" +
      "engagementevent-deleted";
  }

  loadHookFunctions() {
    super.loadHookFunctions({});
  }

  initOwnership(input) {
    super.initOwnership(input);
  }

  async createQueryCacheInvalidator() {
    this.queryCacheInvalidator = new EngagementEventQueryCacheInvalidator();
  }

  async indexDataToElastic() {
    const elasticIndexer = new ElasticIndexer(
      "engagementEvent",
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

const dbDeleteEngagementevent = async (input) => {
  input.id = input.engagementEventId;
  const dbDeleteCommand = new DbDeleteEngagementeventCommand(input);
  return dbDeleteCommand.execute();
};

module.exports = dbDeleteEngagementevent;
