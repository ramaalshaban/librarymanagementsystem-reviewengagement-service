const { DeleteRecommendationManager } = require("managers");

const ReviewEngagementRestController = require("../../ReviewEngagementServiceRestController");

class DeleteRecommendationRestController extends ReviewEngagementRestController {
  constructor(req, res) {
    super("deleteRecommendation", "deleterecommendation", req, res);
    this.dataName = "recommendation";
    this.crudType = "delete";
    this.status = 200;
    this.httpMethod = "DELETE";
  }

  createApiManager() {
    return new DeleteRecommendationManager(this._req, "rest");
  }
}

const deleteRecommendation = async (req, res, next) => {
  const deleteRecommendationRestController =
    new DeleteRecommendationRestController(req, res);
  try {
    await deleteRecommendationRestController.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = deleteRecommendation;
