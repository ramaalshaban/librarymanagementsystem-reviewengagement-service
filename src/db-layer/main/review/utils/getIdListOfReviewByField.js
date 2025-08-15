const { HttpServerError, BadRequestError, NotFoundError } = require("common");

const { Review } = require("models");

const getIdListOfReviewByField = async (fieldName, fieldValue, isArray) => {
  try {
    const reviewProperties = [
      "id",
      "bookId",
      "userId",
      "rating",
      "reviewText",
      "status",
      "moderatedByUserId",
    ];

    if (!reviewProperties.includes(fieldName)) {
      throw new BadRequestError(`Invalid field name: ${fieldName}.`);
    }

    // type validation different from sequelize for mongodb
    const schemaPath = Review.schema.paths[fieldName];
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

    let reviewIdList = await Review.find(query, { _id: 1 }).lean().exec();

    if (!reviewIdList || reviewIdList.length === 0) {
      throw new NotFoundError(`Review with the specified criteria not found`);
    }

    reviewIdList = reviewIdList.map((item) => item._id.toString());

    return reviewIdList;
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingReviewIdListByField",
      err,
    );
  }
};

module.exports = getIdListOfReviewByField;
