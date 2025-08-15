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
const { dbGetRecommendation } = require("dbLayer");

class GetRecommendationManager extends RecommendationManager {
  constructor(request, controllerType) {
    super(request, {
      name: "getRecommendation",
      controllerType: controllerType,
      pagination: false,
      crudType: "get",
      loginRequired: true,
      hasShareToken: false,
    });

    this.dataName = "recommendation";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.recommendationId = this.recommendationId;
  }

  readRestParameters(request) {
    this.recommendationId = request.params?.recommendationId;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.recommendationId = request.mcpParams.recommendationId;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  async setVariables() {}

  checkParameters() {
    if (this.recommendationId == null) {
      throw new BadRequestError("errMsg_recommendationIdisRequired");
    }

    // ID
    if (
      this.recommendationId &&
      !isValidObjectId(this.recommendationId) &&
      !isValidUUID(this.recommendationId)
    ) {
      throw new BadRequestError("errMsg_recommendationIdisNotAValidID");
    }
  }

  setOwnership() {
    this.isOwner = false;
    if (!this.session || !this.session.userId) return;

    this.isOwner = this.recommendation?.userId === this.session.userId;
  }

  async doBusiness() {
    // Call DbFunction
    // make an awaited call to the dbGetRecommendation function to get the recommendation and return the result to the controller
    const recommendation = await dbGetRecommendation(this);

    return recommendation;
  }

  async getRouteQuery() {
    return { $and: [{ id: this.recommendationId }, { isActive: true }] };

    // handle permission filter later
  }

  async getWhereClause() {
    const { convertUserQueryToMongoDbQuery } = require("common");

    const routeQuery = await this.getRouteQuery();
    return convertUserQueryToMongoDbQuery(routeQuery);
  }
}

module.exports = GetRecommendationManager;
