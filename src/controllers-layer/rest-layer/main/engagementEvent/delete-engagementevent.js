const { DeleteEngagementEventManager } = require("managers");

const ReviewEngagementRestController = require("../../ReviewEngagementServiceRestController");

class DeleteEngagementEventRestController extends ReviewEngagementRestController {
  constructor(req, res) {
    super("deleteEngagementEvent", "deleteengagementevent", req, res);
    this.dataName = "engagementEvent";
    this.crudType = "delete";
    this.status = 200;
    this.httpMethod = "DELETE";
  }

  createApiManager() {
    return new DeleteEngagementEventManager(this._req, "rest");
  }
}

const deleteEngagementEvent = async (req, res, next) => {
  const deleteEngagementEventRestController =
    new DeleteEngagementEventRestController(req, res);
  try {
    await deleteEngagementEventRestController.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = deleteEngagementEvent;
