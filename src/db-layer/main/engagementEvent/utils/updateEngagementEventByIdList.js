const { HttpServerError } = require("common");

const { EngagementEvent } = require("models");

const updateEngagementEventByIdList = async (idList, dataClause) => {
  try {
    await EngagementEvent.updateMany(
      { _id: { $in: idList }, isActive: true },
      dataClause,
    );

    const updatedDocs = await EngagementEvent.find(
      { _id: { $in: idList }, isActive: true },
      { _id: 1 },
    );

    const engagementEventIdList = updatedDocs.map((doc) => doc._id);

    return engagementEventIdList;
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenUpdatingEngagementEventByIdList",
      err,
    );
  }
};

module.exports = updateEngagementEventByIdList;
