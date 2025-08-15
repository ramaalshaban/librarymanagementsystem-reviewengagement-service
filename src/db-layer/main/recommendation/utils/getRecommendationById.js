const { HttpServerError } = require("common");

const { Recommendation } = require("models");

const getRecommendationById = async (recommendationId) => {
  try {
    let recommendation;

    if (Array.isArray(recommendationId)) {
      recommendation = await Recommendation.find({
        _id: { $in: recommendationId },
        isActive: true,
      });
    } else {
      recommendation = await Recommendation.findOne({
        _id: recommendationId,
        isActive: true,
      });
    }

    if (!recommendation) {
      return null;
    }

    return Array.isArray(recommendationId)
      ? recommendation.map((item) => item.getData())
      : recommendation.getData();
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingRecommendationById",
      err,
    );
  }
};

module.exports = getRecommendationById;
