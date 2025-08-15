const { HttpServerError } = require("common");

const { Review } = require("models");

const getReviewAggById = async (reviewId) => {
  try {
    let reviewQuery;

    if (Array.isArray(reviewId)) {
      reviewQuery = Review.find({
        _id: { $in: reviewId },
        isActive: true,
      });
    } else {
      reviewQuery = Review.findOne({
        _id: reviewId,
        isActive: true,
      });
    }

    // Populate associations as needed

    const review = await reviewQuery.exec();

    if (!review) {
      return null;
    }
    const reviewData =
      Array.isArray(reviewId) && reviewId.length > 0
        ? review.map((item) => item.getData())
        : review.getData();

    // should i add this here?
    await Review.getCqrsJoins(reviewData);

    return reviewData;
  } catch (err) {
    console.log(err);
    throw new HttpServerError("errMsg_dbErrorWhenRequestingReviewAggById", err);
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

module.exports = getReviewAggById;
