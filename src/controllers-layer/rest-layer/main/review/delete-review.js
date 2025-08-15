const { DeleteReviewManager } = require("managers");

const ReviewEngagementRestController = require("../../ReviewEngagementServiceRestController");

class DeleteReviewRestController extends ReviewEngagementRestController {
  constructor(req, res) {
    super("deleteReview", "deletereview", req, res);
    this.dataName = "review";
    this.crudType = "delete";
    this.status = 200;
    this.httpMethod = "DELETE";
  }

  createApiManager() {
    return new DeleteReviewManager(this._req, "rest");
  }
}

const deleteReview = async (req, res, next) => {
  const deleteReviewRestController = new DeleteReviewRestController(req, res);
  try {
    await deleteReviewRestController.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = deleteReview;
