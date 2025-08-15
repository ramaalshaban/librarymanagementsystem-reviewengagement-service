const { mongoose } = require("common");
const { getEnumValue } = require("serviceCommon");
const { ElasticIndexer } = require("serviceCommon");
const updateElasticIndexMappings = require("./elastic-index");

const reviewSchema = require("./review");

const recommendationSchema = require("./recommendation");

const engagementeventSchema = require("./engagementEvent");

reviewSchema.methods.getCqrsJoins = async function (data) {};

reviewSchema.methods.getData = function () {
  let ret = {};
  ret.id = this._doc._id.toString();
  const docProps = Object.keys(this._doc).filter((key) => key != "_id");
  // copy all props from doc
  docProps.forEach((propName) => (ret[propName] = this._doc[propName]));

  ret._owner = ret.userId ?? undefined;

  const statusOptions = ["pending", "approved", "rejected"];
  if (ret.status != null) {
    const enumIndex =
      typeof ret.status === "string"
        ? statusOptions.indexOf(ret.status)
        : ret.status;
    ret.status_idx = enumIndex;
    ret.status = enumIndex > -1 ? statusOptions[enumIndex] : undefined;
  }

  return ret;
};

recommendationSchema.methods.getCqrsJoins = async function (data) {};

recommendationSchema.methods.getData = function () {
  let ret = {};
  ret.id = this._doc._id.toString();
  const docProps = Object.keys(this._doc).filter((key) => key != "_id");
  // copy all props from doc
  docProps.forEach((propName) => (ret[propName] = this._doc[propName]));

  ret._owner = ret.userId ?? undefined;

  return ret;
};

engagementeventSchema.methods.getCqrsJoins = async function (data) {};

engagementeventSchema.methods.getData = function () {
  let ret = {};
  ret.id = this._doc._id.toString();
  const docProps = Object.keys(this._doc).filter((key) => key != "_id");
  // copy all props from doc
  docProps.forEach((propName) => (ret[propName] = this._doc[propName]));

  return ret;
};

const Review = mongoose.model("Review", reviewSchema);
const Recommendation = mongoose.model("Recommendation", recommendationSchema);
const EngagementEvent = mongoose.model(
  "EngagementEvent",
  engagementeventSchema,
);

module.exports = {
  Review,
  Recommendation,
  EngagementEvent,
  updateElasticIndexMappings,
};
