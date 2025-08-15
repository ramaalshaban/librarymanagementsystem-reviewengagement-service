const { HttpServerError } = require("common");

const { Review } = require("models");

const updateReviewByIdList = async (idList, dataClause) => {
  try {
    await Review.updateMany(
      { _id: { $in: idList }, isActive: true },
      dataClause,
    );

    const updatedDocs = await Review.find(
      { _id: { $in: idList }, isActive: true },
      { _id: 1 },
    );

    const reviewIdList = updatedDocs.map((doc) => doc._id);

    return reviewIdList;
  } catch (err) {
    throw new HttpServerError("errMsg_dbErrorWhenUpdatingReviewByIdList", err);
  }
};

module.exports = updateReviewByIdList;
