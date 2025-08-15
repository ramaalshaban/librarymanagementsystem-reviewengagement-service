const utils = require("./utils");
const dbApiScripts = require("./dbApiScripts");

module.exports = {
  dbGetRecommendation: require("./dbGetRecommendation"),
  dbCreateRecommendation: require("./dbCreateRecommendation"),
  dbUpdateRecommendation: require("./dbUpdateRecommendation"),
  dbDeleteRecommendation: require("./dbDeleteRecommendation"),
  dbListRecommendations: require("./dbListRecommendations"),
  createRecommendation: utils.createRecommendation,
  getIdListOfRecommendationByField: utils.getIdListOfRecommendationByField,
  getRecommendationById: utils.getRecommendationById,
  getRecommendationAggById: utils.getRecommendationAggById,
  getRecommendationListByQuery: utils.getRecommendationListByQuery,
  getRecommendationStatsByQuery: utils.getRecommendationStatsByQuery,
  getRecommendationByQuery: utils.getRecommendationByQuery,
  updateRecommendationById: utils.updateRecommendationById,
  updateRecommendationByIdList: utils.updateRecommendationByIdList,
  updateRecommendationByQuery: utils.updateRecommendationByQuery,
  deleteRecommendationById: utils.deleteRecommendationById,
  deleteRecommendationByQuery: utils.deleteRecommendationByQuery,
};
