const { UpdateReviewManager } = require("managers");

const ReviewEngagementRestController = require("../../ReviewEngagementServiceRestController");

class UpdateReviewRestController extends ReviewEngagementRestController {
  constructor(req, res) {
    super("updateReview", "updatereview", req, res);
    this.dataName = "review";
    this.crudType = "update";
    this.status = 200;
    this.httpMethod = "PATCH";
  }

  createApiManager() {
    return new UpdateReviewManager(this._req, "rest");
  }
}

const updateReview = async (req, res, next) => {
  const updateReviewRestController = new UpdateReviewRestController(req, res);
  try {
    await updateReviewRestController.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = updateReview;
