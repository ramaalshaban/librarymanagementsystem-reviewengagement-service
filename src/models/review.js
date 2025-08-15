const { mongoose } = require("common");
const { Schema } = mongoose;
const reviewSchema = new mongoose.Schema(
  {
    bookId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      defaultValue: 0,
    },
    reviewText: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      defaultValue: "pending",
    },
    moderatedByUserId: {
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

reviewSchema.set("versionKey", "recordVersion");
reviewSchema.set("timestamps", true);

reviewSchema.set("toObject", { virtuals: true });
reviewSchema.set("toJSON", { virtuals: true });

module.exports = reviewSchema;
