module.exports = {
  // main Database Crud Object Routes Manager Layer Classes
  // Review Db Object
  GetReviewManager: require("./review/get-review"),
  CreateReviewManager: require("./review/create-review"),
  UpdateReviewManager: require("./review/update-review"),
  DeleteReviewManager: require("./review/delete-review"),
  ListReviewsManager: require("./review/list-reviews"),
  // Recommendation Db Object
  GetRecommendationManager: require("./recommendation/get-recommendation"),
  CreateRecommendationManager: require("./recommendation/create-recommendation"),
  UpdateRecommendationManager: require("./recommendation/update-recommendation"),
  DeleteRecommendationManager: require("./recommendation/delete-recommendation"),
  ListRecommendationsManager: require("./recommendation/list-recommendations"),
  // EngagementEvent Db Object
  GetEngagementEventManager: require("./engagementEvent/get-engagementevent"),
  CreateEngagementEventManager: require("./engagementEvent/create-engagementevent"),
  UpdateEngagementEventManager: require("./engagementEvent/update-engagementevent"),
  DeleteEngagementEventManager: require("./engagementEvent/delete-engagementevent"),
  ListEngagementEventsManager: require("./engagementEvent/list-engagementevents"),
};
