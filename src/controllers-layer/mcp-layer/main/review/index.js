module.exports = (headers) => {
  // Review Db Object Rest Api Router
  const reviewMcpRouter = [];
  // getReview controller
  reviewMcpRouter.push(require("./get-review")(headers));
  // createReview controller
  reviewMcpRouter.push(require("./create-review")(headers));
  // updateReview controller
  reviewMcpRouter.push(require("./update-review")(headers));
  // deleteReview controller
  reviewMcpRouter.push(require("./delete-review")(headers));
  // listReviews controller
  reviewMcpRouter.push(require("./list-reviews")(headers));
  return reviewMcpRouter;
};
