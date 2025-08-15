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
const { dbUpdateRecommendation } = require("dbLayer");

class UpdateRecommendationManager extends RecommendationManager {
  constructor(request, controllerType) {
    super(request, {
      name: "updateRecommendation",
      controllerType: controllerType,
      pagination: false,
      crudType: "update",
      loginRequired: true,
      hasShareToken: false,
    });

    this.dataName = "recommendation";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.recommendationId = this.recommendationId;
    jsonObj.bookIds = this.bookIds;
    jsonObj.generatedBy = this.generatedBy;
    jsonObj.contextInfo = this.contextInfo;
  }

  readRestParameters(request) {
    this.recommendationId = request.params?.recommendationId;
    this.bookIds = request.body?.bookIds;
    this.generatedBy = request.body?.generatedBy;
    this.contextInfo = request.body?.contextInfo;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.recommendationId = request.mcpParams.recommendationId;
    this.bookIds = request.mcpParams.bookIds;
    this.generatedBy = request.mcpParams.generatedBy;
    this.contextInfo = request.mcpParams.contextInfo;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  async setVariables() {}

  async fetchInstance() {
    const { getRecommendationById } = require("dbLayer");
    this.recommendation = await getRecommendationById(this.recommendationId);
    if (!this.recommendation) {
      throw new NotFoundError("errMsg_RecordNotFound");
    }
  }

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

    // ID
    if (
      this.bookIds &&
      !isValidObjectId(this.bookIds) &&
      !isValidUUID(this.bookIds)
    ) {
      throw new BadRequestError("errMsg_bookIdsisNotAValidID");
    }
  }

  setOwnership() {
    this.isOwner = false;
    if (!this.session || !this.session.userId) return;

    this.isOwner = this.recommendation?.userId === this.session.userId;
  }

  async doBusiness() {
    // Call DbFunction
    // make an awaited call to the dbUpdateRecommendation function to update the recommendation and return the result to the controller
    const recommendation = await dbUpdateRecommendation(this);

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

  async getDataClause() {
    const { hashString } = require("common");

    const dataClause = {
      bookIds: this.bookIds,
      generatedBy: this.generatedBy,
      contextInfo: this.contextInfo
        ? typeof this.contextInfo == "string"
          ? JSON.parse(this.contextInfo)
          : this.contextInfo
        : null,
    };

    return dataClause;
  }
}

module.exports = UpdateRecommendationManager;
