const mongoose = require("mongoose");

var bannerFaqSchema = mongoose.Schema(
  {
    img: {
      type: Array,
    },
  },
  { versionKey: false, timestamps: true }
);

var bannerFaqModel = mongoose.model("bannerfaqs", bannerFaqSchema);
module.exports = bannerFaqModel;
