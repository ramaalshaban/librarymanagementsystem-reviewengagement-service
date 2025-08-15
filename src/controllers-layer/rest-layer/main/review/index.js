const express = require("express");

// Review Db Object Rest Api Router
const reviewRouter = express.Router();

// add Review controllers

// getReview controller
reviewRouter.get("/reviews/:reviewId", require("./get-review"));
// createReview controller
reviewRouter.post("/reviews", require("./create-review"));
// updateReview controller
reviewRouter.patch("/reviews/:reviewId", require("./update-review"));
// deleteReview controller
reviewRouter.delete("/reviews/:reviewId", require("./delete-review"));
// listReviews controller
reviewRouter.get("/reviews", require("./list-reviews"));

module.exports = reviewRouter;
