const mainFunctions = require("./main");

module.exports = {
  // main Database
  // Review Db Object
  dbGetReview: mainFunctions.dbGetReview,
  dbCreateReview: mainFunctions.dbCreateReview,
  dbUpdateReview: mainFunctions.dbUpdateReview,
  dbDeleteReview: mainFunctions.dbDeleteReview,
  dbListReviews: mainFunctions.dbListReviews,
  createReview: mainFunctions.createReview,
  getIdListOfReviewByField: mainFunctions.getIdListOfReviewByField,
  getReviewById: mainFunctions.getReviewById,
  getReviewAggById: mainFunctions.getReviewAggById,
  getReviewListByQuery: mainFunctions.getReviewListByQuery,
  getReviewStatsByQuery: mainFunctions.getReviewStatsByQuery,
  getReviewByQuery: mainFunctions.getReviewByQuery,
  updateReviewById: mainFunctions.updateReviewById,
  updateReviewByIdList: mainFunctions.updateReviewByIdList,
  updateReviewByQuery: mainFunctions.updateReviewByQuery,
  deleteReviewById: mainFunctions.deleteReviewById,
  deleteReviewByQuery: mainFunctions.deleteReviewByQuery,

  // Recommendation Db Object
  dbGetRecommendation: mainFunctions.dbGetRecommendation,
  dbCreateRecommendation: mainFunctions.dbCreateRecommendation,
  dbUpdateRecommendation: mainFunctions.dbUpdateRecommendation,
  dbDeleteRecommendation: mainFunctions.dbDeleteRecommendation,
  dbListRecommendations: mainFunctions.dbListRecommendations,
  createRecommendation: mainFunctions.createRecommendation,
  getIdListOfRecommendationByField:
    mainFunctions.getIdListOfRecommendationByField,
  getRecommendationById: mainFunctions.getRecommendationById,
  getRecommendationAggById: mainFunctions.getRecommendationAggById,
  getRecommendationListByQuery: mainFunctions.getRecommendationListByQuery,
  getRecommendationStatsByQuery: mainFunctions.getRecommendationStatsByQuery,
  getRecommendationByQuery: mainFunctions.getRecommendationByQuery,
  updateRecommendationById: mainFunctions.updateRecommendationById,
  updateRecommendationByIdList: mainFunctions.updateRecommendationByIdList,
  updateRecommendationByQuery: mainFunctions.updateRecommendationByQuery,
  deleteRecommendationById: mainFunctions.deleteRecommendationById,
  deleteRecommendationByQuery: mainFunctions.deleteRecommendationByQuery,

  // EngagementEvent Db Object
  dbGetEngagementevent: mainFunctions.dbGetEngagementevent,
  dbCreateEngagementevent: mainFunctions.dbCreateEngagementevent,
  dbUpdateEngagementevent: mainFunctions.dbUpdateEngagementevent,
  dbDeleteEngagementevent: mainFunctions.dbDeleteEngagementevent,
  dbListEngagementevents: mainFunctions.dbListEngagementevents,
  createEngagementEvent: mainFunctions.createEngagementEvent,
  getIdListOfEngagementEventByField:
    mainFunctions.getIdListOfEngagementEventByField,
  getEngagementEventById: mainFunctions.getEngagementEventById,
  getEngagementEventAggById: mainFunctions.getEngagementEventAggById,
  getEngagementEventListByQuery: mainFunctions.getEngagementEventListByQuery,
  getEngagementEventStatsByQuery: mainFunctions.getEngagementEventStatsByQuery,
  getEngagementEventByQuery: mainFunctions.getEngagementEventByQuery,
  updateEngagementEventById: mainFunctions.updateEngagementEventById,
  updateEngagementEventByIdList: mainFunctions.updateEngagementEventByIdList,
  updateEngagementEventByQuery: mainFunctions.updateEngagementEventByQuery,
  deleteEngagementEventById: mainFunctions.deleteEngagementEventById,
  deleteEngagementEventByQuery: mainFunctions.deleteEngagementEventByQuery,
};
