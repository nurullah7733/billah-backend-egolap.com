const axios = require("axios");
const uniqid = require("uniqid");
const mongoose = require("mongoose");
const globals = require("node-global-storage"); // Commonjs
const orderModel = require("../../models/order/orderModel");
const productModel = require("../../models/product/productModel");

let headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: globals.get("id_token"),
  "X-App-Key": process.env.bkash_app_key,
};

exports.createPayment = async (req, res) => {
  let reqBody = req.body;
  globals.unset("orderAllInformation");
  try {
    globals.set("orderAllInformation", JSON.stringify(reqBody));

    let data = await axios.post(
      process.env.bkash_create_payment_url,
      {
        mode: "0011",
        payerReference: reqBody.grandTotal.toString(),
        callbackURL: process.env.BACKEND_DOMAIN + "/bkash-callback",
        amount: reqBody.grandTotal,
        currency: "BDT",
        intent: "sale",
        merchantInvoiceNumber: uniqid("merchantInvoice-"),
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: globals.get("id_token"),
          "X-App-Key": process.env.bkash_app_key,
        },
      }
    );

    return res.status(200).json({ status: "success", data: data.data });
  } catch (error) {
    return res.status(400).json({ status: "fail", data: error.toString() });
  }
};
