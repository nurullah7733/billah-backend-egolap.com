const mongoose = require("mongoose");
const slugify = require("slugify");
const ProductModel = require("../../models/product/productModel");
const OrderProductModel = require("../../models/order/orderProductsModel");
const createServiceWithImage = require("../../services/common/createServiceWithImage");
const dropdownListService = require("../../services/common/dropdownListService");
const getServiceById = require("../../services/common/getSerciceById");
const listTwoJoinService = require("../../services/common/listTwoJoinService");
const listThreeJoinServiceForGlobal = require("../../services/common/listThreeJoinServiceForGlobal");
const updateService = require("../../services/common/updateService");
const checkAssociateService = require("../../services/common/checkAssociateService");
const deleteServiceWithImg = require("../../services/common/deleteServiceWithImg");
const updateServiceWithImg = require("../../services/common/updateServiceWithImg");
const updateServiceWithDeleteImg = require("../../services/common/updateServiceWithDeleteImg");
const listThreeJoinService = require("../../services/common/listThreeJoinService");
const listThreeJoinServiceBestSalesForGlobal = require("../../services/common/listThreeJoinServiceBestSalesForGlobal");

exports.createProduct = async (req, res) => {
  if (req.body.name !== "undefined") {
    req.body.slug = slugify(req.body.name);
  }
  console.log(req.body.discount);
  if (
    (req.body.price !== "undefined" && req.body.discount == 0) ||
    req.body.discount == undefined
  ) {
    req.body.finalPrice = Number(req.body.price);
    req.body.discount = 0;
    req.body.saveAmount = 0;
  } else if (
    req.body.price !== "undefined" &&
    req.body.discount !== "undefined"
  ) {
    req.body.finalPrice = (
      (Number(req.body.price) * (100 - req.body.discount)) /
      100
    ).toFixed();
    req.body.saveAmount = (
      Number(req.body.price) *
      (req.body.discount / 100)
    ).toFixed();
  }
  let result = await createServiceWithImage(
    req,
    ProductModel,
    "products",
    300,
    300
  );

  return res.status(200).json(result);
};
exports.listProduct = async (req, res) => {
  let searchRgx = { $regex: req.params.searchKeyword, $options: "i" };
  let searchArray = [
    { name: searchRgx },
    { slug: searchRgx },
    { color: searchRgx },
    { "category.name": searchRgx },
    { "subCategory.name": searchRgx },
    { "brand.name": searchRgx },
  ];
  let joinStage1 = {
    $lookup: {
      from: "categories",
      localField: "categoryId",
      foreignField: "_id",
      as: "category",
    },
  };
  let joinStage2 = {
    $lookup: {
      from: "subcategories",
      localField: "subCategoryId",
      foreignField: "_id",
      as: "subCategory",
    },
  };
  let joinStage3 = {
    $lookup: {
      from: "brands",
      localField: "brandId",
      foreignField: "_id",
      as: "brand",
    },
  };
  let result = await listThreeJoinService(
    req,
    ProductModel,
    searchArray,
    joinStage1,
    joinStage2,
    joinStage3
  );
  return res.status(200).json(result);
};
exports.listProductForGlobal = async (req, res) => {
  let searchRgx = { $regex: req.params.searchKeyword, $options: "i" };
  let searchArray = [
    { name: searchRgx },
    { slug: searchRgx },
    { color: searchRgx },
    { "category.name": searchRgx },
    { "subCategory.name": searchRgx },
    { "brand.name": searchRgx },
  ];

  let joinStage1 = {
    $lookup: {
      from: "categories",
      localField: "categoryId",
      foreignField: "_id",
      as: "category",
    },
  };
  let joinStage2 = {
    $lookup: {
      from: "subcategories",
      localField: "subCategoryId",
      foreignField: "_id",
      as: "subCategory",
    },
  };
  let joinStage3 = {
    $lookup: {
      from: "brands",
      localField: "brandId",
      foreignField: "_id",
      as: "brand",
    },
  };
  let result = await listThreeJoinServiceForGlobal(
    req,
    ProductModel,
    searchArray,
    joinStage1,
    joinStage2,
    joinStage3
  );
  return res.status(200).json(result);
};
// Best Sales Products
exports.bestSalesProductForGlobal = async (req, res) => {
  let searchRgx = { $regex: req.params.searchKeyword, $options: "i" };
  let searchArray = [
    { name: searchRgx },
    { slug: searchRgx },
    { color: searchRgx },
    { "category.name": searchRgx },
    { "subCategory.name": searchRgx },
    { "brand.name": searchRgx },
  ];

  let joinStage1 = {
    $lookup: {
      from: "categories",
      localField: "categoryId",
      foreignField: "_id",
      as: "category",
    },
  };
  let joinStage2 = {
    $lookup: {
      from: "subcategories",
      localField: "subCategoryId",
      foreignField: "_id",
      as: "subCategory",
    },
  };
  let joinStage3 = {
    $lookup: {
      from: "brands",
      localField: "brandId",
      foreignField: "_id",
      as: "brand",
    },
  };
  let result = await listThreeJoinServiceBestSalesForGlobal(
    req,
    ProductModel,
    searchArray,
    joinStage1,
    joinStage2,
    joinStage3
  );
  return res.status(200).json(result);
};
exports.dropdownListProduct = async (req, res) => {
  let result = await dropdownListService(req, ProductModel);
  return res.status(200).json(result);
};
exports.getProductDetailsById = async (req, res) => {
  let result = await getServiceById(req, ProductModel);
  return res.status(200).json(result);
};
exports.updateProduct = async (req, res) => {
  if (
    (req.body.price !== "undefined" && req.body.discount == 0) ||
    req.body.discount == undefined
  ) {
    req.body.finalPrice = req.body.price;
    req.body.discount = 0;
    req.body.saveAmount = 0;
  } else if (
    req.body.price !== "undefined" &&
    req.body.discount !== "undefined"
  ) {
    req.body.finalPrice = (
      (req.body.price * (100 - req.body.discount)) /
      100
    ).toFixed();
    req.body.saveAmount = (
      req.body.price *
      (req.body.discount / 100)
    ).toFixed();
  }
  let result = await updateServiceWithImg(
    req,
    ProductModel,
    "products",
    300,
    300
  );
  return res.status(200).json(result);
};
exports.deleteProductImgAndPullImg = async (req, res) => {
  let result = await updateServiceWithDeleteImg(req, ProductModel);
  return res.status(200).json(result);
};
exports.deleteProduct = async (req, res) => {
  let id = req.params.id;
  let objectId = mongoose.Types.ObjectId;
  let queryObject = { "products.productId": objectId(id) };

  let isDelete = await checkAssociateService(queryObject, OrderProductModel);
  if (isDelete === true) {
    return res
      .status(200)
      .json({ status: "associate", data: "This product associate to orders" });
  } else {
    let result = await deleteServiceWithImg(req, ProductModel);
    return res.status(200).json(result);
  }
};
exports.ratingsProduct = async (req, res) => {
  let { star, comment } = req.body;
  let userId = req.headers.userId;

  let objectId = mongoose.Types.ObjectId;
  let productId = req.params.id;
  let queryObject = {};
  queryObject._id = objectId(productId);

  try {
    let product = await ProductModel.aggregate([
      { $match: queryObject },
      {
        $project: {
          _id: 0,
          hasRated: {
            $in: [objectId(userId), "$ratings.author"],
          },
        },
      },
    ]);
    let pushItem = { star: star, author: userId, comment: comment };
    let updateRating;
    if (product[0].hasRated) {
      updateRating = await ProductModel.findOneAndUpdate(
        {
          _id: productId,
          "ratings.author": userId,
        },
        {
          $set: {
            "ratings.$.star": star,
            "ratings.$.author": userId,
            "ratings.$.comment": comment,
          },
        }
      );
    } else {
      updateRating = await ProductModel.updateOne(
        {
          _id: productId,
        },
        {
          $push: {
            ratings: pushItem,
          },
        }
      );
    }

    let productAllRating = await ProductModel.aggregate([
      { $match: queryObject },
      {
        $project: {
          _id: 0,
          name: 0,
          slug: 0,
          description: 0,
          price: 0,
          quantity: 0,
          sold: 0,
          img: 0,
          color: 0,
          categoryId: 0,
          brandId: 0,
          createdAt: 0,
          updatedAt: 0,
        },
      },
    ]);
    let totalRating = productAllRating[0].ratings.length;
    let totalRatingSum = productAllRating[0].ratings.reduce(
      (prev, curr) => prev + curr.star,
      0
    );

    totalRating = Math.floor(totalRatingSum / totalRating);

    await ProductModel.findOneAndUpdate(
      { _id: productId },
      { totalRating: totalRating }
    );

    return res.status(200).json({ status: "success", data: updateRating });
  } catch (error) {
    return res.status(400).json({ status: "fail", data: error.toString() });
  }
};
