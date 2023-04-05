const mongoose = require("mongoose");

var categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    img: {
      type: Array,
    },
  },
  { versionKey: false, timestamps: true }
);

var CategoryModel = mongoose.model("categories", categorySchema);
module.exports = CategoryModel;
