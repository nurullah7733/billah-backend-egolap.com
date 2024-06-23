const AboutUsBannerModel = require("../../models/bannerAboutUs/bannerAboutUsModel");
const createServiceWithImage = require("../../services/common/createServiceWithImage");
const deleteServiceWithImg = require("../../services/common/deleteServiceWithImg");
const getServiceById = require("../../services/common/getSerciceById");
const listService = require("../../services/common/listService");
const updateServiceWithDeleteImg = require("../../services/common/updateServiceWithDeleteImg");
const updateServiceWithImg = require("../../services/common/updateServiceWithImg");

exports.createBannerAboutUs = async (req, res) => {
  let result = await createServiceWithImage(
    req,
    AboutUsBannerModel,
    "privacy-policy",
    "1680",
    "310"
  );
  return res.status(200).json(result);
};

exports.getAllBannersAboutUs = async (req, res) => {
  let searchRgx = { $regex: req.params.searchKeyword, $options: "i" };
  let searchArray = [{ link: searchRgx }];
  let result = await listService(req, AboutUsBannerModel, searchArray);
  return res.status(200).json(result);
};
exports.getBannerByIdAboutUs = async (req, res) => {
  let result = await getServiceById(req, AboutUsBannerModel);
  return res.status(200).json(result);
};

exports.updateBannerWithImgAboutUs = async (req, res) => {
  let result = await updateServiceWithImg(
    req,
    AboutUsBannerModel,
    "privacy-policy",
    "1680",
    "310"
  );
  return res.status(200).json(result);
};
exports.deleteImgBannerAboutUs = async (req, res) => {
  let result = await updateServiceWithDeleteImg(req, AboutUsBannerModel);
  return res.status(200).json(result);
};
exports.deleteBannerAboutUs = async (req, res) => {
  let result = await deleteServiceWithImg(req, AboutUsBannerModel);
  return res.status(200).json(result);
};
