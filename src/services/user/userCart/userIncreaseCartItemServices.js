const userIncreaseCartItemService = async (Request, DataModel) => {
  let id = Request.params.id;
  let reqBody = Request.body;
  let productId = reqBody.productId;

  try {
    let data = await DataModel.updateOne(
      { _id: id },
      { $pull: { cart: { _id: productId } } }
      {
        _id: id,
        "cart.id": userId,
      },
      {
        $set: {
          "ratings.$.star": star,
          "ratings.$.author": userId,
          "ratings.$.comment": comment,
        },
      }
    );
    return { status: "success", data };
  } catch (error) {
    return { status: "fail", data: error };
  }
};

module.exports = userIncreaseCartItemService;
