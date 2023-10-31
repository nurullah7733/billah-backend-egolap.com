let ProductsModel = require("../../models/product/productModel");

const updateServiceOrderChangeStatus = async (Request, DataModel) => {
  let id = Request.params.id || Request.body.id;
  let orderStatus = Request.body.orderStatus;
  console.log(Request.body);
  try {
    let allData;
    let checkAllreadyCanceled = await DataModel.find({ _id: id });

    if (
      (checkAllreadyCanceled[0].orderStatus !== "Cancelled" &&
        orderStatus == "Cancelled") ||
      (checkAllreadyCanceled[0].orderStatus !== "Returned" &&
        orderStatus == "Returned") ||
      (checkAllreadyCanceled[0].orderStatus !== "Failed" &&
        orderStatus == "Failed")
    ) {
      checkAllreadyCanceled[0].allProducts.map(async (prod) => {
        allData = await ProductsModel.findOneAndUpdate(
          { _id: prod._id },
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
      (checkAllreadyCanceled[0].orderStatus === "Cancelled" &&
        orderStatus === "Cancelled") ||
      (checkAllreadyCanceled[0].orderStatus === "Returned" &&
        orderStatus === "Returned")
    ) {
      return {
        status: "fail",
        data: "You have already Cancelled/Returned this order.",
      };
    } else {
      if (
        checkAllreadyCanceled[0].orderStatus !== "Cancelled" ||
        checkAllreadyCanceled[0].orderStatus !== "Returned"
      ) {
        allData = await DataModel.updateOne(
          { _id: id },
          { orderStatus: orderStatus }
        );
        return { status: "success", data: allData };
      } else {
        return {
          status: "fail",
          data: "fail, Please Order again.",
        };
      }
    }
  } catch (e) {
    return { status: "fail", data: e.toString() };
  }
};

module.exports = updateServiceOrderChangeStatus;
