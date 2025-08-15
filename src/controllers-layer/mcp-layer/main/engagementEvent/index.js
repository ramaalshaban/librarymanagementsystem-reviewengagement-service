module.exports = (headers) => {
  // EngagementEvent Db Object Rest Api Router
  const engagementEventMcpRouter = [];
  // getEngagementEvent controller
  engagementEventMcpRouter.push(require("./get-engagementevent")(headers));
  // createEngagementEvent controller
  engagementEventMcpRouter.push(require("./create-engagementevent")(headers));
  // updateEngagementEvent controller
  engagementEventMcpRouter.push(require("./update-engagementevent")(headers));
  // deleteEngagementEvent controller
  engagementEventMcpRouter.push(require("./delete-engagementevent")(headers));
  // listEngagementEvents controller
  engagementEventMcpRouter.push(require("./list-engagementevents")(headers));
  return engagementEventMcpRouter;
};
