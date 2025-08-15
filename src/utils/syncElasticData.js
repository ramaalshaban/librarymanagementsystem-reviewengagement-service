const { getReviewById, getIdListOfReviewByField } = require("dbLayer");
const {
  getRecommendationById,
  getIdListOfRecommendationByField,
} = require("dbLayer");
const {
  getEngagementEventById,
  getIdListOfEngagementEventByField,
} = require("dbLayer");
const path = require("path");
const fs = require("fs");
const { ElasticIndexer } = require("serviceCommon");

const indexReviewData = async () => {
  const reviewIndexer = new ElasticIndexer("review", { isSilent: true });
  console.log("Starting to update indexes for Review");

  const idList = (await getIdListOfReviewByField("isActive", true)) ?? [];
  const chunkSize = 500;
  let total = 0;
  for (let i = 0; i < idList.length; i += chunkSize) {
    const chunk = idList.slice(i, i + chunkSize);
    const dataList = await getReviewById(chunk);
    if (dataList.length) {
      await reviewIndexer.indexBulkData(dataList);
      await reviewIndexer.deleteRedisCache();
    }
    total += dataList.length;
  }

  return total;
};

const indexRecommendationData = async () => {
  const recommendationIndexer = new ElasticIndexer("recommendation", {
    isSilent: true,
  });
  console.log("Starting to update indexes for Recommendation");

  const idList =
    (await getIdListOfRecommendationByField("isActive", true)) ?? [];
  const chunkSize = 500;
  let total = 0;
  for (let i = 0; i < idList.length; i += chunkSize) {
    const chunk = idList.slice(i, i + chunkSize);
    const dataList = await getRecommendationById(chunk);
    if (dataList.length) {
      await recommendationIndexer.indexBulkData(dataList);
      await recommendationIndexer.deleteRedisCache();
    }
    total += dataList.length;
  }

  return total;
};

const indexEngagementEventData = async () => {
  const engagementEventIndexer = new ElasticIndexer("engagementEvent", {
    isSilent: true,
  });
  console.log("Starting to update indexes for EngagementEvent");

  const idList =
    (await getIdListOfEngagementEventByField("isActive", true)) ?? [];
  const chunkSize = 500;
  let total = 0;
  for (let i = 0; i < idList.length; i += chunkSize) {
    const chunk = idList.slice(i, i + chunkSize);
    const dataList = await getEngagementEventById(chunk);
    if (dataList.length) {
      await engagementEventIndexer.indexBulkData(dataList);
      await engagementEventIndexer.deleteRedisCache();
    }
    total += dataList.length;
  }

  return total;
};

const syncElasticIndexData = async () => {
  const startTime = new Date();
  console.log("syncElasticIndexData started", startTime);

  try {
    const dataCount = await indexReviewData();
    console.log("Review agregated data is indexed, total reviews:", dataCount);
  } catch (err) {
    console.log("Elastic Index Error When Syncing Review data", err.toString());
  }

  try {
    const dataCount = await indexRecommendationData();
    console.log(
      "Recommendation agregated data is indexed, total recommendations:",
      dataCount,
    );
  } catch (err) {
    console.log(
      "Elastic Index Error When Syncing Recommendation data",
      err.toString(),
    );
  }

  try {
    const dataCount = await indexEngagementEventData();
    console.log(
      "EngagementEvent agregated data is indexed, total engagementEvents:",
      dataCount,
    );
  } catch (err) {
    console.log(
      "Elastic Index Error When Syncing EngagementEvent data",
      err.toString(),
    );
  }

  const elapsedTime = new Date() - startTime;
  console.log("initElasticIndexData ended -> elapsedTime:", elapsedTime);
};

module.exports = syncElasticIndexData;
