const axios = require("axios");
const uniqid = require("uniqid");
const mongoose = require("mongoose");
const globals = require("node-global-storage"); // Commonjs
const orderModel = require("../../models/order/orderModel");
const productModel = require("../../models/product/productModel");

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

exports.BkashCallBack = async (req, res) => {
  let { paymentID, status } = req.query;
  const session = await mongoose.startSession();
  try {
    await session.startTransaction();
    if (status === "cancel" || status === "failure") {
      let ordersAllInfo = JSON.parse(globals.get("orderAllInformation"));

      await orderModel.create({
        userId: ordersAllInfo?.userId,
        paymentStatus: status,
        orderStatus: "Cancelled",
        allProducts: ordersAllInfo?.allProducts,
        "paymentIntent.paymentId": paymentID,
        "paymentIntent.paymentMethod": "bkash",
        "paymentIntent.amount": ordersAllInfo?.grandTotal,
        voucherDiscount: ordersAllInfo?.voucherDiscount,
        subTotal: ordersAllInfo?.grandTotal - ordersAllInfo?.shippingCost,
        shippingCost: ordersAllInfo?.shippingCost,
        grandTotal: ordersAllInfo?.grandTotal,

        shippingAddress: {
          name: ordersAllInfo?.shippingAddress?.name,
          email: ordersAllInfo?.shippingAddress?.email,
          mobile: ordersAllInfo?.shippingAddress?.mobile,
          alternativeMobile: ordersAllInfo?.shippingAddress?.alternativeMobile,
          thana: ordersAllInfo?.shippingAddress?.thana,
          city: ordersAllInfo?.shippingAddress?.city,
          country: ordersAllInfo?.shippingAddress?.country,
          zipCode: ordersAllInfo?.shippingAddress?.zipCode,
          address: ordersAllInfo?.shippingAddress?.address,
        },
      });

      return res.status(200).json({ status: "success", paymentStatus: status });
    } else if (status === "success") {
      let ordersAllInfo = JSON.parse(globals.get("orderAllInformation"));

      let data = await axios.post(
        process.env.bkash_execute_payment_url,
        { paymentID: paymentID },
        {
          headers: {
            Accept: "application/json",
            Authorization: globals.get("id_token"),
            "X-App-Key": process.env.bkash_app_key,
          },
        }
      );

      if (data?.statusCode === "0000" && data?.statusMessage === "Successful") {
        await orderModel.create(
          {
            userId: ordersAllInfo?.userId,
            paymentStatus: data?.transactionStatus,
            tran_id: data?.trxID,
            paymentExecuteTime: data?.paymentExecuteTime,
            merchantInvoiceNumber: data?.merchantInvoiceNumber,
            orderStatus: "Not Processed",
            allProducts: ordersAllInfo?.allProducts,
            "paymentIntent.paymentId": paymentID,
            "paymentIntent.paymentMethod": "bkash",
            "paymentIntent.amount": data?.amount,
            voucherDiscount: ordersAllInfo?.voucherDiscount,
            subTotal: ordersAllInfo?.grandTotal - ordersAllInfo?.shippingCost,
            shippingCost: ordersAllInfo?.shippingCost,
            grandTotal: ordersAllInfo?.grandTotal,

            shippingAddress: {
              name: ordersAllInfo?.shippingAddress?.name,
              email: ordersAllInfo?.shippingAddress?.email,
              mobile: ordersAllInfo?.shippingAddress?.mobile,
              alternativeMobile:
                ordersAllInfo?.shippingAddress?.alternativeMobile,
              thana: ordersAllInfo?.shippingAddress?.thana,
              city: ordersAllInfo?.shippingAddress?.city,
              country: ordersAllInfo?.shippingAddress?.country,
              zipCode: ordersAllInfo?.shippingAddress?.zipCode,
              address: ordersAllInfo?.shippingAddress?.address,
            },
          },
          { session }
        );

        for (const el of ordersAllInfo?.allProducts) {
          await productModel.updateOne(
            { _id: el._id },
            {
              $inc: {
                quantity: -Number(el?.customerChoiceProductQuantity),
                sold: Number(el?.customerChoiceProductQuantity),
              },
            },
            { session }
          );
        }

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({
          status: "success",
          statusCode: data?.statusCode,
          transactionStatus: data?.transactionStatus,
          paymentStatus: status,
        });
      } else {
        return res.status(200).json({
          status: "fail",
          statusCode: data?.statusCode,
        });
      }
    } else {
      return res.status(200).json({
        status: "fail",
        data: "Something went wrong for payments creation",
      });
    }
  } catch (error) {
    return res.status(400).json({ status: "fail", data: error.toString() });
  }
};

exports.refundPayment = async (req, res) => {
  let { trxID } = req.query;
  let reqBody = req.body;

  try {
    let productData = await orderModel.findOne({ tran_id: trxID });

    let data = await axios.post(
      process.env.bkash_refund_transaction_url,
      {
        paymentID: productData?.paymentIntent?.paymentId,
        amount: reqBody.amount.toString(),
        trxID: productData?.tran_id,
        sku: productData?.allProducts[0]?.name,
        reason: reqBody.reason,
      },
      {
        headers: {
          Accept: "application/json",
          Authorization: globals.get("id_token"),
          "X-App-Key": process.env.bkash_app_key,
        },
      }
    );

    if (data?.statusCode === "0000") {
      await orderModel.updateOne(
        { tran_id: trxID },
        { refundTrxID: data?.refundTrxID, refundAmount: data?.amount }
      );

      return res.status(200).json({ status: "success", data: data.data });
    } else {
      return res.status(200).json({ status: "fail", data: data.data });
    }
  } catch (error) {
    return res.status(400).json({ status: "fail", data: error.toString() });
  }
};
