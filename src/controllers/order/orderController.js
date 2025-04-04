let mongoose = require("mongoose");
const OrderModel = require("../../models/order/orderModel");
const PorductModel = require("../../models/product/productModel");
const { jsPDF } = require("jspdf");
require("jspdf-autotable");
const moment = require("moment");
const getDetailsByIdTwoJoinService = require("../../services/common/getDetailsByIdTwoJoinService");
const listTwoJoinService = require("../../services/common/listTwoJoinService");
const updateServiceOrderChangeStatus = require("../../services/order/updateServiceChangeOrderStatus");
var uniqid = require("uniqid");
const base64Logo = require("../../utils/base64Logo/base64Logo");
const createServiceWithIncreaseDecreaseItem = require("../../services/order/createServiceWithIncreaseDecreaseItem");
const runningOrderServices = require("../../services/order/runningOrderServices");
const deliveredOrderServices = require("../../services/order/deliveredOrderServices");
const cancelledOrderServices = require("../../services/order/cancelledOrderServices");
const returnedOrderServices = require("../../services/order/returnedOrderServices");
const SendEmailUtility = require("../../utils/sendMaliUtility");

exports.createOrder = async (req, res) => {
  let reqBody = req.body;
  let orderId = uniqid.process();
  reqBody.orderId = orderId;
  reqBody.userId = req.headers.userId;
  reqBody["paymentIntent"] = {
    paymentId: "",
    amount: reqBody.grandTotal,
  };

  let result = await createServiceWithIncreaseDecreaseItem(req, OrderModel);

  // Generate PDF invoice
  if (result?.data?.orderId?.length > 1) {
    const doc = new jsPDF();
    const imgData = base64Logo;
    const leftMargin = 10;
    const topMargin = 3;
    const imgWidth = 50;
    const imgHeight = 30;
    doc.addImage(imgData, "PNG", leftMargin, topMargin, imgWidth, imgHeight);

    const pageWidth = doc.internal.pageSize.getWidth();
    const rectWidth = 80; // Width of the "PAID" background
    const rectHeight = 12; // Height of the "PAID" background
    const x = pageWidth - rectWidth;
    const y = 0;

    const paymentStatus = result?.data?.paymentStatus;
    if (paymentStatus == "success") {
      doc.setFillColor(0, 128, 0); // Green background
    } else {
      doc.setFillColor(255, 0, 0); // Red background
    }
    doc.rect(x, y, rectWidth, rectHeight, "F");
    doc.setFontSize(20);
    doc.setTextColor(255, 255, 255); // White text color
    doc.text(
      `${paymentStatus == "success" ? "PAID" : "UNPAID"}`,
      x + rectWidth / 2,
      y + rectHeight - 3,
      {
        align: "center",
      }
    );

    // Add the Invoice heading
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text("Invoice", 160, 24, { align: "right" });

    // Add Seller's Info
    doc.setFontSize(12);
    doc.text("Company Name: eGolap", 10, 40);
    doc.text("Website: https://egolap.com", 10, 45);

    // Add Order Info
    doc.text(`Order Id: ${result.data.orderId}`, 110, 40);
    doc.text(`Order Status: ${result.data.orderStatus}`, 110, 45);
    doc.text(
      `Date: ${moment(result.data.createdAt).format(
        "MMMM Do YYYY, h:mm:ss a"
      )}`,
      110,
      50
    );

    // billing info
    doc.text("Bill To:", 10, 70);
    doc.text(
      `Payment Method: ${
        result?.data?.paymentIntent?.paymentMethod == "cashOnDelivery"
          ? "Cash On Delivery"
          : result?.data?.paymentIntent?.paymentMethod
      }`,
      10,
      75
    );
    doc.text(
      `Payment Status: ${
        result?.data?.paymentStatus == "cashOnDelivery"
          ? "Cash On Delivery"
          : result?.data?.paymentStatus ?? "N/A"
      }`,
      10,
      80
    );
    doc.text(
      `Payment Id/TrxId: ${result?.data?.paymentIntent?.paymentId || "N/A"}`,
      10,
      85
    );

    // Add Shipping Info
    doc.text("Shipping Address:", 110, 70);
    doc.text(`Customer Name: ${result?.data?.shippingAddress?.name}`, 110, 75);
    doc.text(`Mobile: ${result?.data?.shippingAddress?.mobile}`, 110, 80);
    doc.text(`Email: ${result?.data?.shippingAddress?.email}`, 110, 85);
    doc.text(`Upazilla: ${result?.data?.shippingAddress?.upazilla}`, 110, 90);
    doc.text(`District: ${result?.data?.shippingAddress?.district}`, 110, 95);
    doc.text(`Division: ${result?.data?.shippingAddress?.division}`, 110, 100);
    // Set a maximum width for the address text
    const addressText = `Address: ${
      result?.data?.shippingAddress?.address || ""
    }`;
    const maxWidth = 80;
    const addressLines = doc.splitTextToSize(addressText, maxWidth);
    doc.text(addressLines, 110, 105);

    // Add table of items
    const items = await Promise.all(
      result.data.allProducts.map(async (item) => {
        const productsDetails = await PorductModel.findById(item.productId);

        const productName = productsDetails?.name || "";
        const quantity = item?.customerChoiceProductQuantity || 0;
        const unitPrice = item?.finalPrice || 0;
        const total = unitPrice * quantity;
        const formatUnitPrice = `${unitPrice} TK`;
        const formatTotal = `${total} TK`;

        return [productName, quantity, formatUnitPrice, formatTotal];
      })
    );

    // Define the headers for the table
    const headers = [["Product Name", "Quantity", "Unit Price", "Total"]];

    // Generate the PDF with the table
    doc.autoTable({
      head: headers,
      body: items,
      startY: 120,
      theme: "grid",
      styles: {
        cellPadding: 3,
        fontSize: 10,
        halign: "center",
      },
      headStyles: {
        fillColor: [255, 0, 127],
        textColor: [255, 255, 255],
      },
      columnStyles: {
        2: { cellWidth: 30 },
        3: { cellWidth: 40 },
      },
    });

    // Add the summary (Subtotal, Taxes, etc.)
    const subTotal = result?.data?.subTotal;
    const saveAmount = result?.data?.saveAmount || 0;
    const voucherDiscount = result?.data?.voucherDiscount;
    const shippingCost = result?.data?.shippingCost;
    const otherCost = result?.data?.otherCost;
    const grandTotal = result?.data?.grandTotal;

    const finalY = doc.autoTable.previous.finalY;
    doc.text(`Subtotal: ${subTotal} TK`, 110, finalY + 10);
    doc.text(`Save Amount: ${saveAmount} TK`, 110, finalY + 15);
    doc.text(`Discount: ${voucherDiscount} TK`, 110, finalY + 20);

    doc.text(`Shipping Cost: ${shippingCost} TK`, 110, finalY + 25);
    doc.text(`Other Cost: ${otherCost} TK`, 110, finalY + 30);
    doc.setFontSize(14);
    doc.text(`Total: ${grandTotal} TK`, 110, finalY + 40);

    // Add Footer with Terms and Conditions
    doc.setFontSize(10);
    doc.text("Thank you for your business!", 10, finalY + 50);

    // Convert PDF to Buffer and send as an email attachment
    const pdfArrayBuffer = doc.output("arraybuffer");
    const pdfBuffer = Buffer.from(new Uint8Array(pdfArrayBuffer));

    // order then send email to user and admin

    const emailBodybyHtml = `<p>Thank you for your purchase! Your order has been successfully placed. Order ID: ${result?.data?.orderId}.</p><p>Click here to view your order details. <a href="https://egolap.com/user-dashboard/orders/running-orders">More Details</a> </p>`;

    await SendEmailUtility(
      reqBody?.shippingAddress?.email,
      "Order Placed",
      emailBodybyHtml,
      pdfBuffer, // Pass the PDF buffer as an attachment
      `invoice-${result?.data?._id}.pdf` // File name for the attachment
    );
  }

  return res.status(200).json(result);
};

