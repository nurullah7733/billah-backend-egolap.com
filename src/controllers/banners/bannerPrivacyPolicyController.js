const PrivacyPolicyBannerModel = require("../../models/bannerPrivacyPolicy/bannerPrivacyPolicyModel");
const createServiceWithImage = require("../../services/common/createServiceWithImage");
const deleteServiceWithImg = require("../../services/common/deleteServiceWithImg");
const getServiceById = require("../../services/common/getSerciceById");
const listService = require("../../services/common/listService");
const updateServiceWithDeleteImg = require("../../services/common/updateServiceWithDeleteImg");
const updateServiceWithImg = require("../../services/common/updateServiceWithImg");

exports.createBannerPrivacyPolicy = async (req, res) => {
  let result = await createServiceWithImage(
    req,
    PrivacyPolicyBannerModel,
    "privacy-policy",
    "1680",
    "310"
  );
  return res.status(200).json(result);
};

exports.getAllBannersPrivacyPolicy = async (req, res) => {
  let searchRgx = { $regex: req.params.searchKeyword, $options: "i" };
  let searchArray = [{ link: searchRgx }];
  let result = await listService(req, PrivacyPolicyBannerModel, searchArray);
  return res.status(200).json(result);
};
exports.getBannerByIdPrivacyPolicy = async (req, res) => {
  let result = await getServiceById(req, PrivacyPolicyBannerModel);
  return res.status(200).json(result);
};

exports.updateBannerWithImgPrivacyPolicy = async (req, res) => {
  let result = await updateServiceWithImg(
    req,
    PrivacyPolicyBannerModel,
    "privacy-policy",
    "1680",
    "310"
  );
  return res.status(200).json(result);
};
exports.deleteImgBannerPrivacyPolicy = async (req, res) => {
  let result = await updateServiceWithDeleteImg(req, PrivacyPolicyBannerModel);
  return res.status(200).json(result);
};
exports.deleteBannerPrivacyPolicy = async (req, res) => {
  let result = await deleteServiceWithImg(req, PrivacyPolicyBannerModel);
  return res.status(200).json(result);
};
