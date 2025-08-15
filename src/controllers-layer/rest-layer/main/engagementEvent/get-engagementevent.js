const { GetEngagementEventManager } = require("managers");

const ReviewEngagementRestController = require("../../ReviewEngagementServiceRestController");

class GetEngagementEventRestController extends ReviewEngagementRestController {
  constructor(req, res) {
    super("getEngagementEvent", "getengagementevent", req, res);
    this.dataName = "engagementEvent";
    this.crudType = "get";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new GetEngagementEventManager(this._req, "rest");
  }
}

const getEngagementEvent = async (req, res, next) => {
  const getEngagementEventRestController = new GetEngagementEventRestController(
    req,
    res,
  );
  try {
    await getEngagementEventRestController.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = getEngagementEvent;
