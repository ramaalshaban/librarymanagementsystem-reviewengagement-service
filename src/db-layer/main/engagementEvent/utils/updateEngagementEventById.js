const { HttpServerError, BadRequestError, NotFoundError } = require("common");

const { EngagementEvent } = require("models");
const { ElasticIndexer } = require("serviceCommon");

const indexDataToElastic = async (data) => {
  const elasticIndexer = new ElasticIndexer("engagementEvent");
  await elasticIndexer.indexData(data);
};

const updateEngagementEventById = async (id, dataClause) => {
  try {
    if (!id && dataClause.id) {
      id = dataClause.id;
      delete dataClause.id;
    }

    if (typeof id === "object") {
      if (!dataClause) dataClause = id;
      id = id.id;
      delete dataClause.id;
    }

    if (!id)
      throw new BadRequestError("ID is required in utility update function");

    const existingDoc = await EngagementEvent.findOne({
      _id: id,
      isActive: true,
    });

    if (!existingDoc) {
      throw new NotFoundError(`Record with ID ${id} not found.`);
    }

    const options = { new: true };

    const whereClause = { _id: id, isActive: true };

    const dbDoc = await EngagementEvent.findOneAndUpdate(
      whereClause,
      dataClause,
      options,
    );

    if (!dbDoc) {
      throw new NotFoundError("Record not found for update.");
    }

    const _data = dbDoc.getData();
    await indexDataToElastic(_data);
    return _data;
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenUpdatingEngagementEventById",
      err,
    );
  }
};

module.exports = updateEngagementEventById;
