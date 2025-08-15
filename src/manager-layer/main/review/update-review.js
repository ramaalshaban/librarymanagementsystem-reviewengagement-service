const ReviewManager = require("./ReviewManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const { ReviewUpdatedPublisher } = require("../../route-events/publishers");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");
const { dbUpdateReview } = require("dbLayer");

class UpdateReviewManager extends ReviewManager {
  constructor(request, controllerType) {
    super(request, {
      name: "updateReview",
      controllerType: controllerType,
      pagination: false,
      crudType: "update",
      loginRequired: true,
      hasShareToken: false,
    });

    this.dataName = "review";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.reviewId = this.reviewId;
    jsonObj.rating = this.rating;
    jsonObj.reviewText = this.reviewText;
    jsonObj.status = this.status;
    jsonObj.moderatedByUserId = this.moderatedByUserId;
  }

  readRestParameters(request) {
    this.reviewId = request.params?.reviewId;
    this.rating = request.body?.rating;
    this.reviewText = request.body?.reviewText;
    this.status = request.body?.status;
    this.moderatedByUserId = request.body?.moderatedByUserId;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.reviewId = request.mcpParams.reviewId;
    this.rating = request.mcpParams.rating;
    this.reviewText = request.mcpParams.reviewText;
    this.status = request.mcpParams.status;
    this.moderatedByUserId = request.mcpParams.moderatedByUserId;
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

    if (this.status == null) {
      throw new BadRequestError("errMsg_statusisRequired");
    }

    // ID
    if (
      this.reviewId &&
      !isValidObjectId(this.reviewId) &&
      !isValidUUID(this.reviewId)
    ) {
      throw new BadRequestError("errMsg_reviewIdisNotAValidID");
    }

    // ID
    if (
      this.moderatedByUserId &&
      !isValidObjectId(this.moderatedByUserId) &&
      !isValidUUID(this.moderatedByUserId)
    ) {
      throw new BadRequestError("errMsg_moderatedByUserIdisNotAValidID");
    }
  }

  setOwnership() {
    this.isOwner = false;
    if (!this.session || !this.session.userId) return;

    this.isOwner = this.review?.userId === this.session.userId;
  }

  async doBusiness() {
    // Call DbFunction
    // make an awaited call to the dbUpdateReview function to update the review and return the result to the controller
    const review = await dbUpdateReview(this);

    return review;
  }

  async raiseEvent() {
    ReviewUpdatedPublisher.Publish(this.output, this.session).catch((err) => {
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

  async getDataClause() {
    const { hashString } = require("common");

    const dataClause = {
      rating: this.rating,
      reviewText: this.reviewText,
      status: this.status,
      moderatedByUserId: this.moderatedByUserId,
    };

    return dataClause;
  }
}

module.exports = UpdateReviewManager;
