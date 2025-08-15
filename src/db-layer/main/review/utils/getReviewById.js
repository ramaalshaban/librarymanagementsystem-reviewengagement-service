const { HttpServerError } = require("common");

const { Review } = require("models");

const getReviewById = async (reviewId) => {
  try {
    let review;

    if (Array.isArray(reviewId)) {
      review = await Review.find({
        _id: { $in: reviewId },
        isActive: true,
      });
    } else {
      review = await Review.findOne({
        _id: reviewId,
        isActive: true,
      });
    }

    if (!review) {
      return null;
    }

    return Array.isArray(reviewId)
      ? review.map((item) => item.getData())
      : review.getData();
  } catch (err) {
    throw new HttpServerError("errMsg_dbErrorWhenRequestingReviewById", err);
  }
};

module.exports = getReviewById;
