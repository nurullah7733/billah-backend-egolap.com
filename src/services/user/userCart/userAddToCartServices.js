const userAddToCartService = async (Request, DataModel) => {
  let id = Request.params.id;
  let reqBody = Request.body;
  let cart = reqBody.cart;

  try {
    // 1
    // let data = await DataModel.find({ _id: id });
    // 2
 
      let data = await DataModel.findOne({ _id: mongoose.Types.ObjectId(id) });
      let cart = data.cart;
  
      const  uniqueItem = cart.filter.(value => );
  
      return { status: "success", cart };
 

    return { status: "success", data };
  } catch (error) {
    return { status: "fail", data: error };
  }
};

module.exports = userAddToCartService;
