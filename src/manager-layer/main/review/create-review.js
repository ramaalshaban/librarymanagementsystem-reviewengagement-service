const ReviewManager = require("./ReviewManager");
const { isValidObjectId, isValidUUID, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");
const { ReviewCreatedPublisher } = require("../../route-events/publishers");

const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");
const { dbCreateReview } = require("dbLayer");

class CreateReviewManager extends ReviewManager {
  constructor(request, controllerType) {
    super(request, {
      name: "createReview",
      controllerType: controllerType,
      pagination: false,
      crudType: "create",
      loginRequired: true,
      hasShareToken: false,
    });

    this.dataName = "review";
  }

  parametersToJson(jsonObj) {
    super.parametersToJson(jsonObj);
    jsonObj.bookId = this.bookId;
    jsonObj.userId = this.userId;
    jsonObj.rating = this.rating;
    jsonObj.reviewText = this.reviewText;
    jsonObj.status = this.status;
    jsonObj.moderatedByUserId = this.moderatedByUserId;
  }

  readRestParameters(request) {
    this.bookId = request.body?.bookId;
    this.userId = request.session?.userId;
    this.rating = request.body?.rating;
    this.reviewText = request.body?.reviewText;
    this.status = request.body?.status;
    this.moderatedByUserId = request.body?.moderatedByUserId;
    this.id = request.body?.id ?? request.query?.id ?? request.id;
    this.requestData = request.body;
    this.queryData = request.query ?? {};
    const url = request.url;
    this.urlPath = url.slice(1).split("/").join(".");
  }

  readMcpParameters(request) {
    this.bookId = request.mcpParams.bookId;
    this.userId = request.session.userId;
    this.rating = request.mcpParams.rating;
    this.reviewText = request.mcpParams.reviewText;
    this.status = request.mcpParams.status;
    this.moderatedByUserId = request.mcpParams.moderatedByUserId;
    this.id = request.mcpParams?.id;
    this.requestData = request.mcpParams;
  }

  async transformParameters() {}

  async setVariables() {}

  checkParameters() {
    if (this.bookId == null) {
      throw new BadRequestError("errMsg_bookIdisRequired");
    }

    if (this.userId == null) {
      throw new BadRequestError("errMsg_userIdisRequired");
    }

    if (this.rating == null) {
      throw new BadRequestError("errMsg_ratingisRequired");
    }

    if (this.reviewText == null) {
      throw new BadRequestError("errMsg_reviewTextisRequired");
    }

    if (this.status == null) {
      throw new BadRequestError("errMsg_statusisRequired");
    }

    // ID
    if (
      this.bookId &&
      !isValidObjectId(this.bookId) &&
      !isValidUUID(this.bookId)
    ) {
      throw new BadRequestError("errMsg_bookIdisNotAValidID");
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
    // make an awaited call to the dbCreateReview function to create the review and return the result to the controller
    const review = await dbCreateReview(this);

    return review;
  }

  async raiseEvent() {
    ReviewCreatedPublisher.Publish(this.output, this.session).catch((err) => {
      console.log("Publisher Error in Rest Controller:", err);
    });
  }

  async getDataClause() {
    const { newObjectId } = require("common");

    const { hashString } = require("common");

    if (this.id) this.reviewId = this.id;
    if (!this.reviewId) this.reviewId = newObjectId();

    const dataClause = {
      _id: this.reviewId,
      bookId: this.bookId,
      userId: this.userId,
      rating: this.rating,
      reviewText: this.reviewText,
      status: this.status,
      moderatedByUserId: this.moderatedByUserId,
    };

    return dataClause;
  }
}

module.exports = CreateReviewManager;
