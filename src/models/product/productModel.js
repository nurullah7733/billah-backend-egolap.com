const mongoose = require("mongoose");

var productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    price: {
      type: Number,
      required: true,
    },
    unitPrice: {
      type: Number,
      required: true,
    },
    quantity: { type: Number, required: [true, "Quantity is required"] },
    sold: { type: Number, default: 0 },
    img: [],
    color: { type: String },
    size: [],
    weight: { type: String },
    ratings: [
      { star: Number, comment: String, author: mongoose.Schema.Types.ObjectId },
    ],
    totalRating: { type: Number, default: 0 },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    subCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    brandId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

var PorductModel = mongoose.model("products", productSchema);
module.exports = PorductModel;
