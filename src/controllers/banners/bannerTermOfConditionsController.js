const TermOfConditionsBannerModel = require("../../models/bannerTermOfUse/bannerTermOfUseModel");
const createServiceWithImage = require("../../services/common/createServiceWithImage");
const deleteServiceWithImg = require("../../services/common/deleteServiceWithImg");
const getServiceById = require("../../services/common/getSerciceById");
const listService = require("../../services/common/listService");
const updateServiceWithDeleteImg = require("../../services/common/updateServiceWithDeleteImg");
const updateServiceWithImg = require("../../services/common/updateServiceWithImg");

exports.createBannerTermOfConditions = async (req, res) => {
  let result = await createServiceWithImage(
    req,
    TermOfConditionsBannerModel,
    "privacy-policy",
    "1680",
    "310"
  );
  return res.status(200).json(result);
};

exports.getAllBannersTermOfConditions = async (req, res) => {
  let searchRgx = { $regex: req.params.searchKeyword, $options: "i" };
  let searchArray = [{ link: searchRgx }];
  let result = await listService(req, TermOfConditionsBannerModel, searchArray);
  return res.status(200).json(result);
};
exports.getBannerByIdTermOfConditions = async (req, res) => {
  let result = await getServiceById(req, TermOfConditionsBannerModel);
  return res.status(200).json(result);
};

exports.updateBannerWithImgTermOfConditions = async (req, res) => {
  let result = await updateServiceWithImg(
    req,
    TermOfConditionsBannerModel,
    "privacy-policy",
    "1680",
    "310"
  );
  return res.status(200).json(result);
};
exports.deleteImgBannerTermOfConditions = async (req, res) => {
  let result = await updateServiceWithDeleteImg(
    req,
    TermOfConditionsBannerModel
  );
  return res.status(200).json(result);
};
exports.deleteBannerTermOfConditions = async (req, res) => {
  let result = await deleteServiceWithImg(req, TermOfConditionsBannerModel);
  return res.status(200).json(result);
};
