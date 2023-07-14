const mongoose = require("mongoose");

var settingsSchema = mongoose.Schema(
  {
    logoImg: { type: Array },
    mainSlider: { type: Array },
    bestSales: { type: Array },
    provisionalBazar: { type: Array },
    bestOfElectronics: { type: Array },
  },
  { versionKey: false, timestamps: true }
);

var SettingsModel = mongoose.model("settings", settingsSchema);
module.exports = SettingsModel;
