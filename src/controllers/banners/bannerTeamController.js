const TeamBannerModel = require("../../models/bannerTeam/bannerTeamModel");
const createServiceWithImage = require("../../services/common/createServiceWithImage");
const deleteServiceWithImg = require("../../services/common/deleteServiceWithImg");
const getServiceById = require("../../services/common/getSerciceById");
const listService = require("../../services/common/listService");
const updateServiceWithDeleteImg = require("../../services/common/updateServiceWithDeleteImg");
const updateServiceWithImg = require("../../services/common/updateServiceWithImg");

exports.createBannerTeam = async (req, res) => {
  let result = await createServiceWithImage(
    req,
    TeamBannerModel,
    "privacy-policy",
    "1680",
    "310"
  );
  return res.status(200).json(result);
};

exports.getAllBannersTeam = async (req, res) => {
  let searchRgx = { $regex: req.params.searchKeyword, $options: "i" };
  let searchArray = [{ link: searchRgx }];
  let result = await listService(req, TeamBannerModel, searchArray);
  return res.status(200).json(result);
};
exports.getBannerByIdTeam = async (req, res) => {
  let result = await getServiceById(req, TeamBannerModel);
  return res.status(200).json(result);
};

exports.updateBannerWithImgTeam = async (req, res) => {
  let result = await updateServiceWithImg(
    req,
    TeamBannerModel,
    "privacy-policy",
    "1680",
    "310"
  );
  return res.status(200).json(result);
};
exports.deleteImgBannerTeam = async (req, res) => {
  let result = await updateServiceWithDeleteImg(req, TeamBannerModel);
  return res.status(200).json(result);
};
exports.deleteBannerTeam = async (req, res) => {
  let result = await deleteServiceWithImg(req, TeamBannerModel);
  return res.status(200).json(result);
};
