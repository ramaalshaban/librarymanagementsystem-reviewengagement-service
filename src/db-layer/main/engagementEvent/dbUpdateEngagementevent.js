const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");
const { EngagementEvent } = require("models");

const { DBUpdateMongooseCommand } = require("dbCommand");

const {
  EngagementEventQueryCacheInvalidator,
} = require("./query-cache-classes");

const { ElasticIndexer } = require("serviceCommon");
const getEngagementEventById = require("./utils/getEngagementEventById");

class DbUpdateEngagementeventCommand extends DBUpdateMongooseCommand {
  constructor(input) {
    const instanceMode = true;
    input.isBulk = false;
    input.updateEach = false;
    super(input, EngagementEvent, instanceMode);
    this.commandName = "dbUpdateEngagementevent";
    this.nullResult = false;
    this.objectName = "engagementEvent";
    this.serviceLabel = "librarymanagementsystem-reviewengagement-service";
    this.joinedCriteria = false;
    this.dbEvent =
      "librarymanagementsystem-reviewengagement-service-dbevent-engagementevent-updated";
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
    this.queryCacheInvalidator = new EngagementEventQueryCacheInvalidator();
  }

  async indexDataToElastic() {
    const elasticIndexer = new ElasticIndexer(
      "engagementEvent",
      this.session,
      this.requestId,
    );
    const dbData = await getEngagementEventById(this.dbData.id);
    await elasticIndexer.indexData(dbData);
  }

  // ask about this should i rename the whereClause to dataClause???

  async setCalculatedFieldsAfterInstance(data) {
    const input = this.input;
  }
}

const dbUpdateEngagementevent = async (input) => {
  input.id = input.engagementEventId;
  const dbUpdateCommand = new DbUpdateEngagementeventCommand(input);
  return await dbUpdateCommand.execute();
};

module.exports = dbUpdateEngagementevent;