// for admin
exports.getAllOrderForAdmin = async (req, res) => {
  let searchRgx = { $regex: req.params.searchKeyword, $options: "i" };
  let searchArray = [
    { tran_id: searchRgx },
    { orderId: searchRgx },
    { "paymentIntent.paymentMethod": searchRgx },
    { note: searchRgx },
    { "userDetails.firstName": searchRgx },
    { "userDetails.lastName": searchRgx },
    { "userDetails.email": searchRgx },
    { "userDetails.mobile": searchRgx },
    { "productsDetails.name": searchRgx },

    { "shippingAddress.name": searchRgx },
    { "shippingAddress.email": searchRgx },
    { "shippingAddress.mobile": searchRgx },
    { "shippingAddress.alternativeMobile": searchRgx },
    { "shippingAddress.city": searchRgx },
    { "shippingAddress.country": searchRgx },
    { "shippingAddress.address": searchRgx },
    { "allProducts.name": searchRgx },
    { tran_id: searchRgx },
  ];
  if (
    req.params.searchKeyword.length == 12 ||
    req.params.searchKeyword.length == 24
  ) {
    searchArray.push(
      { userId: mongoose.Types.ObjectId(req.params.searchKeyword) },
      {
        "productsDetails._id": mongoose.Types.ObjectId(
          req.params.searchKeyword
        ),
      }
    );
  }

  let joinStage1 = {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "userDetails",
      pipeline: [
        {
          $project: {
            _id: 1,
            firstName: 1,
            lastName: 1,
            email: 1,
            mobile: 1,
            photo: 1,
          },
        },
      ],
    },
  };
  let joinStage2 = {
    $lookup: {
      from: "products",
      localField: "allProducts.productId",
      foreignField: "_id",
      as: "productsDetails",
      pipeline: [
        {
          $project: {
            ratings: 0,
          },
        },
      ],
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
exports.getRunningOrderForUser = async (req, res) => {
  let searchRgx = { $regex: req.params.searchKeyword, $options: "i" };
  let searchArray = [
    { orderId: searchRgx },
    { "paymentIntent.paymentMethod": searchRgx },
    { note: searchRgx },
    { "userDetails.firstName": searchRgx },
    { "userDetails.lastName": searchRgx },
    { "userDetails.email": searchRgx },
    { "userDetails.mobile": searchRgx },

    { "productsDetails.name": searchRgx },
  ];
  if (
    req.params.searchKeyword.length == 12 ||
    req.params.searchKeyword.length == 24
  ) {
    searchArray.push(
      { userId: mongoose.Types.ObjectId(req.params.searchKeyword) },
      {
        "productsDetails._id": mongoose.Types.ObjectId(
          req.params.searchKeyword
        ),
      }
    );
  }
  let joinStage1 = {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "userDetails",
      pipeline: [
        {
          $project: {
            _id: 1,
            firstName: 1,
            lastName: 1,
            email: 1,
            mobile: 1,
            photo: 1,
          },
        },
      ],
    },
  };
  let joinStage2 = {
    $lookup: {
      from: "products",
      localField: "allProducts.productId",
      foreignField: "_id",
      as: "productsDetails",
      pipeline: [
        {
          $project: {
            ratings: 0,
          },
        },
      ],
    },
  };
  let result = await runningOrderServices(
    req,
    OrderModel,
    searchArray,
    joinStage1,
    joinStage2
  );
  return res.status(200).json(result);
};
exports.getDeliveredOrderForUser = async (req, res) => {
  let searchRgx = { $regex: req.params.searchKeyword, $options: "i" };
  let searchArray = [
    { orderId: searchRgx },
    { "paymentIntent.paymentMethod": searchRgx },
    { note: searchRgx },
    { "userDetails.firstName": searchRgx },
    { "userDetails.lastName": searchRgx },
    { "userDetails.email": searchRgx },
    { "userDetails.mobile": searchRgx },

    { "productsDetails.name": searchRgx },
  ];
  if (
    req.params.searchKeyword.length == 12 ||
    req.params.searchKeyword.length == 24
  ) {
    searchArray.push(
      { userId: mongoose.Types.ObjectId(req.params.searchKeyword) },
      {
        "productsDetails._id": mongoose.Types.ObjectId(
          req.params.searchKeyword
        ),
      }
    );
  }
  let joinStage1 = {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "userDetails",
      pipeline: [
        {
          $project: {
            _id: 1,
            firstName: 1,
            lastName: 1,
            email: 1,
            mobile: 1,
            photo: 1,
          },
        },
      ],
    },
  };
  let joinStage2 = {
    $lookup: {
      from: "products",
      localField: "allProducts.productId",
      foreignField: "_id",
      as: "productsDetails",
      pipeline: [
        {
          $project: {
            ratings: 0,
          },
        },
      ],
    },
  };
  let result = await deliveredOrderServices(
    req,
    OrderModel,
    searchArray,
    joinStage1,
    joinStage2
  );
  return res.status(200).json(result);
};
exports.getCancelledOrderForUser = async (req, res) => {
  let searchRgx = { $regex: req.params.searchKeyword, $options: "i" };
  let searchArray = [
    { orderId: searchRgx },
    { "paymentIntent.paymentMethod": searchRgx },
    { note: searchRgx },
    { "userDetails.firstName": searchRgx },
    { "userDetails.lastName": searchRgx },
    { "userDetails.email": searchRgx },
    { "userDetails.mobile": searchRgx },

    { "productsDetails.name": searchRgx },
  ];
  if (
    req.params.searchKeyword.length == 12 ||
    req.params.searchKeyword.length == 24
  ) {
    searchArray.push(
      { userId: mongoose.Types.ObjectId(req.params.searchKeyword) },
      {
        "productsDetails._id": mongoose.Types.ObjectId(
          req.params.searchKeyword
        ),
      }
    );
  }
  let joinStage1 = {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "userDetails",
      pipeline: [
        {
          $project: {
            _id: 1,
            firstName: 1,
            lastName: 1,
            email: 1,
            mobile: 1,
            photo: 1,
          },
        },
      ],
    },
  };
  let joinStage2 = {
    $lookup: {
      from: "products",
      localField: "allProducts.productId",
      foreignField: "_id",
      as: "productsDetails",
      pipeline: [
        {
          $project: {
            ratings: 0,
          },
        },
      ],
    },
  };
  let result = await cancelledOrderServices(
    req,
    OrderModel,
    searchArray,
    joinStage1,
    joinStage2
  );
  return res.status(200).json(result);
};
exports.getReturnedOrderForUser = async (req, res) => {
  let searchRgx = { $regex: req.params.searchKeyword, $options: "i" };
  let searchArray = [
    { orderId: searchRgx },
    { "paymentIntent.paymentMethod": searchRgx },
    { note: searchRgx },
    { "userDetails.firstName": searchRgx },
    { "userDetails.lastName": searchRgx },
    { "userDetails.email": searchRgx },
    { "userDetails.mobile": searchRgx },

    { "productsDetails.name": searchRgx },
  ];
  if (
    req.params.searchKeyword.length == 12 ||
    req.params.searchKeyword.length == 24
  ) {
    searchArray.push(
      { userId: mongoose.Types.ObjectId(req.params.searchKeyword) },
      {
        "productsDetails._id": mongoose.Types.ObjectId(
          req.params.searchKeyword
        ),
      }
    );
  }
  let joinStage1 = {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "userDetails",
      pipeline: [
        {
          $project: {
            _id: 1,
            firstName: 1,
            lastName: 1,
            email: 1,
            mobile: 1,
            photo: 1,
          },
        },
      ],
    },
  };
  let joinStage2 = {
    $lookup: {
      from: "products",
      localField: "allProducts.productId",
      foreignField: "_id",
      as: "productsDetails",
      pipeline: [
        {
          $project: {
            ratings: 0,
          },
        },
      ],
    },
  };
  let result = await returnedOrderServices(
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
      pipeline: [
        {
          $project: {
            _id: 1,
            firstName: 1,
            lastName: 1,
            email: 1,
            mobile: 1,
            photo: 1,
          },
        },
      ],
    },
  };
  let joinStage2 = {
    $lookup: {
      from: "products",
      localField: "allProducts.productId",
      foreignField: "_id",
      as: "productsDetails",
      pipeline: [
        {
          $project: {
            ratings: 0,
          },
        },
      ],
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
