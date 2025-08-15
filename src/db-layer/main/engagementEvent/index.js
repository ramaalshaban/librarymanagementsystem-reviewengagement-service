const utils = require("./utils");
const dbApiScripts = require("./dbApiScripts");

module.exports = {
  dbGetEngagementevent: require("./dbGetEngagementevent"),
  dbCreateEngagementevent: require("./dbCreateEngagementevent"),
  dbUpdateEngagementevent: require("./dbUpdateEngagementevent"),
  dbDeleteEngagementevent: require("./dbDeleteEngagementevent"),
  dbListEngagementevents: require("./dbListEngagementevents"),
  createEngagementEvent: utils.createEngagementEvent,
  getIdListOfEngagementEventByField: utils.getIdListOfEngagementEventByField,
  getEngagementEventById: utils.getEngagementEventById,
  getEngagementEventAggById: utils.getEngagementEventAggById,
  getEngagementEventListByQuery: utils.getEngagementEventListByQuery,
  getEngagementEventStatsByQuery: utils.getEngagementEventStatsByQuery,
  getEngagementEventByQuery: utils.getEngagementEventByQuery,
  updateEngagementEventById: utils.updateEngagementEventById,
  updateEngagementEventByIdList: utils.updateEngagementEventByIdList,
  updateEngagementEventByQuery: utils.updateEngagementEventByQuery,
  deleteEngagementEventById: utils.deleteEngagementEventById,
  deleteEngagementEventByQuery: utils.deleteEngagementEventByQuery,
};
