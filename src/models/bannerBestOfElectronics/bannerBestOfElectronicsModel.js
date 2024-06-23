const mongoose = require("mongoose");

var bannerBestOfElectronicsSchema = mongoose.Schema(
  {
    img: {
      type: Array,
    },
  },
  { versionKey: false, timestamps: true }
);

var bannerBestOfElectronicsModel = mongoose.model(
  "bannerbestofelectronics",
  bannerBestOfElectronicsSchema
);
module.exports = bannerBestOfElectronicsModel;
