const mongoose = require("mongoose");
const TeamOwnersModel = require("../../models/team/teamOwnersModel");
const ProductModel = require("../../models/product/productModel");
const checkAssociateService = require("../../services/common/checkAssociateService");
const dropdownListService = require("../../services/common/dropdownListService");
const getServiceById = require("../../services/common/getSerciceById");
const listService = require("../../services/common/listService");
const createServiceWithImage = require("../../services/common/createServiceWithImage");
const updateServiceWithImg = require("../../services/common/updateServiceWithImg");
const updateServiceWithDeleteImg = require("../../services/common/updateServiceWithDeleteImg");
const deleteServiceWithImg = require("../../services/common/deleteServiceWithImg");

exports.createTeamOwner = async (req, res) => {
  let result = await createServiceWithImage(
    req,
    TeamOwnersModel,
    "teamowners",
    300,
    300
  );
  return res.status(200).json(result);
};

exports.listTeamOwner = async (req, res) => {
  let searchRgx = { $regex: req.params.searchKeyword, $options: "i" };
  let searchArray = [{ name: searchRgx }];
  let result = await listService(req, TeamOwnersModel, searchArray);
  return res.status(200).json(result);
};

exports.getTeamOwnerById = async (req, res) => {
  let result = await getServiceById(req, TeamOwnersModel);
  return res.status(200).json(result);
};

exports.updateTeamOwner = async (req, res) => {
  let result = await updateServiceWithImg(
    req,
    TeamOwnersModel,
    "teamowners",
    300,
    300
  );
  return res.status(200).json(result);
};

exports.deleteTeamOwnerImgAndpullImg = async (req, res) => {
  let result = await updateServiceWithDeleteImg(req, TeamOwnersModel);
  return res.status(200).json(result);
};

exports.deleteTeamOwnerWithImg = async (req, res) => {
  let result = await deleteServiceWithImg(req, TeamOwnersModel);
  return res.status(200).json(result);
};
