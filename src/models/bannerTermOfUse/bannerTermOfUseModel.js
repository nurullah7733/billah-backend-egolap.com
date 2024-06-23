const mongoose = require("mongoose");

var bannerTermOfUseSchema = mongoose.Schema(
  {
    img: {
      type: Array,
    },
  },
  { versionKey: false, timestamps: true }
);

var bannerTermOfUseModel = mongoose.model(
  "bannertermofuses",
  bannerTermOfUseSchema
);
module.exports = bannerTermOfUseModel;
