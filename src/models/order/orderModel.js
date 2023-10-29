const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    userId: mongoose.Schema.Types.ObjectId,
    tran_id: String,
    paymentStatus: String,
    allProducts: [],
    paymentIntent: {
      paymentId: String,
      paymentMethod: String,
      amount: Number,
    },
    vatTax: { type: Number, default: 0 },
    voucherDiscount: { type: Number, default: 0 },
    otherCost: { type: Number, default: 0 },
    subTotal: { type: Number, default: 0 },
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
        "Returned",
        "Failed",
        "Delivered",
      ],
    },
    shippingAddress: {
      name: String,
      email: String,
      mobile: String,
      alternativeMobile: String,
      thana: String,
      city: String,
      country: String,
      zipCode: String,
      address: String,
    },
  },
  { versionKey: false, timestamps: true }
);

const orderModel = mongoose.model("order", orderSchema);
module.exports = orderModel;
