const { ListEngagementEventsManager } = require("managers");

const ReviewEngagementRestController = require("../../ReviewEngagementServiceRestController");

class ListEngagementEventsRestController extends ReviewEngagementRestController {
  constructor(req, res) {
    super("listEngagementEvents", "listengagementevents", req, res);
    this.dataName = "engagementEvents";
    this.crudType = "getList";
    this.status = 200;
    this.httpMethod = "GET";
  }

  createApiManager() {
    return new ListEngagementEventsManager(this._req, "rest");
  }
}

const listEngagementEvents = async (req, res, next) => {
  const listEngagementEventsRestController =
    new ListEngagementEventsRestController(req, res);
  try {
    await listEngagementEventsRestController.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = listEngagementEvents;
