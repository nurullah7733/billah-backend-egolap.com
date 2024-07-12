const mongoose = require("mongoose");
const ShippingCostModel = require("../../models/shippingCost/shippingCostModel");
const createService = require("../../services/common/createService");
const deleteService = require("../../services/common/deleteService");
const dropdownListService = require("../../services/common/dropdownListService");
const getServiceById = require("../../services/common/getSerciceById");
const listService = require("../../services/common/listService");
const updateService = require("../../services/common/updateService");

exports.createShippingCost = async (req, res) => {
  try {
    let data = await createService(req, ShippingCostModel);
    return res.status(200).json({ status: "success", data: data });
  } catch (e) {
    return res.status(200).json({ status: "fail", data: e });
  }
};
exports.listShippingCost = async (req, res) => {
  let searchRgx = { $regex: req.params.searchKeyword, $options: "i" };
  let searchArray = [{ name: searchRgx }];
  let result = await listService(req, ShippingCostModel, searchArray);
  return res.status(200).json(result);
};

exports.getShippingCostDetailsById = async (req, res) => {
  let result = await getServiceById(req, ShippingCostModel);
  return res.status(200).json(result);
};

exports.updateShippingCost = async (req, res) => {
  let data = await updateService(req, ShippingCostModel);
  return res.status(200).json(data);
};
exports.deleteShippingCost = async (req, res) => {
  let result = await deleteService(req, ShippingCostModel);
  return res.status(200).json(result);
};
