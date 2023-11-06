const ProductsPrivacyPolicyModel = require("../../models/privacyPolicy/productsPrivacyPolicyModel");
const createService = require("../../services/common/createService");
const deleteService = require("../../services/common/deleteService");

exports.addProductsPrivacyPolicy = async (req, res) => {
  let result = await createService(req, ProductsPrivacyPolicyModel);
  return res.status(200).json(result);
};

// exports.updateProductsPrivacyPolicy = async (req, res) => {
//   let result = await updateService(req, ProductsPrivacyPolicyModel);
//   return res.status(200).json(result);
// };
exports.listProductsPrivacyPolicy = async (req, res) => {
  let result = await ProductsPrivacyPolicyModel.aggregate([
    { $sort: { createdAt: -1 } },
  ]);
  return res.status(200).json({ status: "success", data: result });
};

exports.deleteProductsPrivacyPolicy = async (req, res) => {
  let result = await deleteService(req, ProductsPrivacyPolicyModel);
  return res.status(200).json(result);
};
