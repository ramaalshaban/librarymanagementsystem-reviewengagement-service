const EngagementEventManager = require("./EngagementEventManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");
const { dbDeleteEngagementevent } = require("dbLayer");

class DeleteEngagementEventManager extends EngagementEventManager {
  constructor(request, controllerType) {
    super(request, {
      name: "deleteEngagementEvent",
      controllerType: controllerType,
      pagination: false,
      crudType: "delete",
      loginRequired: true,
      hasShareToken: false,
    });

    this.dataName = "engagementEvent";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.engagementEventId = this.engagementEventId;
  }

  readRestParameters(request) {
    this.engagementEventId = request.params?.engagementEventId;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.engagementEventId = request.mcpParams.engagementEventId;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  async setVariables() {}

  async fetchInstance() {
    const { getEngagementEventById } = require("dbLayer");
    this.engagementEvent = await getEngagementEventById(this.engagementEventId);
    if (!this.engagementEvent) {
      throw new NotFoundError("errMsg_RecordNotFound");
    }
  }

  checkParameters() {
    if (this.engagementEventId == null) {
      throw new BadRequestError("errMsg_engagementEventIdisRequired");
    }

    // ID
    if (
      this.engagementEventId &&
      !isValidObjectId(this.engagementEventId) &&
      !isValidUUID(this.engagementEventId)
    ) {
      throw new BadRequestError("errMsg_engagementEventIdisNotAValidID");
    }
  }

  setOwnership() {
    this.isOwner = false;
    if (!this.session || !this.session.userId) return;

    this.isOwner = this.engagementEvent?._owner === this.session.userId;
  }

  async doBusiness() {
    // Call DbFunction
    // make an awaited call to the dbDeleteEngagementevent function to delete the engagementevent and return the result to the controller
    const engagementevent = await dbDeleteEngagementevent(this);

    return engagementevent;
  }

  async getRouteQuery() {
    return { $and: [{ id: this.engagementEventId }, { isActive: true }] };

    // handle permission filter later
  }

  async getWhereClause() {
    const { convertUserQueryToMongoDbQuery } = require("common");

    const routeQuery = await this.getRouteQuery();
    return convertUserQueryToMongoDbQuery(routeQuery);
  }
}

module.exports = DeleteEngagementEventManager;
