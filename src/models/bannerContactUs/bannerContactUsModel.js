const mongoose = require("mongoose");

var bannerContactUsSchema = mongoose.Schema(
  {
    img: {
      type: Array,
    },
  },
  { versionKey: false, timestamps: true }
);

var bannerContactUsModel = mongoose.model(
  "bannerContactUs",
  bannerContactUsSchema
);
module.exports = bannerContactUsModel;
