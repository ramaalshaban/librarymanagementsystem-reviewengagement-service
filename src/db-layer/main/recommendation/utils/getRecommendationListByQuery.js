const { HttpServerError, BadRequestError, NotFoundError } = require("common");
const { Recommendation } = require("models");

const getRecommendationListByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const recommendation = await Recommendation.find(query);

    if (!recommendation || recommendation.length === 0) return [];

    //should i add not found error or only return empty array?
    //      if (!recommendation || recommendation.length === 0) {
    //      throw new NotFoundError(
    //      `Recommendation with the specified criteria not found`
    //  );
    //}

    return recommendation.map((item) => item.getData());
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingRecommendationListByQuery",
      err,
    );
  }
};

module.exports = getRecommendationListByQuery;
