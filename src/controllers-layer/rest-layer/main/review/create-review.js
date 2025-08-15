const { CreateReviewManager } = require("managers");

const ReviewEngagementRestController = require("../../ReviewEngagementServiceRestController");

class CreateReviewRestController extends ReviewEngagementRestController {
  constructor(req, res) {
    super("createReview", "createreview", req, res);
    this.dataName = "review";
    this.crudType = "create";
    this.status = 201;
    this.httpMethod = "POST";
  }

  createApiManager() {
    return new CreateReviewManager(this._req, "rest");
  }
}

const createReview = async (req, res, next) => {
  const createReviewRestController = new CreateReviewRestController(req, res);
  try {
    await createReviewRestController.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = createReview;
