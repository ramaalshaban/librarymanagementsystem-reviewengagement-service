const { HttpServerError, BadRequestError } = require("common");

const { Review } = require("models");

const getReviewByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const review = await Review.findOne({
      ...query,
      isActive: true,
    });

    if (!review) return null;

    return review.getData();
  } catch (err) {
    throw new HttpServerError("errMsg_dbErrorWhenRequestingReviewByQuery", err);
  }
};

module.exports = getReviewByQuery;
