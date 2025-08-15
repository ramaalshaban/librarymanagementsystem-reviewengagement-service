const ReviewManager = require("./ReviewManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const { ReviewDeletedPublisher } = require("../../route-events/publishers");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");
const { dbDeleteReview } = require("dbLayer");

class DeleteReviewManager extends ReviewManager {
  constructor(request, controllerType) {
    super(request, {
      name: "deleteReview",
      controllerType: controllerType,
      pagination: false,
      crudType: "delete",
      loginRequired: true,
      hasShareToken: false,
    });

    this.dataName = "review";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.reviewId = this.reviewId;
  }

  readRestParameters(request) {
    this.reviewId = request.params?.reviewId;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.reviewId = request.mcpParams.reviewId;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  async setVariables() {}

  async fetchInstance() {
    const { getReviewById } = require("dbLayer");
    this.review = await getReviewById(this.reviewId);
    if (!this.review) {
      throw new NotFoundError("errMsg_RecordNotFound");
    }
  }

  checkParameters() {
    if (this.reviewId == null) {
      throw new BadRequestError("errMsg_reviewIdisRequired");
    }

    // ID
    if (
      this.reviewId &&
      !isValidObjectId(this.reviewId) &&
      !isValidUUID(this.reviewId)
    ) {
      throw new BadRequestError("errMsg_reviewIdisNotAValidID");
    }
  }

  setOwnership() {
    this.isOwner = false;
    if (!this.session || !this.session.userId) return;

    this.isOwner = this.review?.userId === this.session.userId;
  }

  async doBusiness() {
    // Call DbFunction
    // make an awaited call to the dbDeleteReview function to delete the review and return the result to the controller
    const review = await dbDeleteReview(this);

    return review;
  }

  async raiseEvent() {
    ReviewDeletedPublisher.Publish(this.output, this.session).catch((err) => {
      console.log("Publisher Error in Rest Controller:", err);
    });
  }

  async getRouteQuery() {
    return { $and: [{ id: this.reviewId }, { isActive: true }] };

    // handle permission filter later
  }

  async getWhereClause() {
    const { convertUserQueryToMongoDbQuery } = require("common");

    const routeQuery = await this.getRouteQuery();
    return convertUserQueryToMongoDbQuery(routeQuery);
  }
}

module.exports = DeleteReviewManager;
