const { mongoose } = require("common");
const { Schema } = mongoose;
const recommendationSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    bookIds: {
      type: [String],
      required: true,
    },
    generatedBy: {
      type: String,
      required: false,
    },
    contextInfo: {
      type: Schema.Types.Mixed,
      required: false,
    },
    isActive: {
      // isActive property will be set to false when deleted
      // so that the document will be archived
      type: Boolean,
      default: true,
      required: false,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
      },
    },
  },
);

recommendationSchema.set("versionKey", "recordVersion");
recommendationSchema.set("timestamps", true);

recommendationSchema.set("toObject", { virtuals: true });
recommendationSchema.set("toJSON", { virtuals: true });

module.exports = recommendationSchema;
