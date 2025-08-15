const { CreateEngagementEventManager } = require("managers");

const ReviewEngagementRestController = require("../../ReviewEngagementServiceRestController");

class CreateEngagementEventRestController extends ReviewEngagementRestController {
  constructor(req, res) {
    super("createEngagementEvent", "createengagementevent", req, res);
    this.dataName = "engagementEvent";
    this.crudType = "create";
    this.status = 201;
    this.httpMethod = "POST";
  }

  createApiManager() {
    return new CreateEngagementEventManager(this._req, "rest");
  }
}

const createEngagementEvent = async (req, res, next) => {
  const createEngagementEventRestController =
    new CreateEngagementEventRestController(req, res);
  try {
    await createEngagementEventRestController.processRequest();
  } catch (err) {
    return next(err);
  }
};

module.exports = createEngagementEvent;
