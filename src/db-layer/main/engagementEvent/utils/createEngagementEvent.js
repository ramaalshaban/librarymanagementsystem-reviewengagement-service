const { HttpServerError, BadRequestError, newUUID } = require("common");
//should i add the elastic for mongodb?
const { ElasticIndexer } = require("serviceCommon");

const { EngagementEvent } = require("models");

const indexDataToElastic = async (data) => {
  const elasticIndexer = new ElasticIndexer("engagementEvent");
  await elasticIndexer.indexData(data);
};

const validateData = (data) => {
  const requiredFields = ["eventType", "eventTime", "isActive"];

  requiredFields.forEach((field) => {
    if (data[field] === null || data[field] === undefined) {
      throw new BadRequestError(
        `Field "${field}" is required and cannot be null or undefined.`,
      );
    }
  });

  if (!data._id && !data.id) {
    data._id = newUUID();
  }
};

const createEngagementEvent = async (data) => {
  try {
    if (!data || Object.keys(data).length === 0) {
      throw new BadRequestError(`errMsg_invalidInputDataForEngagementEvent`);
    }

    validateData(data);

    const newengagementEvent = new EngagementEvent(data);
    const createdengagementEvent = await newengagementEvent.save();

    //shoul i use model's getData method for consistency with Sequelize
    const _data = createdengagementEvent.getData();

    await indexDataToElastic(_data);

    return _data;
  } catch (err) {
    throw new HttpServerError(`errMsg_dbErrorWhenCreatingEngagementEvent`, err);
  }
};

module.exports = createEngagementEvent;
