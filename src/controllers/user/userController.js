const userModel = require("../../models/users/userModel");
const otpModel = require("../../models/users/otpModel");
const userCreateService = require("../../services/user/userCreateService");
const userDetailByIdService = require("../../services/user/userDetailByIdService");
const userLoginService = require("../../services/user/userLoginService");
const adminLoginService = require("../../services/user/adminLoginService");
const userUpdateService = require("../../services/user/userUpdateService");
const allUserService = require("../../services/user/userAllService");
const verifyEmailService = require("../../services/user/resetPassword/verifyEmailService");
const verifyOtpService = require("../../services/user/resetPassword/verifyOtpService");
const userResetPasswordService = require("../../services/user/resetPassword/userResetPasswordService");
const updateService = require("../../services/common/updateService");
const allAdminService = require("../../services/user/adminAllService");
const userAddToCartService = require("../../services/user/userCart/userAddToCartServices");
const userRemoveToCartService = require("../../services/user/userCart/userRemoveToCartServices");

exports.registration = async (req, res) => {
  let data = await userCreateService(req, userModel);
  return res.status(200).json(data);
};

exports.login = async (req, res) => {
  let data = await userLoginService(req, res, userModel);
  return res.status(200).json(data);
};
exports.logOut = async (req, res) => {
  res.clearCookie("token");
  return res
    .status(200)
    .json({ status: "success", data: "Successfully logged out" });
};
exports.adminLogin = async (req, res) => {
  let data = await adminLoginService(req, res, userModel);
  return res.status(200).json(data);
};

exports.userDetailsById = async (req, res) => {
  let data = await userDetailByIdService(req, userModel);
  return res.status(200).json(data);
};

exports.userUpdate = async (req, res) => {
  let data = await userUpdateService(req, userModel);
  return res.status(200).json(data);
};
// all user
exports.allUser = async (req, res) => {
  let searchRegex = { $regex: req.params.searchKeyword, $options: "i" };
  let searchArray = [
    { firstName: searchRegex },
    { lastName: searchRegex },
    { email: searchRegex },
    { mobile: searchRegex },
  ];
  let data = await allUserService(req, userModel, searchArray);
  return res.status(200).json(data);
};
// all Admin
exports.allAdmin = async (req, res) => {
  let searchRegex = { $regex: req.params.searchKeyword, $options: "i" };
  let searchArray = [
    { firstName: searchRegex },
    { lastName: searchRegex },
    { email: searchRegex },
    { mobile: searchRegex },
  ];
  let data = await allAdminService(req, userModel, searchArray);
  return res.status(200).json(data);
};
// save user address
exports.saveUserAddress = async (req, res) => {
  let result = await updateService(req, userModel);
  return res.status(200).json(result);
};
// AddToCart
exports.addToCart = async (req, res) => {
  let result = await userAddToCartService(req, userModel);
  return res.status(200).json(result);
};

// ------------------------ Reset Password -------------------------------------//

// step 01
exports.verifyEmail = async (req, res) => {
  let data = await verifyEmailService(req, userModel, otpModel);
  return res.status(200).json(data);
};
// step 02
exports.verifyOtp = async (req, res) => {
  let data = await verifyOtpService(req, otpModel);
  return res.status(200).json(data);
};
// step 03
exports.resetPassword = async (req, res) => {
  let data = await userResetPasswordService(req, userModel, otpModel);
  return res.status(200).json(data);
};
