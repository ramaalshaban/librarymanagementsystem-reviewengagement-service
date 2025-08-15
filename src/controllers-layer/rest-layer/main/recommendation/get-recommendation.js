const { GetRecommendationManager } = require("managers");

const ReviewEngagementRestController = require("../../ReviewEngagementServiceRestController");

class GetRecommendationRestController extends ReviewEngagementRestController {
  constructor(req, res) {
    super("getRecommendation", "getrecommendation", req, res);
    this.dataName = "recommendation";
    this.crudType = "get";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new GetRecommendationManager(this._req, "rest");
  }
}

const getRecommendation = async (req, res, next) => {
  const getRecommendationRestController = new GetRecommendationRestController(
    req,
    res,
  );
  try {
    await getRecommendationRestController.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = getRecommendation;
