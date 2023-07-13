let ProductsModel = require("../../models/product/productModel");
const updateServiceOrderChangeStatus = async (Request, DataModel) => {
  let id = Request.params.id || Request.body.id;
  let orderStatus = Request.body.orderStatus;
  try {
    let allData;
    let checkAllreadyCanceled = await DataModel.find({ _id: id });

    if (
      checkAllreadyCanceled[0].orderStatus !== "Cancelled" &&
      orderStatus === "Cancelled"
    ) {
      console.log("1");
      checkAllreadyCanceled[0].allProducts.map(async (prod) => {
        allData = await ProductsModel.findOneAndUpdate(
          { _id: prod.productId },
          {
            $inc: {
              quantity: Number(prod.quantity),
              sold: -Number(prod.quantity),
            },
          }
        );
      });
      let updateStatus = await DataModel.findOneAndUpdate(
        { _id: id },
        { orderStatus: orderStatus }
      );

      return { status: "success", data: updateStatus };
    } else if (
      checkAllreadyCanceled[0].orderStatus === "Cancelled" &&
      orderStatus === "Cancelled"
    ) {
      return {
        status: "fail",
        data: "You have allready Cancelled this order.",
      };
    } else {
      if (checkAllreadyCanceled[0].orderStatus !== "Cancelled") {
        console.log("2");
        allData = await DataModel.updateOne(
          { _id: id },
          { orderStatus: orderStatus }
        );
        return { status: "success", data: allData };
      } else {
        console.log("3");
        return {
          status: "fail",
          data: "You have allready canceled this order, Please Order again.",
        };
      }
    }
  } catch (e) {
    return { status: "fail", data: e.toString() };
  }
};

module.exports = updateServiceOrderChangeStatus;
