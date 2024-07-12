const dealerBrandLogoModel = require("../../models/dealerBrandLogo/dealerBrandLogoModel");
const createServiceWithImage = require("../../services/common/createServiceWithImage");
const deleteServiceWithImg = require("../../services/common/deleteServiceWithImg");
const getServiceById = require("../../services/common/getSerciceById");
const listService = require("../../services/common/listService");
const updateServiceWithDeleteImg = require("../../services/common/updateServiceWithDeleteImg");
const updateServiceWithImg = require("../../services/common/updateServiceWithImg");

exports.createDealerBrandLogo = async (req, res) => {
  let result = await createServiceWithImage(
    req,
    dealerBrandLogoModel,
    "dealerBrandLogo",
    "300",
    "100"
  );
  return res.status(200).json(result);
};

exports.getAllDealerBrandLogo = async (req, res) => {
  let searchRgx = { $regex: req.params.searchKeyword, $options: "i" };
  let searchArray = [{ link: searchRgx }];
  let result = await listService(req, dealerBrandLogoModel, searchArray);
  return res.status(200).json(result);
};
exports.getBannerByIdDealerBrandLogo = async (req, res) => {
  let result = await getServiceById(req, dealerBrandLogoModel);
  return res.status(200).json(result);
};

exports.updateBannerWithImgDealerBrandLogo = async (req, res) => {
  let result = await updateServiceWithImg(
    req,
    dealerBrandLogoModel,
    "dealerBrandLogo",
    "300",
    "100"
  );
  return res.status(200).json(result);
};
exports.deleteImgDealerBrandLogo = async (req, res) => {
  let result = await updateServiceWithDeleteImg(req, dealerBrandLogoModel);
  return res.status(200).json(result);
};
exports.deleteDealerBrandLogo = async (req, res) => {
  let result = await deleteServiceWithImg(req, dealerBrandLogoModel);
  return res.status(200).json(result);
};
