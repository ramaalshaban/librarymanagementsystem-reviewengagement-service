const { mongoose } = require("common");
const { Schema } = mongoose;
const engagementeventSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: false,
    },
    eventType: {
      type: String,
      required: true,
    },
    eventTime: {
      type: Date,
      required: true,
    },
    details: {
      type: Schema.Types.Mixed,
      required: false,
    },
    bookId: {
      type: String,
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

engagementeventSchema.set("versionKey", "recordVersion");
engagementeventSchema.set("timestamps", true);

engagementeventSchema.set("toObject", { virtuals: true });
engagementeventSchema.set("toJSON", { virtuals: true });

module.exports = engagementeventSchema;
