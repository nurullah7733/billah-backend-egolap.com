const BestOfElectronicsBannerModel = require("../../models/bannerBestOfElectronics/bannerBestOfElectronicsModel");
const createServiceWithImage = require("../../services/common/createServiceWithImage");
const deleteServiceWithImg = require("../../services/common/deleteServiceWithImg");
const getServiceById = require("../../services/common/getSerciceById");
const listService = require("../../services/common/listService");
const updateServiceWithDeleteImg = require("../../services/common/updateServiceWithDeleteImg");
const updateServiceWithImg = require("../../services/common/updateServiceWithImg");

exports.createBannerBestOfElectronics = async (req, res) => {
  let result = await createServiceWithImage(
    req,
    BestOfElectronicsBannerModel,
    "bestOfElectronics",
    "1536",
    "200"
  );
  return res.status(200).json(result);
};

exports.getAllBannersBestOfElectronics = async (req, res) => {
  let searchRgx = { $regex: req.params.searchKeyword, $options: "i" };
  let searchArray = [{ link: searchRgx }];
  let result = await listService(
    req,
    BestOfElectronicsBannerModel,
    searchArray
  );
  return res.status(200).json(result);
};
exports.getBannerByIdBestOfElectronics = async (req, res) => {
  let result = await getServiceById(req, BestOfElectronicsBannerModel);
  return res.status(200).json(result);
};

exports.updateBannerWithImgBestOfElectronics = async (req, res) => {
  let result = await updateServiceWithImg(
    req,
    BestOfElectronicsBannerModel,
    "bestOfElectronics",
    "1536",
    "200"
  );
  return res.status(200).json(result);
};
exports.deleteImgBannerBestOfElectronics = async (req, res) => {
  let result = await updateServiceWithDeleteImg(
    req,
    BestOfElectronicsBannerModel
  );
  return res.status(200).json(result);
};
exports.deleteBannerBestOfElectronics = async (req, res) => {
  let result = await deleteServiceWithImg(req, BestOfElectronicsBannerModel);
  return res.status(200).json(result);
};
