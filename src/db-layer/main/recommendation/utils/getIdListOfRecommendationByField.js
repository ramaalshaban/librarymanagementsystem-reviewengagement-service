const { HttpServerError, BadRequestError, NotFoundError } = require("common");

const { Recommendation } = require("models");

const getIdListOfRecommendationByField = async (
  fieldName,
  fieldValue,
  isArray,
) => {
  try {
    const recommendationProperties = [
      "id",
      "userId",
      "bookIds",
      "generatedBy",
      "contextInfo",
    ];

    if (!recommendationProperties.includes(fieldName)) {
      throw new BadRequestError(`Invalid field name: ${fieldName}.`);
    }

    // type validation different from sequelize for mongodb
    const schemaPath = Recommendation.schema.paths[fieldName];
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

    let recommendationIdList = await Recommendation.find(query, { _id: 1 })
      .lean()
      .exec();

    if (!recommendationIdList || recommendationIdList.length === 0) {
      throw new NotFoundError(
        `Recommendation with the specified criteria not found`,
      );
    }

    recommendationIdList = recommendationIdList.map((item) =>
      item._id.toString(),
    );

    return recommendationIdList;
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingRecommendationIdListByField",
      err,
    );
  }
};

module.exports = getIdListOfRecommendationByField;
