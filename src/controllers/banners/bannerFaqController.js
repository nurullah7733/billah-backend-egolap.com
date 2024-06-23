const FaqBannerModel = require("../../models/bannerFaq/bannerFaqModel");
const createServiceWithImage = require("../../services/common/createServiceWithImage");
const deleteServiceWithImg = require("../../services/common/deleteServiceWithImg");
const getServiceById = require("../../services/common/getSerciceById");
const listService = require("../../services/common/listService");
const updateServiceWithDeleteImg = require("../../services/common/updateServiceWithDeleteImg");
const updateServiceWithImg = require("../../services/common/updateServiceWithImg");

exports.createBannerFaq = async (req, res) => {
  let result = await createServiceWithImage(
    req,
    FaqBannerModel,
    "privacy-policy",
    "1680",
    "310"
  );
  return res.status(200).json(result);
};

exports.getAllBannersFaq = async (req, res) => {
  let searchRgx = { $regex: req.params.searchKeyword, $options: "i" };
  let searchArray = [{ link: searchRgx }];
  let result = await listService(req, FaqBannerModel, searchArray);
  return res.status(200).json(result);
};
exports.getBannerByIdFaq = async (req, res) => {
  let result = await getServiceById(req, FaqBannerModel);
  return res.status(200).json(result);
};

exports.updateBannerWithImgFaq = async (req, res) => {
  let result = await updateServiceWithImg(
    req,
    FaqBannerModel,
    "privacy-policy",
    "1680",
    "310"
  );
  return res.status(200).json(result);
};
exports.deleteImgBannerFaq = async (req, res) => {
  let result = await updateServiceWithDeleteImg(req, FaqBannerModel);
  return res.status(200).json(result);
};
exports.deleteBannerFaq = async (req, res) => {
  let result = await deleteServiceWithImg(req, FaqBannerModel);
  return res.status(200).json(result);
};
