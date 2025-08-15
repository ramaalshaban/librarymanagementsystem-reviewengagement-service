const { ElasticIndexer } = require("serviceCommon");
const { hexaLogger } = require("common");

const reviewMapping = {
  id: { type: "keyword" },
  _owner: { type: "keyword" },
  bookId: { type: "keyword", index: true },
  userId: { type: "keyword", index: true },
  rating: { type: "short", index: true },
  reviewText: { type: "text", index: true },
  status: { type: "keyword", index: true },
  status_: { type: "keyword" },
  moderatedByUserId: { type: "keyword", index: false },
  isActive: { type: "boolean" },
  recordVersion: { type: "integer" },
  createdAt: { type: "date" },
  updatedAt: { type: "date" },
};
const recommendationMapping = {
  id: { type: "keyword" },
  _owner: { type: "keyword" },
  userId: { type: "keyword", index: true },
  bookIds: { type: "keyword", index: true },
  generatedBy: { type: "keyword", index: false },
  contextInfo: { type: "object", enabled: false },
  isActive: { type: "boolean" },
  recordVersion: { type: "integer" },
  createdAt: { type: "date" },
  updatedAt: { type: "date" },
};
const engagementEventMapping = {
  id: { type: "keyword" },
  _owner: { type: "keyword" },
  userId: { type: "keyword", index: true },
  eventType: { type: "keyword", index: true },
  eventTime: { type: "date", index: true },
  details: { type: "object", enabled: false },
  bookId: { type: "keyword", index: true },
  isActive: { type: "boolean" },
  recordVersion: { type: "integer" },
  createdAt: { type: "date" },
  updatedAt: { type: "date" },
};

const updateElasticIndexMappings = async () => {
  try {
    ElasticIndexer.addMapping("review", reviewMapping);
    await new ElasticIndexer("review").updateMapping(reviewMapping);
    ElasticIndexer.addMapping("recommendation", recommendationMapping);
    await new ElasticIndexer("recommendation").updateMapping(
      recommendationMapping,
    );
    ElasticIndexer.addMapping("engagementEvent", engagementEventMapping);
    await new ElasticIndexer("engagementEvent").updateMapping(
      engagementEventMapping,
    );
  } catch (err) {
    hexaLogger.insertError(
      "UpdateElasticIndexMappingsError",
      { function: "updateElasticIndexMappings" },
      "elastic-index.js->updateElasticIndexMappings",
      err,
    );
  }
};

module.exports = updateElasticIndexMappings;
