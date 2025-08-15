const { ListRecommendationsManager } = require("managers");

const ReviewEngagementRestController = require("../../ReviewEngagementServiceRestController");

class ListRecommendationsRestController extends ReviewEngagementRestController {
  constructor(req, res) {
    super("listRecommendations", "listrecommendations", req, res);
    this.dataName = "recommendations";
    this.crudType = "getList";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new ListRecommendationsManager(this._req, "rest");
  }
}

const listRecommendations = async (req, res, next) => {
  const listRecommendationsRestController =
    new ListRecommendationsRestController(req, res);
  try {
    await listRecommendationsRestController.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = listRecommendations;
