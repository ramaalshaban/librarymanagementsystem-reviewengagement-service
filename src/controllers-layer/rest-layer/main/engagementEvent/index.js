const express = require("express");

// EngagementEvent Db Object Rest Api Router
const engagementEventRouter = express.Router();

// add EngagementEvent controllers

// getEngagementEvent controller
engagementEventRouter.get(
  "/engagementevents/:engagementEventId",
  require("./get-engagementevent"),
);
// createEngagementEvent controller
engagementEventRouter.post(
  "/engagementevents",
  require("./create-engagementevent"),
);
// updateEngagementEvent controller
engagementEventRouter.patch(
  "/engagementevents/:engagementEventId",
  require("./update-engagementevent"),
);
// deleteEngagementEvent controller
engagementEventRouter.delete(
  "/engagementevents/:engagementEventId",
  require("./delete-engagementevent"),
);
// listEngagementEvents controller
engagementEventRouter.get(
  "/engagementevents",
  require("./list-engagementevents"),
);

module.exports = engagementEventRouter;
