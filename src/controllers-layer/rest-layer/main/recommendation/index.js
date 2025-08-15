const express = require("express");

// Recommendation Db Object Rest Api Router
const recommendationRouter = express.Router();

// add Recommendation controllers

// getRecommendation controller
recommendationRouter.get(
  "/recommendations/:recommendationId",
  require("./get-recommendation"),
);
// createRecommendation controller
recommendationRouter.post(
  "/recommendations",
  require("./create-recommendation"),
);
// updateRecommendation controller
recommendationRouter.patch(
  "/recommendations/:recommendationId",
  require("./update-recommendation"),
);
// deleteRecommendation controller
recommendationRouter.delete(
  "/recommendations/:recommendationId",
  require("./delete-recommendation"),
);
// listRecommendations controller
recommendationRouter.get("/recommendations", require("./list-recommendations"));

module.exports = recommendationRouter;
