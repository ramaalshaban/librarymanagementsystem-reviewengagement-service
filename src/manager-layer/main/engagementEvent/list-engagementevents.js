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
const { dbListEngagementevents } = require("dbLayer");

class ListEngagementEventsManager extends EngagementEventManager {
  constructor(request, controllerType) {
    super(request, {
      name: "listEngagementEvents",
      controllerType: controllerType,
      pagination: true,
      defaultPageRowCount: 30,
      crudType: "getList",
      loginRequired: true,
      hasShareToken: false,
    });

    this.dataName = "engagementEvents";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
  }

  readRestParameters(request) {
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  async setVariables() {}

  checkParameters() {}

  setOwnership() {
    this.isOwner = false;
    if (!this.session || !this.session.userId) return;

    this.isOwner = this.engagementEvents?._owner === this.session.userId;
  }

  async doBusiness() {
    // Call DbFunction
    // make an awaited call to the dbListEngagementevents function to getList the engagementevents and return the result to the controller
    const engagementevents = await dbListEngagementevents(this);

    return engagementevents;
  }

  async getRouteQuery() {
    return { $and: [{ isActive: true }] };

    // handle permission filter later
  }

  async getWhereClause() {
    const { convertUserQueryToMongoDbQuery } = require("common");

    const routeQuery = await this.getRouteQuery();
    return convertUserQueryToMongoDbQuery(routeQuery);
  }
}

module.exports = ListEngagementEventsManager;
