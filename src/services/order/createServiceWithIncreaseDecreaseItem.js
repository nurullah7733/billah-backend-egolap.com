let ProdcutModel = require("../../models/product/productModel");
const createServiceWithIncreaseDecreaseItem = async (Request, DataModel) => {
  let reqBody = Request.body;
  let allProducts = Request.body.allProducts;

  try {
    await allProducts.map(async (prod) => {
      await ProdcutModel.findOneAndUpdate(
        { _id: prod.productId },
        {
          $inc: {
            quantity: -Number(prod.quantity),
            sold: Number(prod.quantity),
          },
        }
      );
    });

    let data = await DataModel.create(reqBody);
    return { status: "success", data };
  } catch (e) {
    return { status: "fail", data: e };
  }
};

module.exports = createServiceWithIncreaseDecreaseItem;
