const { UpdateEngagementEventManager } = require("managers");

const ReviewEngagementRestController = require("../../ReviewEngagementServiceRestController");

class UpdateEngagementEventRestController extends ReviewEngagementRestController {
  constructor(req, res) {
    super("updateEngagementEvent", "updateengagementevent", req, res);
    this.dataName = "engagementEvent";
    this.crudType = "update";
    this.status = 200;
    this.httpMethod = "PATCH";
  }

  createApiManager() {
    return new UpdateEngagementEventManager(this._req, "rest");
  }
}

const updateEngagementEvent = async (req, res, next) => {
  const updateEngagementEventRestController =
    new UpdateEngagementEventRestController(req, res);
  try {
    await updateEngagementEventRestController.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = updateEngagementEvent;
