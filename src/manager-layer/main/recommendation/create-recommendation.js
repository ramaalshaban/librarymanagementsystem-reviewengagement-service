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
const { dbCreateRecommendation } = require("dbLayer");

class CreateRecommendationManager extends RecommendationManager {
  constructor(request, controllerType) {
    super(request, {
      name: "createRecommendation",
      controllerType: controllerType,
      pagination: false,
      crudType: "create",
      loginRequired: true,
      hasShareToken: false,
    });

    this.dataName = "recommendation";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.userId = this.userId;
    jsonObj.bookIds = this.bookIds;
    jsonObj.generatedBy = this.generatedBy;
    jsonObj.contextInfo = this.contextInfo;
  }

  readRestParameters(request) {
    this.userId = request.session?.userId;
    this.bookIds = request.body?.bookIds;
    this.generatedBy = request.body?.generatedBy;
    this.contextInfo = request.body?.contextInfo;
    this.id = request.body?.id ?? request.query?.id ?? request.id;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.userId = request.session.userId;
    this.bookIds = request.mcpParams.bookIds;
    this.generatedBy = request.mcpParams.generatedBy;
    this.contextInfo = request.mcpParams.contextInfo;
    this.id = request.mcpParams?.id;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  async setVariables() {}

  checkParameters() {
    if (this.userId == null) {
      throw new BadRequestError("errMsg_userIdisRequired");
    }

    if (this.bookIds == null) {
      throw new BadRequestError("errMsg_bookIdsisRequired");
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
    // make an awaited call to the dbCreateRecommendation function to create the recommendation and return the result to the controller
    const recommendation = await dbCreateRecommendation(this);

    return recommendation;
  }

  async getDataClause() {
    const { newObjectId } = require("common");

    const { hashString } = require("common");

    if (this.id) this.recommendationId = this.id;
    if (!this.recommendationId) this.recommendationId = newObjectId();

    const dataClause = {
      _id: this.recommendationId,
      userId: this.userId,
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

module.exports = CreateRecommendationManager;
