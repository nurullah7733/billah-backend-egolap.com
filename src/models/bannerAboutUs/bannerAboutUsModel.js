const mongoose = require("mongoose");

var bannerAboutUsSchema = mongoose.Schema(
  {
    img: {
      type: Array,
    },
  },
  { versionKey: false, timestamps: true }
);

var bannerAboutUsModel = mongoose.model("banneraboutuss", bannerAboutUsSchema);
module.exports = bannerAboutUsModel;
