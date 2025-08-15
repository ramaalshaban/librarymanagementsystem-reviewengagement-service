const { HttpServerError, BadRequestError, NotFoundError } = require("common");

const { EngagementEvent } = require("models");

const getIdListOfEngagementEventByField = async (
  fieldName,
  fieldValue,
  isArray,
) => {
  try {
    const engagementEventProperties = [
      "id",
      "userId",
      "eventType",
      "eventTime",
      "details",
      "bookId",
    ];

    if (!engagementEventProperties.includes(fieldName)) {
      throw new BadRequestError(`Invalid field name: ${fieldName}.`);
    }

    // type validation different from sequelize for mongodb
    const schemaPath = EngagementEvent.schema.paths[fieldName];
    if (schemaPath && fieldValue !== undefined && fieldValue !== null) {
      const expectedType = schemaPath.instance.toLowerCase();
      const actualType = typeof fieldValue;

      const typeMapping = {
        string: "string",
        number: "number",
        boolean: "boolean",
        objectid: "string", // ObjectIds are typically passed as strings
      };

      const expectedJSType = typeMapping[expectedType];
      if (expectedJSType && actualType !== expectedJSType) {
        throw new BadRequestError(
          `Invalid field value type for ${fieldName}. Expected ${expectedJSType}, got ${actualType}.`,
        );
      }
    }

    let query = isArray
      ? {
          [fieldName]: {
            $in: Array.isArray(fieldValue) ? fieldValue : [fieldValue],
          },
        }
      : { [fieldName]: fieldValue };

    query.isActive = true;

    let engagementEventIdList = await EngagementEvent.find(query, { _id: 1 })
      .lean()
      .exec();

    if (!engagementEventIdList || engagementEventIdList.length === 0) {
      throw new NotFoundError(
        `EngagementEvent with the specified criteria not found`,
      );
    }

    engagementEventIdList = engagementEventIdList.map((item) =>
      item._id.toString(),
    );

    return engagementEventIdList;
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingEngagementEventIdListByField",
      err,
    );
  }
};

module.exports = getIdListOfEngagementEventByField;
