const RecommendationManager = require("./RecommendationManager");
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
const { dbListRecommendations } = require("dbLayer");

class ListRecommendationsManager extends RecommendationManager {
  constructor(request, controllerType) {
    super(request, {
      name: "listRecommendations",
      controllerType: controllerType,
      pagination: true,
      defaultPageRowCount: 10,
      crudType: "getList",
      loginRequired: true,
      hasShareToken: false,
    });

    this.dataName = "recommendations";
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

    this.isOwner = this.recommendations?.userId === this.session.userId;
  }

  async doBusiness() {
    // Call DbFunction
    // make an awaited call to the dbListRecommendations function to getList the recommendations and return the result to the controller
    const recommendations = await dbListRecommendations(this);

    return recommendations;
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

module.exports = ListRecommendationsManager;
