const { ListReviewsManager } = require("managers");

const ReviewEngagementRestController = require("../../ReviewEngagementServiceRestController");

class ListReviewsRestController extends ReviewEngagementRestController {
  constructor(req, res) {
    super("listReviews", "listreviews", req, res);
    this.dataName = "reviews";
    this.crudType = "getList";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new ListReviewsManager(this._req, "rest");
  }
}

const listReviews = async (req, res, next) => {
  const listReviewsRestController = new ListReviewsRestController(req, res);
  try {
    await listReviewsRestController.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = listReviews;
