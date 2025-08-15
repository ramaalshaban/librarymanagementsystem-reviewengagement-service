const { HttpServerError, BadRequestError, NotFoundError } = require("common");
const { EngagementEvent } = require("models");

const getEngagementEventListByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const engagementEvent = await EngagementEvent.find(query);

    if (!engagementEvent || engagementEvent.length === 0) return [];

    //should i add not found error or only return empty array?
    //      if (!engagementEvent || engagementEvent.length === 0) {
    //      throw new NotFoundError(
    //      `EngagementEvent with the specified criteria not found`
    //  );
    //}

    return engagementEvent.map((item) => item.getData());
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingEngagementEventListByQuery",
      err,
    );
  }
};

module.exports = getEngagementEventListByQuery;
