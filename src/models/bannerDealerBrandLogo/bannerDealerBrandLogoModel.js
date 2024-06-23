const mongoose = require("mongoose");

var bannerDealerBrandLogoSchema = mongoose.Schema(
  {
    img: {
      type: Array,
    },
  },
  { versionKey: false, timestamps: true }
);

var bannerDealerBrandLogoModel = mongoose.model(
  "bannerDealerBrandLogos",
  bannerDealerBrandLogoSchema
);
module.exports = bannerDealerBrandLogoModel;
