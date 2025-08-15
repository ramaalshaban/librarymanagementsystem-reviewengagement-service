const { HttpServerError } = require("common");

const { Recommendation } = require("models");

const updateRecommendationByIdList = async (idList, dataClause) => {
  try {
    await Recommendation.updateMany(
      { _id: { $in: idList }, isActive: true },
      dataClause,
    );

    const updatedDocs = await Recommendation.find(
      { _id: { $in: idList }, isActive: true },
      { _id: 1 },
    );

    const recommendationIdList = updatedDocs.map((doc) => doc._id);

    return recommendationIdList;
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenUpdatingRecommendationByIdList",
      err,
    );
  }
};

module.exports = updateRecommendationByIdList;
