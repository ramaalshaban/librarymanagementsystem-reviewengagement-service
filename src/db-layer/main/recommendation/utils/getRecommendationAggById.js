const { HttpServerError } = require("common");

const { Recommendation } = require("models");

const getRecommendationAggById = async (recommendationId) => {
  try {
    let recommendationQuery;

    if (Array.isArray(recommendationId)) {
      recommendationQuery = Recommendation.find({
        _id: { $in: recommendationId },
        isActive: true,
      });
    } else {
      recommendationQuery = Recommendation.findOne({
        _id: recommendationId,
        isActive: true,
      });
    }

    // Populate associations as needed

    const recommendation = await recommendationQuery.exec();

    if (!recommendation) {
      return null;
    }
    const recommendationData =
      Array.isArray(recommendationId) && recommendationId.length > 0
        ? recommendation.map((item) => item.getData())
        : recommendation.getData();

    // should i add this here?
    await Recommendation.getCqrsJoins(recommendationData);

    return recommendationData;
  } catch (err) {
    console.log(err);
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingRecommendationAggById",
      err,
    );
  }
};

// "__PropertyEnumSettings.doc": "Enum configuration for the data property, applicable when the property type is set to Enum. While enum values are stored as integers in the database, defining the enum options here allows Mindbricks to enrich API responses with human-readable labels, easing interpretation and UI integration. If not defined, only the numeric value will be returned.",
// "PropertyEnumSettings": {
//   "__hasEnumOptions.doc": "Enables support for named enum values when the property type is Enum. Though values are stored as integers, enabling this adds the symbolic name to API responses for clarity.",
//   "__config.doc": "The configuration object for enum options. Leave it null if hasEnumOptions is false.",
//   "__activation": "hasEnumOptions",
//  "__lines": "\
//  a-hasEnumOptions\
//  g-config",
//  "hasEnumOptions": "Boolean",
//  "config": "PropertyEnumSettingsConfig"
//},

module.exports = getRecommendationAggById;
