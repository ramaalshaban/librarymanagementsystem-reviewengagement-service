const { HttpServerError, BadRequestError } = require("common");

const { Recommendation } = require("models");

const getRecommendationByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const recommendation = await Recommendation.findOne({
      ...query,
      isActive: true,
    });

    if (!recommendation) return null;

    return recommendation.getData();
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingRecommendationByQuery",
      err,
    );
  }
};

module.exports = getRecommendationByQuery;
