const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    userId: mongoose.Schema.Types.ObjectId,
    orderId: String,
    allProducts: [
      {
        productId: mongoose.Schema.Types.ObjectId,
        quantity: Number,
        unitPrice: Number,
        total: Number,
        size: { type: String, uppercase: true },
        color: String,
      },
    ],
    paymentIntent: {
      paymentId: String,
      paymentMethod: String,
      amount: Number,
    },
    vatTax: { type: Number, default: 0 },
    voucherDiscount: { type: Number, default: 0 },
    otherCost: { type: Number, default: 0 },
    totalPrice: { type: Number, default: 0 },
    shippingCost: { type: Number, default: 0 },
    grandTotal: { type: Number, default: 0 },
    note: { type: String },
    orderStatus: {
      type: String,
      default: "Not Processed",
      enum: [
        "Not Processed",
        "Processing",
        "Shipping",
        "Cancelled",
        "Delivered",
      ],
    },
    shippingAddress: {
      state: String,
      zipCode: String,
      thana: String,
      district: String,
      country: String,
    },
  },
  { versionKey: false, timestamps: true }
);

const orderModel = mongoose.model("order", orderSchema);
module.exports = orderModel;
