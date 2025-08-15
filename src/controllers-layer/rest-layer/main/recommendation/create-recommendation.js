const { CreateRecommendationManager } = require("managers");

const ReviewEngagementRestController = require("../../ReviewEngagementServiceRestController");

class CreateRecommendationRestController extends ReviewEngagementRestController {
  constructor(req, res) {
    super("createRecommendation", "createrecommendation", req, res);
    this.dataName = "recommendation";
    this.crudType = "create";
    this.status = 201;
    this.httpMethod = "POST";
  }

  createApiManager() {
    return new CreateRecommendationManager(this._req, "rest");
  }
}

const createRecommendation = async (req, res, next) => {
  const createRecommendationRestController =
    new CreateRecommendationRestController(req, res);
  try {
    await createRecommendationRestController.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = createRecommendation;
