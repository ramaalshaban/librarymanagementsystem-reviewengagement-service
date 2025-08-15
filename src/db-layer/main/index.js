const reviewFunctions = require("./review");
const recommendationFunctions = require("./recommendation");
const engagementEventFunctions = require("./engagementEvent");

module.exports = {
  // main Database
  // Review Db Object
  dbGetReview: reviewFunctions.dbGetReview,
  dbCreateReview: reviewFunctions.dbCreateReview,
  dbUpdateReview: reviewFunctions.dbUpdateReview,
  dbDeleteReview: reviewFunctions.dbDeleteReview,
  dbListReviews: reviewFunctions.dbListReviews,
  createReview: reviewFunctions.createReview,
  getIdListOfReviewByField: reviewFunctions.getIdListOfReviewByField,
  getReviewById: reviewFunctions.getReviewById,
  getReviewAggById: reviewFunctions.getReviewAggById,
  getReviewListByQuery: reviewFunctions.getReviewListByQuery,
  getReviewStatsByQuery: reviewFunctions.getReviewStatsByQuery,
  getReviewByQuery: reviewFunctions.getReviewByQuery,
  updateReviewById: reviewFunctions.updateReviewById,
  updateReviewByIdList: reviewFunctions.updateReviewByIdList,
  updateReviewByQuery: reviewFunctions.updateReviewByQuery,
  deleteReviewById: reviewFunctions.deleteReviewById,
  deleteReviewByQuery: reviewFunctions.deleteReviewByQuery,

  // Recommendation Db Object
  dbGetRecommendation: recommendationFunctions.dbGetRecommendation,
  dbCreateRecommendation: recommendationFunctions.dbCreateRecommendation,
  dbUpdateRecommendation: recommendationFunctions.dbUpdateRecommendation,
  dbDeleteRecommendation: recommendationFunctions.dbDeleteRecommendation,
  dbListRecommendations: recommendationFunctions.dbListRecommendations,
  createRecommendation: recommendationFunctions.createRecommendation,
  getIdListOfRecommendationByField:
    recommendationFunctions.getIdListOfRecommendationByField,
  getRecommendationById: recommendationFunctions.getRecommendationById,
  getRecommendationAggById: recommendationFunctions.getRecommendationAggById,
  getRecommendationListByQuery:
    recommendationFunctions.getRecommendationListByQuery,
  getRecommendationStatsByQuery:
    recommendationFunctions.getRecommendationStatsByQuery,
  getRecommendationByQuery: recommendationFunctions.getRecommendationByQuery,
  updateRecommendationById: recommendationFunctions.updateRecommendationById,
  updateRecommendationByIdList:
    recommendationFunctions.updateRecommendationByIdList,
  updateRecommendationByQuery:
    recommendationFunctions.updateRecommendationByQuery,
  deleteRecommendationById: recommendationFunctions.deleteRecommendationById,
  deleteRecommendationByQuery:
    recommendationFunctions.deleteRecommendationByQuery,

  // EngagementEvent Db Object
  dbGetEngagementevent: engagementEventFunctions.dbGetEngagementevent,
  dbCreateEngagementevent: engagementEventFunctions.dbCreateEngagementevent,
  dbUpdateEngagementevent: engagementEventFunctions.dbUpdateEngagementevent,
  dbDeleteEngagementevent: engagementEventFunctions.dbDeleteEngagementevent,
  dbListEngagementevents: engagementEventFunctions.dbListEngagementevents,
  createEngagementEvent: engagementEventFunctions.createEngagementEvent,
  getIdListOfEngagementEventByField:
    engagementEventFunctions.getIdListOfEngagementEventByField,
  getEngagementEventById: engagementEventFunctions.getEngagementEventById,
  getEngagementEventAggById: engagementEventFunctions.getEngagementEventAggById,
  getEngagementEventListByQuery:
    engagementEventFunctions.getEngagementEventListByQuery,
  getEngagementEventStatsByQuery:
    engagementEventFunctions.getEngagementEventStatsByQuery,
  getEngagementEventByQuery: engagementEventFunctions.getEngagementEventByQuery,
  updateEngagementEventById: engagementEventFunctions.updateEngagementEventById,
  updateEngagementEventByIdList:
    engagementEventFunctions.updateEngagementEventByIdList,
  updateEngagementEventByQuery:
    engagementEventFunctions.updateEngagementEventByQuery,
  deleteEngagementEventById: engagementEventFunctions.deleteEngagementEventById,
  deleteEngagementEventByQuery:
    engagementEventFunctions.deleteEngagementEventByQuery,
};
