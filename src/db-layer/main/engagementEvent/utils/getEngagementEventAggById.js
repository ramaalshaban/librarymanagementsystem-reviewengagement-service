const { HttpServerError } = require("common");

const { EngagementEvent } = require("models");

const getEngagementEventAggById = async (engagementEventId) => {
  try {
    let engagementEventQuery;

    if (Array.isArray(engagementEventId)) {
      engagementEventQuery = EngagementEvent.find({
        _id: { $in: engagementEventId },
        isActive: true,
      });
    } else {
      engagementEventQuery = EngagementEvent.findOne({
        _id: engagementEventId,
        isActive: true,
      });
    }

    // Populate associations as needed

    const engagementEvent = await engagementEventQuery.exec();

    if (!engagementEvent) {
      return null;
    }
    const engagementEventData =
      Array.isArray(engagementEventId) && engagementEventId.length > 0
        ? engagementEvent.map((item) => item.getData())
        : engagementEvent.getData();

    // should i add this here?
    await EngagementEvent.getCqrsJoins(engagementEventData);

    return engagementEventData;
  } catch (err) {
    console.log(err);
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingEngagementEventAggById",
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

module.exports = getEngagementEventAggById;
