const { HttpServerError, BadRequestError } = require("common");

const { Recommendation } = require("models");

const deleteRecommendationByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }
    // sholuld i match the resul returned with sequlize?

    const docs = await Recommendation.find({ ...query, isActive: true });
    if (!docs || docs.length === 0) return [];

    await Recommendation.updateMany(
      { ...query, isActive: true },
      { isActive: false, updatedAt: new Date() },
    );
    return docs.map((doc) => doc.getData());
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenDeletingRecommendationByQuery",
      err,
    );
  }
};

module.exports = deleteRecommendationByQuery;
