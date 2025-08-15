const { HttpServerError, BadRequestError } = require("common");

const { EngagementEvent } = require("models");

const getEngagementEventByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const engagementEvent = await EngagementEvent.findOne({
      ...query,
      isActive: true,
    });

    if (!engagementEvent) return null;

    return engagementEvent.getData();
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingEngagementEventByQuery",
      err,
    );
  }
};

module.exports = getEngagementEventByQuery;
