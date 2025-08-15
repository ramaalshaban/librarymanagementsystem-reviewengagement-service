const { UpdateRecommendationManager } = require("managers");

const ReviewEngagementRestController = require("../../ReviewEngagementServiceRestController");

class UpdateRecommendationRestController extends ReviewEngagementRestController {
  constructor(req, res) {
    super("updateRecommendation", "updaterecommendation", req, res);
    this.dataName = "recommendation";
    this.crudType = "update";
    this.status = 200;
    this.httpMethod = "PATCH";
  }

  createApiManager() {
    return new UpdateRecommendationManager(this._req, "rest");
  }
}

const updateRecommendation = async (req, res, next) => {
  const updateRecommendationRestController =
    new UpdateRecommendationRestController(req, res);
  try {
    await updateRecommendationRestController.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = updateRecommendation;
