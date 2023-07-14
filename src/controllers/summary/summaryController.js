const OrderSummary = require("../../services/summary/orderSummary");
const SalesSummary = require("../../services/summary/SaleSummary");
const CancelSummary = require("../../services/summary/cancelSummary");
const RunningOrderSummary = require("../../services/summary/runningOrderSummary");

exports.orderSummary = async (req, res) => {
  let result = await OrderSummary(req);
  return res.status(200).json(result);
};
exports.runningOrderSummary = async (req, res) => {
  let result = await RunningOrderSummary(req);
  return res.status(200).json(result);
};
exports.salesSummary = async (req, res) => {
  let result = await SalesSummary(req);
  return res.status(200).json(result);
};
exports.cancelSummary = async (req, res) => {
  let result = await CancelSummary(req);
  return res.status(200).json(result);
};
