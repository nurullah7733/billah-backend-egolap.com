const userRemoveToCartService = async (Request, DataModel) => {
  let id = Request.params.id;
  let reqBody = Request.body;
  let productId = reqBody.productId;

  try {
    let data = await DataModel.updateOne(
      { _id: id },
      { $pull: { cart: { _id: productId } } }
    );
    return { status: "success", data };
  } catch (error) {
    return { status: "fail", data: error };
  }
};

module.exports = userRemoveToCartService;
