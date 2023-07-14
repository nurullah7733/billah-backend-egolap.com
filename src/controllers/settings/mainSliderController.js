const SettingsModel = require("../../models/settings/settingsModel");
const updateServiceWithDeleteImgForMainSlider = require("../../services/settings/mainSlider/updateServiceWithDeleteImgForMainSlider");
const updateServiceWithImgForMainSlider = require("../../services/settings/mainSlider/updateServiceWithImgForMainSlider");

exports.pushMainSlider = async (req, res) => {
  let result = await updateServiceWithImgForMainSlider(
    req,
    SettingsModel,
    "mainSlider",
    "1680",
    "450"
  );
  return res.status(200).json(result);
};
exports.deleteMainSlider = async (req, res) => {
  let result = await updateServiceWithDeleteImgForMainSlider(
    req,
    SettingsModel
  );
  return res.status(200).json(result);
};
