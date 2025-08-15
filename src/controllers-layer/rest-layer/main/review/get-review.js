const { GetReviewManager } = require("managers");

const ReviewEngagementRestController = require("../../ReviewEngagementServiceRestController");

class GetReviewRestController extends ReviewEngagementRestController {
  constructor(req, res) {
    super("getReview", "getreview", req, res);
    this.dataName = "review";
    this.crudType = "get";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new GetReviewManager(this._req, "rest");
  }
}

const getReview = async (req, res, next) => {
  const getReviewRestController = new GetReviewRestController(req, res);
  try {
    await getReviewRestController.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = getReview;
