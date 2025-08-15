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

const { EngagementEvent } = require("models");

const { DBCreateMongooseCommand } = require("dbCommand");

const {
  EngagementEventQueryCacheInvalidator,
} = require("./query-cache-classes");

const { ElasticIndexer } = require("serviceCommon");
const getEngagementEventById = require("./utils/getEngagementEventById");

class DbCreateEngagementeventCommand extends DBCreateMongooseCommand {
  constructor(input) {
    super(input);
    this.commandName = "dbCreateEngagementevent";
    this.objectName = "engagementEvent";
    this.serviceLabel = "librarymanagementsystem-reviewengagement-service";
    this.dbEvent =
      "librarymanagementsystem-reviewengagement-service-dbevent-engagementevent-created";
  }

  loadHookFunctions() {
    super.loadHookFunctions({});
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

  async create_childs() {}

  async transposeResult() {
    // transpose dbData
  }

  async runDbCommand() {
    await super.runDbCommand();

    let engagementEvent = null;
    let whereClause = {};
    let updated = false;
    let exists = false;
    try {
      whereClause = {
        userId: this.dataClause.userId,
        eventTime: this.dataClause.eventTime,
      };

      engagementEvent =
        engagementEvent || (await EngagementEvent.findOne(whereClause));

      if (engagementEvent) {
        delete this.dataClause.id;
        this.dataClause.isActive = true;
        if (!updated) await engagementEvent.update(this.dataClause);
        updated = true;
      }

      if (!updated && this.dataClause.id && !exists) {
        engagementEvent =
          engagementEvent ||
          (await EngagementEvent.findById(this.dataClause.id));
        if (engagementEvent) {
          delete this.dataClause.id;
          this.dataClause.isActive = true;
          await engagementEvent.update(this.dataClause);
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
        "Error in checking unique index when creating EngagementEvent",
        eDetail,
      );
    }

    if (!updated && !exists) {
      engagementEvent = await EngagementEvent.create(this.dataClause);
    }

    this.dbData = engagementEvent.getData();
    this.input.engagementEvent = this.dbData;
    await this.create_childs();
  }
}

const dbCreateEngagementevent = async (input) => {
  const dbCreateCommand = new DbCreateEngagementeventCommand(input);
  return await dbCreateCommand.execute();
};

module.exports = dbCreateEngagementevent;
