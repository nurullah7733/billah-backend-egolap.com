const mongoose = require("mongoose");

var bannerKachaBazarSchema = mongoose.Schema(
  {
    img: {
      type: Array,
    },
  },
  { versionKey: false, timestamps: true }
);

var bannerKachaBazarModel = mongoose.model(
  "bannerkachabazars",
  bannerKachaBazarSchema
);
module.exports = bannerKachaBazarModel;
