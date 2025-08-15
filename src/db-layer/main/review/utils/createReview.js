const { HttpServerError, BadRequestError, newUUID } = require("common");
//should i add the elastic for mongodb?
const { ElasticIndexer } = require("serviceCommon");

const { Review } = require("models");

const indexDataToElastic = async (data) => {
  const elasticIndexer = new ElasticIndexer("review");
  await elasticIndexer.indexData(data);
};

const validateData = (data) => {
  const requiredFields = [
    "bookId",
    "userId",
    "rating",
    "reviewText",
    "status",
    "isActive",
  ];

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

const createReview = async (data) => {
  try {
    if (!data || Object.keys(data).length === 0) {
      throw new BadRequestError(`errMsg_invalidInputDataForReview`);
    }

    validateData(data);

    const newreview = new Review(data);
    const createdreview = await newreview.save();

    //shoul i use model's getData method for consistency with Sequelize
    const _data = createdreview.getData();

    await indexDataToElastic(_data);

    return _data;
  } catch (err) {
    throw new HttpServerError(`errMsg_dbErrorWhenCreatingReview`, err);
  }
};

module.exports = createReview;
