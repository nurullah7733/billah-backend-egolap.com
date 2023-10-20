const { default: mongoose } = require("mongoose");

const userRemoveToCartService = async (Request, DataModel) => {
  let id = Request.params.id;
  let reqBody = Request.body;
  let productId = reqBody.productId;

  try {
    if (mongoose.Types.ObjectId.isValid(id)) {
      let data = await DataModel.updateOne(
        { _id: id },
        { $pull: { cart: { _id: productId } } }
      );
      return { status: "success", data };
    } else {
      return { status: "fail", data: "User id invalid" };
    }
  } catch (error) {
    return { status: "fail", data: error };
  }
};

module.exports = userRemoveToCartService;
