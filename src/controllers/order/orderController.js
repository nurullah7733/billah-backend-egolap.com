let mongoose = require("mongoose");
const OrderModel = require("../../models/order/orderModel");
const getDetailsByIdTwoJoinService = require("../../services/common/getDetailsByIdTwoJoinService");
const listTwoJoinService = require("../../services/common/listTwoJoinService");
const updateServiceOrderChangeStatus = require("../../services/order/updateServiceChangeOrderStatus");
var uniqid = require("uniqid");
const createServiceWithIncreaseDecreaseItem = require("../../services/order/createServiceWithIncreaseDecreaseItem");

exports.createOrder = async (req, res) => {
  req.body.orderId = uniqid.time();
  req.body.userId = req.headers.userId;
  let result = await createServiceWithIncreaseDecreaseItem(req, OrderModel);
  return res.status(200).json(result);
};

// for admin
exports.getAllOrderForAdmin = async (req, res) => {
  let searchRgx = { $regex: req.params.searchKeyword, $options: "i" };
  let searchArray = [
    { orderId: searchRgx },
    { userId: mongoose.Types.ObjectId(req.params.searchKeyword) },
    { "paymentIntent.paymentMethod": searchRgx },
    { note: searchRgx },
    { "userDetails.firstName": searchRgx },
    { "userDetails.lastName": searchRgx },
    { "userDetails.email": searchRgx },
    { "userDetails.mobile": searchRgx },
    {
      "productsDetails._id": mongoose.Types.ObjectId(req.params.searchKeyword),
    },
    { "productsDetails.name": searchRgx },
  ];

  let joinStage1 = {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "userDetails",
    },
  };
  let joinStage2 = {
    $lookup: {
      from: "products",
      localField: "allProducts.productId",
      foreignField: "_id",
      as: "productsDetails",
    },
  };
  let result = await listTwoJoinService(
    req,
    OrderModel,
    searchArray,
    joinStage1,
    joinStage2
  );
  return res.status(200).json(result);
};

// for user
exports.getAllOrderForUser = async (req, res) => {
  let searchRgx = { $regex: req.params.searchKeyword, $options: "i" };
  let searchArray = [
    { orderId: searchRgx },
    { userId: mongoose.Types.ObjectId(req.params.searchKeyword) },
    { "paymentIntent.paymentMethod": searchRgx },
    { note: searchRgx },
    { "userDetails.firstName": searchRgx },
    { "userDetails.lastName": searchRgx },
    { "userDetails.email": searchRgx },
    { "userDetails.mobile": searchRgx },
    {
      "productsDetails._id": mongoose.Types.ObjectId(req.params.searchKeyword),
    },
    { "productsDetails.name": searchRgx },
  ];
  let joinStage1 = {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "userDetails",
    },
  };
  let joinStage2 = {
    $lookup: {
      from: "products",
      localField: "allProducts.productId",
      foreignField: "_id",
      as: "productsDetails",
    },
  };
  let result = await listTwoJoinService(
    req,
    OrderModel,
    searchArray,
    joinStage1,
    joinStage2
  );
  return res.status(200).json(result);
};

exports.getDetailsById = async (req, res) => {
  let joinStage1 = {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "userDetails",
    },
  };
  let joinStage2 = {
    $lookup: {
      from: "products",
      localField: "allProducts.productId",
      foreignField: "_id",
      as: "productsDetails",
    },
  };
  let result = await getDetailsByIdTwoJoinService(
    req,
    OrderModel,
    joinStage1,
    joinStage2
  );

  return res.status(200).json(result);
};

exports.changeOrderStatus = async (req, res) => {
  let result = await updateServiceOrderChangeStatus(req, OrderModel);
  return res.status(200).json(result);
};
