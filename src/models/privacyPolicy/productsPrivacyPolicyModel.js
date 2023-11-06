const mongoose = require("mongoose");

var productsPrivacyPolicySchema = mongoose.Schema(
  {
    // privacyPolicy: { img: Array, text: String },
    // termOfUse: { img: Array, text: String },
    // team: { img: Array, text: String },
    // aboutUs: { img: Array, text: String },
    productsPrivacyPolicy: String,
  },
  { versionKey: false, timestamps: true }
);

var ProductsPrivacyPolicyModel = mongoose.model(
  "productsPrivacypolicies",
  productsPrivacyPolicySchema
);
module.exports = ProductsPrivacyPolicyModel;
