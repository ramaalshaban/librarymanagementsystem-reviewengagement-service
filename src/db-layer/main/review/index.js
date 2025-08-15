const utils = require("./utils");
const dbApiScripts = require("./dbApiScripts");

module.exports = {
  dbGetReview: require("./dbGetReview"),
  dbCreateReview: require("./dbCreateReview"),
  dbUpdateReview: require("./dbUpdateReview"),
  dbDeleteReview: require("./dbDeleteReview"),
  dbListReviews: require("./dbListReviews"),
  createReview: utils.createReview,
  getIdListOfReviewByField: utils.getIdListOfReviewByField,
  getReviewById: utils.getReviewById,
  getReviewAggById: utils.getReviewAggById,
  getReviewListByQuery: utils.getReviewListByQuery,
  getReviewStatsByQuery: utils.getReviewStatsByQuery,
  getReviewByQuery: utils.getReviewByQuery,
  updateReviewById: utils.updateReviewById,
  updateReviewByIdList: utils.updateReviewByIdList,
  updateReviewByQuery: utils.updateReviewByQuery,
  deleteReviewById: utils.deleteReviewById,
  deleteReviewByQuery: utils.deleteReviewByQuery,
};
