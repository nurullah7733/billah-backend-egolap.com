const ContactUsBannerModel = require("../../models/bannerContactUs/bannerContactUsModel");
const createServiceWithImage = require("../../services/common/createServiceWithImage");
const deleteServiceWithImg = require("../../services/common/deleteServiceWithImg");
const getServiceById = require("../../services/common/getSerciceById");
const listService = require("../../services/common/listService");
const updateServiceWithDeleteImg = require("../../services/common/updateServiceWithDeleteImg");
const updateServiceWithImg = require("../../services/common/updateServiceWithImg");

exports.createBannerContactUs = async (req, res) => {
  let result = await createServiceWithImage(
    req,
    ContactUsBannerModel,
    "privacy-policy",
    "1680",
    "310"
  );
  return res.status(200).json(result);
};

exports.getAllBannersContactUs = async (req, res) => {
  let searchRgx = { $regex: req.params.searchKeyword, $options: "i" };
  let searchArray = [{ link: searchRgx }];
  let result = await listService(req, ContactUsBannerModel, searchArray);
  return res.status(200).json(result);
};
exports.getBannerByIdContactUs = async (req, res) => {
  let result = await getServiceById(req, ContactUsBannerModel);
  return res.status(200).json(result);
};

exports.updateBannerWithImgContactUs = async (req, res) => {
  let result = await updateServiceWithImg(
    req,
    ContactUsBannerModel,
    "privacy-policy",
    "1680",
    "310"
  );
  return res.status(200).json(result);
};
exports.deleteImgBannerContactUs = async (req, res) => {
  let result = await updateServiceWithDeleteImg(req, ContactUsBannerModel);
  return res.status(200).json(result);
};
exports.deleteBannerContactUs = async (req, res) => {
  let result = await deleteServiceWithImg(req, ContactUsBannerModel);
  return res.status(200).json(result);
};
