const mongoose = require("mongoose");

var bannerBestSalesSchema = mongoose.Schema(
  {
    img: {
      type: Array,
    },
  },
  { versionKey: false, timestamps: true }
);

var bannerBestSalesModel = mongoose.model(
  "bannerbestsales",
  bannerBestSalesSchema
);
module.exports = bannerBestSalesModel;
