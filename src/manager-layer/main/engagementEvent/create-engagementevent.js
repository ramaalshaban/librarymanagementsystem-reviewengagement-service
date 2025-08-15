const EngagementEventManager = require("./EngagementEventManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const {
  EngagementeventCreatedPublisher,
} = require("../../route-events/publishers");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");
const { dbCreateEngagementevent } = require("dbLayer");

class CreateEngagementEventManager extends EngagementEventManager {
  constructor(request, controllerType) {
    super(request, {
      name: "createEngagementEvent",
      controllerType: controllerType,
      pagination: false,
      crudType: "create",
      loginRequired: true,
      hasShareToken: false,
    });

    this.dataName = "engagementEvent";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.userId = this.userId;
    jsonObj.eventType = this.eventType;
    jsonObj.eventTime = this.eventTime;
    jsonObj.details = this.details;
    jsonObj.bookId = this.bookId;
  }

  readRestParameters(request) {
    this.userId = request.body?.userId;
    this.eventType = request.body?.eventType;
    this.eventTime = request.body?.eventTime;
    this.details = request.body?.details;
    this.bookId = request.body?.bookId;
    this.id = request.body?.id ?? request.query?.id ?? request.id;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.userId = request.mcpParams.userId;
    this.eventType = request.mcpParams.eventType;
    this.eventTime = request.mcpParams.eventTime;
    this.details = request.mcpParams.details;
    this.bookId = request.mcpParams.bookId;
    this.id = request.mcpParams?.id;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  async setVariables() {}

  checkParameters() {
    if (this.eventType == null) {
      throw new BadRequestError("errMsg_eventTypeisRequired");
    }

    if (this.eventTime == null) {
      throw new BadRequestError("errMsg_eventTimeisRequired");
    }

    // ID
    if (
      this.userId &&
      !isValidObjectId(this.userId) &&
      !isValidUUID(this.userId)
    ) {
      throw new BadRequestError("errMsg_userIdisNotAValidID");
    }

    // ID
    if (
      this.bookId &&
      !isValidObjectId(this.bookId) &&
      !isValidUUID(this.bookId)
    ) {
      throw new BadRequestError("errMsg_bookIdisNotAValidID");
    }
  }

  setOwnership() {
    this.isOwner = false;
    if (!this.session || !this.session.userId) return;

    this.isOwner = this.engagementEvent?._owner === this.session.userId;
  }

  async doBusiness() {
    // Call DbFunction
    // make an awaited call to the dbCreateEngagementevent function to create the engagementevent and return the result to the controller
    const engagementevent = await dbCreateEngagementevent(this);

    return engagementevent;
  }

  async raiseEvent() {
    EngagementeventCreatedPublisher.Publish(this.output, this.session).catch(
      (err) => {
        console.log("Publisher Error in Rest Controller:", err);
      },
    );
  }

  async getDataClause() {
    const { newObjectId } = require("common");

    const { hashString } = require("common");

    if (this.id) this.engagementEventId = this.id;
    if (!this.engagementEventId) this.engagementEventId = newObjectId();

    const dataClause = {
      _id: this.engagementEventId,
      userId: this.userId,
      eventType: this.eventType,
      eventTime: this.eventTime,
      details: this.details
        ? typeof this.details == "string"
          ? JSON.parse(this.details)
          : this.details
        : null,
      bookId: this.bookId,
    };

    return dataClause;
  }
}

module.exports = CreateEngagementEventManager;
