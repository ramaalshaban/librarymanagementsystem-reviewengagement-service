const { HttpServerError } = require("common");

const { EngagementEvent } = require("models");

const getEngagementEventById = async (engagementEventId) => {
  try {
    let engagementEvent;

    if (Array.isArray(engagementEventId)) {
      engagementEvent = await EngagementEvent.find({
        _id: { $in: engagementEventId },
        isActive: true,
      });
    } else {
      engagementEvent = await EngagementEvent.findOne({
        _id: engagementEventId,
        isActive: true,
      });
    }

    if (!engagementEvent) {
      return null;
    }

    return Array.isArray(engagementEventId)
      ? engagementEvent.map((item) => item.getData())
      : engagementEvent.getData();
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingEngagementEventById",
      err,
    );
  }
};

module.exports = getEngagementEventById;
