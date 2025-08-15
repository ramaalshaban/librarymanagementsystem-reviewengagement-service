const { HttpServerError, BadRequestError, newUUID } = require("common");
//should i add the elastic for mongodb?
const { ElasticIndexer } = require("serviceCommon");

const { Recommendation } = require("models");

const indexDataToElastic = async (data) => {
  const elasticIndexer = new ElasticIndexer("recommendation");
  await elasticIndexer.indexData(data);
};

const validateData = (data) => {
  const requiredFields = ["userId", "bookIds", "isActive"];

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

const createRecommendation = async (data) => {
  try {
    if (!data || Object.keys(data).length === 0) {
      throw new BadRequestError(`errMsg_invalidInputDataForRecommendation`);
    }

    validateData(data);

    const newrecommendation = new Recommendation(data);
    const createdrecommendation = await newrecommendation.save();

    //shoul i use model's getData method for consistency with Sequelize
    const _data = createdrecommendation.getData();

    await indexDataToElastic(_data);

    return _data;
  } catch (err) {
    throw new HttpServerError(`errMsg_dbErrorWhenCreatingRecommendation`, err);
  }
};

module.exports = createRecommendation;
