const mongoose = require("mongoose");

var bannerPrivacyPolicySchema = mongoose.Schema(
  {
    img: {
      type: Array,
    },
  },
  { versionKey: false, timestamps: true }
);

var bannerPrivacyPolicyModel = mongoose.model(
  "bannerprivacypolicies",
  bannerPrivacyPolicySchema
);
module.exports = bannerPrivacyPolicyModel;
