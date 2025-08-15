module.exports = (headers) => {
  // Recommendation Db Object Rest Api Router
  const recommendationMcpRouter = [];
  // getRecommendation controller
  recommendationMcpRouter.push(require("./get-recommendation")(headers));
  // createRecommendation controller
  recommendationMcpRouter.push(require("./create-recommendation")(headers));
  // updateRecommendation controller
  recommendationMcpRouter.push(require("./update-recommendation")(headers));
  // deleteRecommendation controller
  recommendationMcpRouter.push(require("./delete-recommendation")(headers));
  // listRecommendations controller
  recommendationMcpRouter.push(require("./list-recommendations")(headers));
  return recommendationMcpRouter;
};
