const KachaBazarBannerModel = require("../../models/bannerKachaBazar/bannerKachaBazarModel");
const createServiceWithImage = require("../../services/common/createServiceWithImage");
const deleteServiceWithImg = require("../../services/common/deleteServiceWithImg");
const getServiceById = require("../../services/common/getSerciceById");
const listService = require("../../services/common/listService");
const updateServiceWithDeleteImg = require("../../services/common/updateServiceWithDeleteImg");
const updateServiceWithImg = require("../../services/common/updateServiceWithImg");

exports.createBannerKachaBazar = async (req, res) => {
  let result = await createServiceWithImage(
    req,
    KachaBazarBannerModel,
    "provisionalBazar",
    "1536",
    "200"
  );
  return res.status(200).json(result);
};

exports.getAllBannersKachaBazar = async (req, res) => {
  let searchRgx = { $regex: req.params.searchKeyword, $options: "i" };
  let searchArray = [{ link: searchRgx }];
  let result = await listService(req, KachaBazarBannerModel, searchArray);
  return res.status(200).json(result);
};
exports.getBannerByIdKachaBazar = async (req, res) => {
  let result = await getServiceById(req, KachaBazarBannerModel);
  return res.status(200).json(result);
};

exports.updateBannerWithImgKachaBazar = async (req, res) => {
  let result = await updateServiceWithImg(
    req,
    KachaBazarBannerModel,
    "provisionalBazar",
    "1536",
    "200"
  );
  return res.status(200).json(result);
};
exports.deleteImgBannerKachaBazar = async (req, res) => {
  let result = await updateServiceWithDeleteImg(req, KachaBazarBannerModel);
  return res.status(200).json(result);
};
exports.deleteBannerKachaBazar = async (req, res) => {
  let result = await deleteServiceWithImg(req, KachaBazarBannerModel);
  return res.status(200).json(result);
};
