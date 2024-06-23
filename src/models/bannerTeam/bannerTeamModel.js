const mongoose = require("mongoose");

var bannerTeamSchema = mongoose.Schema(
  {
    img: {
      type: Array,
    },
  },
  { versionKey: false, timestamps: true }
);

var bannerTeamModel = mongoose.model("bannerteam", bannerTeamSchema);
module.exports = bannerTeamModel;
