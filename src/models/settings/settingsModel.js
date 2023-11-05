const mongoose = require("mongoose");

var settingsSchema = mongoose.Schema(
  {
    logoImg: { type: Array },
    mainSlider: { type: Array },
    bestSales: { type: Array },
    provisionalBazar: { type: Array },
    bestOfElectronics: { type: Array },
    otherCost: { type: Number, default: 0 },
    shippingCost: { type: Number, default: 0 },
    socialLink: {
      facebook: String,
      twitter: String,
      instagram: String,
      youtube: String,
      whatsapp: String,
      wechat: String,
      tiktok: String,
      linkedin: String,
    },
  },
  { versionKey: false, timestamps: true }
);

var SettingsModel = mongoose.model("settings", settingsSchema);
module.exports = SettingsModel;
