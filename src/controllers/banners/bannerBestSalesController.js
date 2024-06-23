const BestSalesBannerModel = require("../../models/bannerBestSales/bannerBestSalesModel");
const createServiceWithImage = require("../../services/common/createServiceWithImage");
const deleteServiceWithImg = require("../../services/common/deleteServiceWithImg");
const getServiceById = require("../../services/common/getSerciceById");
const listService = require("../../services/common/listService");
const updateServiceWithDeleteImg = require("../../services/common/updateServiceWithDeleteImg");
const updateServiceWithImg = require("../../services/common/updateServiceWithImg");

exports.createBannerBestSales = async (req, res) => {
  let result = await createServiceWithImage(
    req,
    BestSalesBannerModel,
    "bestSales",
    "1536",
    "200"
  );
  return res.status(200).json(result);
};

exports.getAllBannersBestSales = async (req, res) => {
  let searchRgx = { $regex: req.params.searchKeyword, $options: "i" };
  let searchArray = [{ link: searchRgx }];
  let result = await listService(req, BestSalesBannerModel, searchArray);
  return res.status(200).json(result);
};
exports.getBannerByIdBestSales = async (req, res) => {
  let result = await getServiceById(req, BestSalesBannerModel);
  return res.status(200).json(result);
};

exports.updateBannerWithImgBestSales = async (req, res) => {
  let result = await updateServiceWithImg(
    req,
    BestSalesBannerModel,
    "bestSales",
    "1536",
    "200"
  );
  return res.status(200).json(result);
};
exports.deleteImgBannerBestSales = async (req, res) => {
  let result = await updateServiceWithDeleteImg(req, BestSalesBannerModel);
  return res.status(200).json(result);
};
exports.deleteBannerBestSales = async (req, res) => {
  let result = await deleteServiceWithImg(req, BestSalesBannerModel);
  return res.status(200).json(result);
};
