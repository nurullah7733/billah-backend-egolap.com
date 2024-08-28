let ProductsModel = require("../../models/product/productModel");
const SendEmailUtility = require("../../utils/sendMaliUtility");

const updateServiceOrderChangeStatus = async (Request, DataModel) => {
  let id = Request.params.id || Request.body.id;
  let orderStatus = Request.body.orderStatus;

  try {
    let allData;
    let checkAllreadyCanceled = await DataModel.find({ _id: id });

    if (
      (checkAllreadyCanceled[0]?.orderStatus !== "Cancelled" &&
        orderStatus == "Cancelled") ||
      (checkAllreadyCanceled[0]?.orderStatus !== "Returned" &&
        orderStatus == "Returned") ||
      (checkAllreadyCanceled[0]?.orderStatus !== "Failed" &&
        orderStatus == "Failed")
    ) {
      checkAllreadyCanceled[0]?.allProducts.map(async (prod) => {
        allData = await ProductsModel.findOneAndUpdate(
          { _id: prod.productId },
          {
            $inc: {
              quantity: Number(prod.customerChoiceProductQuantity),
              sold: -Number(prod.customerChoiceProductQuantity),
            },
          }
        );
      });
      let updateStatus = await DataModel.findOneAndUpdate(
        { _id: id },
        { orderStatus: orderStatus }
      );
      // order status change then send email to user
      if (updateStatus) {
        if (orderStatus === "Processing") {
          const emailBodybyHtml = `<p>We have processed your order and it is now being prepared for shipment. Order Id: ${checkAllreadyCanceled[0]?.orderId}.</p><p>Click here to view your order details. <a href="https://egolap.com/user-dashboard/orders/running-orders">More Details</a> </p>`;
          await SendEmailUtility(
            Request.headers.email,
            "Order Status",
            emailBodybyHtml
          );
        } else if (orderStatus === "Shipping") {
          const emailBodybyHtml = `<p>Good news! Your order has been dispatched and will be delivered soon. Track your shipment here Order Id: ${checkAllreadyCanceled[0]?.orderId}.</p><p>Click here to view your order details. <a href="https://egolap.com/user-dashboard/orders/running-orders">More Details</a> </p>`;
          await SendEmailUtility(
            Request.headers.email,
            "Order Status",
            emailBodybyHtml
          );
        } else if (orderStatus === "Delivered") {
          const emailBodybyHtml = `<p>Your order has been delivered. We hope you enjoy your purchase! Order Id: ${checkAllreadyCanceled[0]?.orderId}.</p><p>Click here to view your order details. <a href="https://egolap.com/user-dashboard/orders/running-orders">More Details</a> </p>`;
          const sendEmail = await SendEmailUtility(
            Request.headers.email,
            "Order Status",
            emailBodybyHtml
          );
        } else if (orderStatus === "Cancelled") {
          const emailBodybyHtml = `<p>Your order has been canceled as per your request. Order Id: ${checkAllreadyCanceled[0]?.orderId}.</p><p>Click here to view your order details. <a href="https://egolap.com/user-dashboard/orders/running-orders">More Details</a> </p>`;
          await SendEmailUtility(
            Request.headers.email,
            "Order Status",
            emailBodybyHtml
          );
        } else if (orderStatus === "Returned") {
          const emailBodybyHtml = `<p>Your return has been processed. We have issued a refund to your account. Order Id: ${checkAllreadyCanceled[0]?.orderId}.</p><p>Click here to view your order details. <a href="https://egolap.com/user-dashboard/orders/running-orders">More Details</a> </p>`;
          await SendEmailUtility(
            Request.headers.email,
            "Order Status",
            emailBodybyHtml
          );
        }
      } else {
        const emailBodybyHtml = `<p>Your order has been ${orderStatus}. Order Id: ${checkAllreadyCanceled[0]?.orderId}.</p><p>Click here to view your order details. <a href="https://egolap.com/user-dashboard/orders/running-orders">More Details</a> </p>`;
        await SendEmailUtility(
          Request.headers.email,
          "Order Status",
          emailBodybyHtml
        );
      }

      return { status: "success", data: updateStatus };
    } else if (
      (checkAllreadyCanceled[0]?.orderStatus === "Cancelled" &&
        orderStatus === "Cancelled") ||
      (checkAllreadyCanceled[0]?.orderStatus === "Returned" &&
        orderStatus === "Returned")
    ) {
      return {
        status: "fail",
        data: "You have already Cancelled/Returned this order.",
      };
    } else {
      if (
        checkAllreadyCanceled[0]?.orderStatus !== "Cancelled" ||
        checkAllreadyCanceled[0]?.orderStatus !== "Returned"
      ) {
        allData = await DataModel.updateOne(
          { _id: id },
          { orderStatus: orderStatus }
        );

        // order status change then send email to user
        if (allData) {
          if (orderStatus === "Processing") {
            const emailBodybyHtml = `<p>We have processed your order and it is now being prepared for shipment. Order Id: ${checkAllreadyCanceled[0]?.orderId}.</p><p>Click here to view your order details. <a href="https://egolap.com/user-dashboard/orders/running-orders">More Details</a> </p>`;
            await SendEmailUtility(
              Request.headers.email,
              "Order Status",
              emailBodybyHtml
            );
          } else if (orderStatus === "Shipping") {
            const emailBodybyHtml = `<p>Good news! Your order has been dispatched and will be delivered soon. Track your shipment here Order Id: ${checkAllreadyCanceled[0]?.orderId}.</p><p>Click here to view your order details. <a href="https://egolap.com/user-dashboard/orders/running-orders">More Details</a> </p>`;

            await SendEmailUtility(
              Request.headers.email,
              "Order Status",
              emailBodybyHtml
            );
          } else if (orderStatus === "Delivered") {
            const emailBodybyHtml = `<p>Your order has been delivered. We hope you enjoy your purchase! Order Id: ${checkAllreadyCanceled[0]?.orderId}.</p><p>Click here to view your order details. <a href="https://egolap.com/user-dashboard/orders/running-orders">More Details</a> </p>`;

            await SendEmailUtility(
              Request.headers.email,
              "Order Status",
              emailBodybyHtml
            );
          } else if (orderStatus === "Cancelled") {
            const emailBodybyHtml = `<p>Your order has been canceled as per your request. Order Id: ${checkAllreadyCanceled[0]?.orderId}.</p><p>Click here to view your order details. <a href="https://egolap.com/user-dashboard/orders/running-orders">More Details</a> </p>`;

            await SendEmailUtility(
              Request.headers.email,
              "Order Status",
              emailBodybyHtml
            );
          } else if (orderStatus === "Returned") {
            const emailBodybyHtml = `<p>Your return has been processed. We have issued a refund to your account. Order Id: ${checkAllreadyCanceled[0]?.orderId}.</p><p>Click here to view your order details. <a href="https://egolap.com/user-dashboard/orders/running-orders">More Details</a> </p>`;

            await SendEmailUtility(
              Request.headers.email,
              "Order Status",
              emailBodybyHtml
            );
          }
        } else {
          const emailBodybyHtml = `<p>Your order has been ${orderStatus}. Order Id: ${checkAllreadyCanceled[0]?.orderId}</p><p>Click here to view your order details. <a href="https://egolap.com/user-dashboard/orders/running-orders">More Details</a> </p>`;
          await SendEmailUtility(
            Request.headers.email,
            "Order Status",
            emailBodybyHtml
          );
        }
        return { status: "success", data: allData };
      } else {
        return {
          status: "fail",
          data: "fail, Please Order again.",
        };
      }
    }
  } catch (e) {
    console.log(e);
    return { status: "fail", data: e.toString() };
  }
};

module.exports = updateServiceOrderChangeStatus;
