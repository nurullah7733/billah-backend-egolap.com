const mongoose = require("mongoose");

var dealerBrandLogoSchema = mongoose.Schema(
  {
    img: {
      type: Array,
    },
  },
  { versionKey: false, timestamps: true }
);

var dealerBrandLogoModel = mongoose.model(
  "dealerbrandlogos",
  dealerBrandLogoSchema
);
module.exports = dealerBrandLogoModel;
