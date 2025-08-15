module.exports = {
  ReviewEngagementServiceManager: require("./service-manager/ReviewEngagementServiceManager"),
  // main Database Crud Object Routes Manager Layer Classes
  // Review Db Object
  GetReviewManager: require("./main/review/get-review"),
  CreateReviewManager: require("./main/review/create-review"),
  UpdateReviewManager: require("./main/review/update-review"),
  DeleteReviewManager: require("./main/review/delete-review"),
  ListReviewsManager: require("./main/review/list-reviews"),
  // Recommendation Db Object
  GetRecommendationManager: require("./main/recommendation/get-recommendation"),
  CreateRecommendationManager: require("./main/recommendation/create-recommendation"),
  UpdateRecommendationManager: require("./main/recommendation/update-recommendation"),
  DeleteRecommendationManager: require("./main/recommendation/delete-recommendation"),
  ListRecommendationsManager: require("./main/recommendation/list-recommendations"),
  // EngagementEvent Db Object
  GetEngagementEventManager: require("./main/engagementEvent/get-engagementevent"),
  CreateEngagementEventManager: require("./main/engagementEvent/create-engagementevent"),
  UpdateEngagementEventManager: require("./main/engagementEvent/update-engagementevent"),
  DeleteEngagementEventManager: require("./main/engagementEvent/delete-engagementevent"),
  ListEngagementEventsManager: require("./main/engagementEvent/list-engagementevents"),
};
