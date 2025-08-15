const { HttpServerError, BadRequestError, NotFoundError } = require("common");
const { Review } = require("models");

const getReviewListByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const review = await Review.find(query);

    if (!review || review.length === 0) return [];

    //should i add not found error or only return empty array?
    //      if (!review || review.length === 0) {
    //      throw new NotFoundError(
    //      `Review with the specified criteria not found`
    //  );
    //}

    return review.map((item) => item.getData());
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingReviewListByQuery",
      err,
    );
  }
};

module.exports = getReviewListByQuery;
