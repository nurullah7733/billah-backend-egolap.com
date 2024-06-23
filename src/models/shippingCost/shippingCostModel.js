const mongoose = require("mongoose");

var shippingCostSchema = mongoose.Schema(
  {
    shippingCostThakurgaonSadar: { type: Number, default: 0 },
    otherCostThakurgaonSadar: { type: Number, default: 0 },

    shippingCostThakurgaon: { type: Number, default: 0 },
    otherCostThakurgaon: { type: Number, default: 0 },

    shippingCostDhaka: { type: Number, default: 0 },
    otherCostDhaka: { type: Number, default: 0 },

    shippingCost: { type: Number, default: 0 },
    otherCost: { type: Number, default: 0 },
  },
  { versionKey: false, timestamps: true }
);

var ShippingCostModel = mongoose.model("shippingcosts", shippingCostSchema);
module.exports = ShippingCostModel;
