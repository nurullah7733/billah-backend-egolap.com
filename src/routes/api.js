const router = require("express").Router();
const {
  createBrand,
  listBrand,
  updateBrand,
  dropdownListBrand,
  getBrandDetailsById,
  deleteBrandImgAndpullImg,
  deleteBrandWithImg,
} = require("../controllers/brands/brandController");
const {
  createCard,
  getCards,
  removeCardwhenOrder,
  deleteCard,
} = require("../controllers/card/cardController");
const {
  createCateogry,
  listCategory,
  dropdownListCategory,
  getCategoryDetailsById,
  updateCategory,
  deleteCategoryImgAndpullImg,
  deleteCategoryWithImg,
} = require("../controllers/categories/categoryController");
const {
  createCoupon,
  getCoupon,
  getCouponDetailsById,
  updateCoupon,
  deleteCoupon,
  validateCouponCode,
} = require("../controllers/coupon/couponController");
const {
  createOrder,
  getAllOrderForAdmin,
  getDetailsById,
  changeOrderStatus,
  getRunningOrderForUser,
  getDeliveredOrderForUser,
  getCancelledOrderForUser,
  getReturnedOrderForUser,
} = require("../controllers/order/orderController");
const {
  addProductsPrivacyPolicy,
  updateProductsPrivacyPolicy,
  listProductsPrivacyPolicy,
  deleteProductsPrivacyPolicy,
} = require("../controllers/privacyPolicy/productsPrivacyPolicyController");
const {
  createProduct,
  listProduct,
  dropdownListProduct,
  getProductDetailsById,
  updateProduct,
  deleteProduct,
  listProductForGlobal,
  ratingsProduct,
  deleteProductImgAndPullImg,
  bestSalesProductForGlobal,
  relatedProducts,
} = require("../controllers/products/productController");

const {
  createSubCategory,
  listSubCategories,
  dropdownListSubCategories,
  getSubCategoryDetailsById,
  updateSubCategory,
  deleteSubCategory,
} = require("../controllers/subCategory/subCategoryController");
const {
  salesSummary,
  cancelSummary,
  orderSummary,
  runningOrderSummary,
  salesSummaryReport,
  cancelSummaryReport,
  allOrderSummaryReport,
  runningOrderSummaryReport,
  refundSummary,
  returnSummary,
  returnedSummaryReport,
} = require("../controllers/summary/summaryController");
// --------summary-----------------

const {
  deleteImages,
  uploadImages,
} = require("../controllers/upload/uploadController");
// const {
//   uploadImages,
//   deleteImages,
// } = require("../controllers/upload/uploadController");
const {
  registration,
  login,
  userDetailsById,
  userUpdate,
  allUser,
  verifyEmail,
  verifyOtp,
  resetPassword,
  adminLogin,
  saveUserAddress,
  allAdmin,
  logOut,
  addToCart,
  contactUsForm,
} = require("../controllers/user/userController");

const {
  createWishList,
  createAndRemoveWishList,
  getWishList,
} = require("../controllers/wishList/wishListController");
const { uploadPhoto } = require("../middlewares/uploadImgMiddleware");
const verifyAdminMiddleware = require("../middlewares/verifyAdminMiddleware");
const verifyAuthMiddleware = require("../middlewares/verifyAuthMiddleware");
const deliveredOrderServices = require("../services/order/deliveredOrderServices");
const BkashMiddleware = require("../middlewares/bkashMiddleware");
const {
  createPayment,
  BkashCallBack,
  refundPayment,
} = require("../controllers/bkash/bkashController");
const {
  addFaq,
  listFaq,
  deleteFaqQuestionsOnly,
  deleteFaq,
} = require("../controllers/privacyPolicy/faqController");
const {
  addAboutUs,
  listAboutUs,
  deleteAboutUs,
} = require("../controllers/privacyPolicy/aboutUsController");
const {
  addTermOfUse,
  listTermOfUse,
  deleteTermOfUse,
} = require("../controllers/privacyPolicy/termOfUseController");

const {
  addPrivacyPolicy,
  listPrivacyPolicy,
  deletePrivacyPolicy,
} = require("../controllers/privacyPolicy/privacyPolicyController");
const {
  addContactUs,
  listContactUs,
  deleteContactUs,
} = require("../controllers/privacyPolicy/contactUsController");
const {
  addTeam,
  listTeam,
  deleteTeam,
} = require("../controllers/privacyPolicy/teamController");

const {
  createTeamOwner,
  listTeamOwner,
  getTeamOwnerById,
  updateTeamOwner,
  deleteTeamOwnerImgAndpullImg,
  deleteTeamOwnerWithImg,
} = require("../controllers/team/teamOwnersController");
const {
  getMainSliders,
  getMainSliderDetailsById,
  createMainSlider,
  updateMainSliderWithImg,
  deleteImgMainSlider,
  deleteMainSlider,
} = require("../controllers/mainSlider/mainSliderController");
const {
  listSocialLink,
  addSocialLink,
  updateSocialLinks,
  getSocialLinkById,
  deleteSocialLink,
} = require("../controllers/socialLinks/socialLinksController");
const {
  createBannerAboutUs,
  getAllBannersAboutUs,
  getBannerByIdAboutUs,
  updateBannerWithImgAboutUs,
  deleteImgBannerAboutUs,
  deleteBannerAboutUs,
} = require("../controllers/banners/bannerAboutUsController");
const {
  createBannerBestOfElectronics,
  getAllBannersBestOfElectronics,
  getBannerByIdBestOfElectronics,
  updateBannerWithImgBestOfElectronics,
  deleteImgBannerBestOfElectronics,
  deleteBannerBestOfElectronics,
} = require("../controllers/banners/bannerBestOfElectronicsController");
const {
  createBannerBestSales,
  getAllBannersBestSales,
  getBannerByIdBestSales,
  updateBannerWithImgBestSales,
  deleteImgBannerBestSales,
  deleteBannerBestSales,
} = require("../controllers/banners/bannerBestSalesController");
const {
  getBannerByIdKachaBazar,
  createBannerKachaBazar,
  getAllBannersKachaBazar,
  updateBannerWithImgKachaBazar,
  deleteImgBannerKachaBazar,
  deleteBannerKachaBazar,
} = require("../controllers/banners/bannerKachaBazarController");
const {
  createBannerContactUs,
  getAllBannersContactUs,
  getBannerByIdContactUs,
  updateBannerWithImgContactUs,
  deleteImgBannerContactUs,
  deleteBannerContactUs,
} = require("../controllers/banners/bannerContactUsController");
const {
  deleteBannerPrivacyPolicy,
  deleteImgBannerPrivacyPolicy,
  updateBannerWithImgPrivacyPolicy,
  getBannerByIdPrivacyPolicy,
  getAllBannersPrivacyPolicy,
  createBannerPrivacyPolicy,
} = require("../controllers/banners/bannerPrivacyPolicyController");
const {
  createBannerTermOfConditions,
  getAllBannersTermOfConditions,
  getBannerByIdTermOfConditions,
  updateBannerWithImgTermOfConditions,
  deleteImgBannerTermOfConditions,
  deleteBannerTermOfConditions,
} = require("../controllers/banners/bannerTermOfConditionsController");
const {
  createBannerFaq,
  getAllBannersFaq,
  getBannerByIdFaq,
  updateBannerWithImgFaq,
  deleteImgBannerFaq,
  deleteBannerFaq,
} = require("../controllers/banners/bannerFaqController");
const {
  createBannerTeam,
  getAllBannersTeam,
  getBannerByIdTeam,
  updateBannerWithImgTeam,
  deleteImgBannerTeam,
  deleteBannerTeam,
} = require("../controllers/banners/bannerTeamController");
const {
  createShippingCost,
  listShippingCost,
  updateShippingCost,
  getShippingCostDetailsById,
  deleteShippingCost,
} = require("../controllers/shippingCost/shippingCostController");
const {
  getAllDivisionsController,
  getDistrictsController,
  getUpazilasController,
} = require("../controllers/bdApi/divisionsController");
const {
  createDealerBrandLogo,
  getAllDealerBrandLogo,
  getBannerByIdDealerBrandLogo,
  updateBannerWithImgDealerBrandLogo,
  deleteImgDealerBrandLogo,
  deleteDealerBrandLogo,
} = require("../controllers/banners/dealerBrandLogoController");

// registration
router.post("/registration", registration);
// login
router.post("/login", login);
router.get("/logout", verifyAuthMiddleware, logOut);
router.post("/admin-login", adminLogin);
// user details for user
router.get("/user-detail-by-user", verifyAuthMiddleware, userDetailsById);
// user details for Admin
router.get(
  "/user-detail-by-admin/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  userDetailsById
);
// user Udpate for User
router.post(
  "/user-udpate-by-user/:id",
  verifyAuthMiddleware,
  uploadPhoto.array("images", 10),
  userUpdate
);
// user Udpate for Admin
router.post(
  "/user-udpate-by-admin/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  userUpdate
);

// all user for admin
router.get(
  "/all-user/:pageNo/:perPage/:searchKeyword",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  allUser
);
// all admin for admin
router.get(
  "/all-admin/:pageNo/:perPage/:searchKeyword",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  allAdmin
);

// save address
router.post("/save-address/:id", verifyAuthMiddleware, saveUserAddress);
// Add to cart
router.post("/add-to-cart/:id", verifyAuthMiddleware, addToCart);

//------------------------------ contact form----------------------------------------------------------------
router.post("/contact-us-form", contactUsForm);
//------------------------------ Reset password----------------------------------------------------------------------------
// step 01
router.get("/verify-email/:email", verifyEmail);
// step 02
router.get("/verify-otp/:email/:otp", verifyOtp);
// step 03
router.post("/reset-password", resetPassword);

//------------------------------ Category ----------------------------------------------------------------------------
// Create Category
router.post(
  "/create-category",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  uploadPhoto.array("images", 10),
  createCateogry
);
// list Category
router.get(
  "/list-category/:pageNo/:perPage/:searchKeyword",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  listCategory
);
// dropdown list Category for admin
router.get(
  "/dropdown-category-admin",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  dropdownListCategory
);
// dropdown list Category global
router.get(
  "/dropdown-category/:pageNo/:perPage/:searchKeyword",
  dropdownListCategory
);
// get category details by id
router.get(
  "/category-details/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  getCategoryDetailsById
);
// update category
router.post(
  "/update-category/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  uploadPhoto.array("images", 10),
  updateCategory
);
// delete category img
router.post(
  "/delete-category-img/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteCategoryImgAndpullImg
);
// delete category
router.get(
  "/delete-category/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteCategoryWithImg
);

//------------------------------ Sub-Categories ----------------------------------------------------------------------------
// create subcategory
router.post(
  "/create-subcategory",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  createSubCategory
);

// list subcategory
router.get(
  "/list-subcategory/:pageNo/:perPage/:searchKeyword",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  listSubCategories
);
// dropdown list subcategory by admin
router.get(
  "/dropdown-subcategory-admin",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  dropdownListSubCategories
);
// dropdown list subcategory Global
router.get("/dropdown-subcategory", dropdownListSubCategories);
// get subcategory details by id
router.get(
  "/subcategory-details/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  getSubCategoryDetailsById
);
// update subcategory
router.post(
  "/update-subcategory/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  updateSubCategory
);
// delete subcategory
router.get(
  "/delete-subcategory/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteSubCategory
);

//------------------------------ Brands ----------------------------------------------------------------------------
// create brand
router.post(
  "/create-brand",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  uploadPhoto.array("images", 10),
  createBrand
);

// list Brand
router.get("/list-brand/:pageNo/:perPage/:searchKeyword", listBrand);
// dropdown list brand
router.get(
  "/dropdown-brand-admin",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  dropdownListBrand
);
// dropdown list brand for Global
router.get("/dropdown-brand", dropdownListBrand);
// get brand details by id
router.get(
  "/brand-details/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  getBrandDetailsById
);
// update brand
router.post(
  "/update-brand/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  uploadPhoto.array("images", 10),
  updateBrand
);
// delete brand img
router.post(
  "/delete-brand-img/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteBrandImgAndpullImg
);

// delete brand
router.get(
  "/delete-brand/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteBrandWithImg
);

//------------------------------ product ----------------------------------------------------------------------------
// create product
router.post(
  "/create-product",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  uploadPhoto.array("images", 10),
  createProduct
);

// list product
router.get(
  "/list-product/:pageNo/:perPage/:searchKeyword",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  listProduct
);
// list product for Global
router.get("/list-product-global", listProductForGlobal);
// Best Sales product for Global
router.get(
  "/best-sales/:pageNo/:perPage/:searchKeyword",
  bestSalesProductForGlobal
);
// dropdown list product
router.get(
  "/dropdown-product",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  dropdownListProduct
);
// get product details by id for admin
router.get(
  "/product-details-admin/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  getProductDetailsById
);
// get product details by id
router.get("/product-details/:id", getProductDetailsById);

router.get("/related-products/:subCategory", relatedProducts);

// update product
router.post(
  "/update-product/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  uploadPhoto.array("images", 10),
  updateProduct
);
// delete product
router.get(
  "/delete-product/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteProduct
);
// delete product Img
router.post(
  "/delete-product-img/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteProductImgAndPullImg
);
// ratings product
router.post("/ratings-product/:id", verifyAuthMiddleware, ratingsProduct);

// -------------------------- Wish List -------------------------------------------------
router.post("/wishlist", verifyAuthMiddleware, createAndRemoveWishList);
router.get(
  "/getWishList/:pageNo/:perPage/:searchKeyword",
  verifyAuthMiddleware,
  getWishList
);

// -------------------------- Coupon code -------------------------------------------------
router.post(
  "/coupon",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  createCoupon
);
router.get(
  "/all-coupon/:pageNo/:perPage/:searchKeyword",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  getCoupon
);
router.get(
  "/coupon-details/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  getCouponDetailsById
);
router.post(
  "/update-coupon",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  updateCoupon
);
router.get(
  "/delete-coupon/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteCoupon
);
router.post("/validate-coupon-code", verifyAuthMiddleware, validateCouponCode);

// ------------------------- Upload Img ------------------------------------------------
router.post("/upload-img", uploadPhoto.array("images", 10), uploadImages);
router.get("/delete-img/:id", deleteImages);

// ------------------------- Card -------------------------------------------------------------
router.post("/create-card", verifyAuthMiddleware, createCard);
router.get(
  "/get-cards/:pageNo/:perPage/:searchKeyword",
  verifyAuthMiddleware,
  getCards
);
router.post(
  "/remove-card-when-order",
  verifyAuthMiddleware,
  removeCardwhenOrder
);
router.get("/delete-card/:id", verifyAuthMiddleware, deleteCard);

// ------------------------- Order -------------------------------------------------------------
router.post("/create-order", verifyAuthMiddleware, createOrder);
// get all order for admin only
router.get(
  "/get-all-order-for-admin/:pageNo/:perPage/:searchKeyword",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  getAllOrderForAdmin
);
// get running order for user only
router.get(
  "/get-running-order/:pageNo/:perPage/:searchKeyword",
  verifyAuthMiddleware,
  getRunningOrderForUser
);
// get Delivered order for user only
router.get(
  "/get-delivered-order/:pageNo/:perPage/:searchKeyword",
  verifyAuthMiddleware,
  getDeliveredOrderForUser
);
// get Cancelled order for user only
router.get(
  "/get-cancelled-order/:pageNo/:perPage/:searchKeyword",
  verifyAuthMiddleware,
  getCancelledOrderForUser
);
// get Returned order for user only
router.get(
  "/get-returned-order/:pageNo/:perPage/:searchKeyword",
  verifyAuthMiddleware,
  getReturnedOrderForUser
);

// get order details for admin only
router.get(
  "/get-order-details-for-admin/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  getDetailsById
);

// get order details for user only
router.get("/get-order-details/:id", verifyAuthMiddleware, getDetailsById);
// change orderStatus for Admin
router.post(
  "/change-order-status-for-admin/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  changeOrderStatus
);
// change orderStatus for User
router.post(
  "/change-order-status/:id",
  verifyAuthMiddleware,
  changeOrderStatus
);

// ----------------------------------------------- Payment ------------------------------------
// sslcommerz
// router.post("/payment", initPayment);
// router.post("/payment-success", successPaymnet);
// router.post("/payment-cancel", cancelPaymnet);
// router.post("/payment-fail", failPaymnet);
// router.post("/payment-ipn", ipnPaymnet);

// bkash
router.post("/bkash-payment", BkashMiddleware, createPayment);
router.get("/bkash-callback", BkashCallBack);
router.post("/refund/:trxID", BkashMiddleware, refundPayment);

// ---------------------Summary--------------------------------
// Order Summary
router.get(
  "/order-summary",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  orderSummary
);
router.get(
  "/refund-summary",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  refundSummary
);
// All Order Summary Report
router.post(
  "/order-summary-report",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  allOrderSummaryReport
);

// Running Order Summary
router.get(
  "/running-order-summary",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  runningOrderSummary
);
// Running Order Summary Report
router.post(
  "/running-order-summary-report",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  runningOrderSummaryReport
);

// Sales summary
router.get(
  "/sales-summary",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  salesSummary
);
// Sales summary Report
router.post(
  "/sales-summary-report",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  salesSummaryReport
);
// cancel Summary
router.get(
  "/cancel-summary",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  cancelSummary
);
router.post(
  "/cancel-summary-report",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  cancelSummaryReport
);

// return Summary
router.get(
  "/return-summary",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  returnSummary
);
// return Summary Report
router.post(
  "/return-summary-report",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  returnedSummaryReport
);

// --------------------------------------- Privacy Policy --------------------------------------

// add products privacy policy
router.get("/list-products-privacy-policy", listProductsPrivacyPolicy);

router.post(
  "/add-products-privacy-policy",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  addProductsPrivacyPolicy
);

router.get(
  "/delete-products-privacy-policy/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteProductsPrivacyPolicy
);

// add faq questions
router.post("/add-faq", verifyAuthMiddleware, verifyAdminMiddleware, addFaq);

router.get("/list-faq", listFaq);

router.get(
  "/delete-faq-question/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteFaq
);

// about us privacy policy
router.post(
  "/add-about-us",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  addAboutUs
);

router.get("/list-about-us", listAboutUs);

router.get(
  "/delete-about-us/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteAboutUs
);
// Terms of use privacy policy
router.post(
  "/add-term-of-use",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  addTermOfUse
);

router.get("/list-term-of-use", listTermOfUse);

router.get(
  "/delete-term-of-use/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteTermOfUse
);
// Privacy policy
router.post(
  "/add-privacy-policy",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  addPrivacyPolicy
);

router.get("/list-privacy-policy", listPrivacyPolicy);

router.get(
  "/delete-privacy-policy/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deletePrivacyPolicy
);
// Contact us
router.post(
  "/add-contact-us",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  addContactUs
);

router.get("/list-contact-us", listContactUs);

router.get(
  "/delete-contact-us/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteContactUs
);
// Team
router.post("/add-team", verifyAuthMiddleware, verifyAdminMiddleware, addTeam);

router.get("/list-team", listTeam);

router.get(
  "/delete-team/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteTeam
);

// ------------------------------ Team ------------------------------

router.post(
  "/create-team-owner",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  uploadPhoto.array("images", 10),
  createTeamOwner
);
router.post(
  "/update-team-owner/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  uploadPhoto.array("images", 10),
  updateTeamOwner
);
router.get("/list-team-owners/:pageNo/:perPage/:searchKeyword", listTeamOwner);
router.get("/get-team-owners-by-id/:id", getTeamOwnerById);
router.get("/delete-team-owner/:id", deleteTeamOwnerWithImg);
router.post("/delete-team-owner-img/:id", deleteTeamOwnerImgAndpullImg);

// -------- Main Slider -------------------------------------------
router.get(
  "/get-all-main-slider/:pageNo/:perPage/:searchKeyword",
  getMainSliders
);
router.get("/get-main-slider-details/:id", getMainSliderDetailsById);
router.post(
  "/add-main-slider",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  uploadPhoto.array("images", 10),
  createMainSlider
);
router.post(
  "/update-main-slider/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  uploadPhoto.array("images", 10),
  updateMainSliderWithImg
);
router.post(
  "/delete-img-main-slider/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteImgMainSlider
);
router.post(
  "/delete-main-slider/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteMainSlider
);

// -------- Banner Best of Electronics -------------------------------------------
router.post(
  "/add-banner-best-of-electronics",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  uploadPhoto.array("images", 10),
  createBannerBestOfElectronics
);

router.get(
  "/get-all-banner-best-of-electronics/:pageNo/:perPage/:searchKeyword",
  getAllBannersBestOfElectronics
);

router.get(
  "/get-banner-best-of-electronics-details/:id",
  getBannerByIdBestOfElectronics
);

router.post(
  "/update-banner-best-of-electronics/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  uploadPhoto.array("images", 10),
  updateBannerWithImgBestOfElectronics
);
router.post(
  "/delete-img-banner-best-of-electronics/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteImgBannerBestOfElectronics
);
router.post(
  "/delete-banner-best-of-electronics/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteBannerBestOfElectronics
);

// -------- Banner Best Sales -------------------------------------------
router.post(
  "/add-banner-best-sales",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  uploadPhoto.array("images", 10),
  createBannerBestSales
);

router.get(
  "/get-all-banner-best-sales/:pageNo/:perPage/:searchKeyword",
  getAllBannersBestSales
);

router.get("/get-banner-best-sales-details/:id", getBannerByIdBestSales);

router.post(
  "/update-banner-best-sales/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  uploadPhoto.array("images", 10),
  updateBannerWithImgBestSales
);
router.post(
  "/delete-img-banner-best-sales/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteImgBannerBestSales
);
router.post(
  "/delete-banner-best-sales/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteBannerBestSales
);

// -------- Banner Kacha Bazar -------------------------------------------
router.post(
  "/add-banner-kacha-bazar",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  uploadPhoto.array("images", 10),
  createBannerKachaBazar
);

router.get(
  "/get-all-banner-kacha-bazar/:pageNo/:perPage/:searchKeyword",
  getAllBannersKachaBazar
);

router.get("/get-banner-kacha-bazar-details/:id", getBannerByIdKachaBazar);

router.post(
  "/update-banner-kacha-bazar/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  uploadPhoto.array("images", 10),
  updateBannerWithImgKachaBazar
);
router.post(
  "/delete-img-banner-kacha-bazar/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteImgBannerKachaBazar
);
router.post(
  "/delete-banner-kacha-bazar/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteBannerKachaBazar
);

// -------- Banner About Us -------------------------------------------
router.post(
  "/add-banner-about-us",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  uploadPhoto.array("images", 10),
  createBannerAboutUs
);

router.get(
  "/get-all-banner-about-us/:pageNo/:perPage/:searchKeyword",
  getAllBannersAboutUs
);

router.get("/get-banner-about-us-details/:id", getBannerByIdAboutUs);

router.post(
  "/update-banner-about-us/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  uploadPhoto.array("images", 10),
  updateBannerWithImgAboutUs
);
router.post(
  "/delete-img-banner-about-us/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteImgBannerAboutUs
);
router.post(
  "/delete-banner-about-us/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteBannerAboutUs
);

// -------- Banner Contact Us -------------------------------------------
router.post(
  "/add-banner-contact-us",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  uploadPhoto.array("images", 10),
  createBannerContactUs
);

router.get(
  "/get-all-banner-contact-us/:pageNo/:perPage/:searchKeyword",
  getAllBannersContactUs
);

router.get("/get-banner-contact-us-details/:id", getBannerByIdContactUs);

router.post(
  "/update-banner-contact-us/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  uploadPhoto.array("images", 10),
  updateBannerWithImgContactUs
);
router.post(
  "/delete-img-banner-contact-us/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteImgBannerContactUs
);
router.post(
  "/delete-banner-contact-us/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteBannerContactUs
);

// -------- Banner Faq -------------------------------------------
router.post(
  "/add-banner-faq",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  uploadPhoto.array("images", 10),
  createBannerFaq
);

router.get(
  "/get-all-banner-faq/:pageNo/:perPage/:searchKeyword",
  getAllBannersFaq
);

router.get("/get-banner-faq-details/:id", getBannerByIdFaq);

router.post(
  "/update-banner-faq/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  uploadPhoto.array("images", 10),
  updateBannerWithImgFaq
);
router.post(
  "/delete-img-banner-faq/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteImgBannerFaq
);
router.post(
  "/delete-banner-faq/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteBannerFaq
);

// -------- Banner Privacy Policy -------------------------------------------
router.post(
  "/add-banner-privacy-policy",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  uploadPhoto.array("images", 10),
  createBannerPrivacyPolicy
);

router.get(
  "/get-all-banner-privacy-policy/:pageNo/:perPage/:searchKeyword",
  getAllBannersPrivacyPolicy
);

router.get(
  "/get-banner-privacy-policy-details/:id",
  getBannerByIdPrivacyPolicy
);

router.post(
  "/update-banner-privacy-policy/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  uploadPhoto.array("images", 10),
  updateBannerWithImgPrivacyPolicy
);
router.post(
  "/delete-img-banner-privacy-policy/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteImgBannerPrivacyPolicy
);
router.post(
  "/delete-banner-privacy-policy/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteBannerPrivacyPolicy
);
// -------- Banner Term of Conditions -------------------------------------------
router.post(
  "/add-banner-term-of-conditions",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  uploadPhoto.array("images", 10),
  createBannerTermOfConditions
);

router.get(
  "/get-all-banner-term-of-conditions/:pageNo/:perPage/:searchKeyword",
  getAllBannersTermOfConditions
);

router.get(
  "/get-banner-term-of-conditions-details/:id",
  getBannerByIdTermOfConditions
);

router.post(
  "/update-banner-term-of-conditions/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  uploadPhoto.array("images", 10),
  updateBannerWithImgTermOfConditions
);
router.post(
  "/delete-img-banner-term-of-conditions/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteImgBannerTermOfConditions
);
router.post(
  "/delete-banner-term-of-conditions/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteBannerTermOfConditions
);
// -------- Banner Team -------------------------------------------
router.post(
  "/add-banner-team",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  uploadPhoto.array("images", 10),
  createBannerTeam
);

router.get(
  "/get-all-banner-team/:pageNo/:perPage/:searchKeyword",
  getAllBannersTeam
);

router.get("/get-banner-team-details/:id", getBannerByIdTeam);

router.post(
  "/update-banner-team/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  uploadPhoto.array("images", 10),
  updateBannerWithImgTeam
);
router.post(
  "/delete-img-banner-team/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteImgBannerTeam
);
router.post(
  "/delete-banner-team/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteBannerTeam
);

// -------- Dealer Brand Logo -------------------------------------------
router.post(
  "/add-dealer-brand-logo",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  uploadPhoto.array("images", 10),
  createDealerBrandLogo
);

router.get(
  "/get-all-dealer-brand-logo/:pageNo/:perPage/:searchKeyword",
  getAllDealerBrandLogo
);

router.get("/get-dealer-brand-logo-details/:id", getBannerByIdDealerBrandLogo);

router.post(
  "/update-dealer-brand-logo/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  uploadPhoto.array("images", 10),
  updateBannerWithImgDealerBrandLogo
);
router.post(
  "/delete-img-dealer-brand-logo/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteImgDealerBrandLogo
);
router.post(
  "/delete-dealer-brand-logo/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteDealerBrandLogo
);

// --------------------------- Shipping cost ------------------------------

router.post(
  "/add-shipping-cost",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  createShippingCost
);
router.get(
  "/list-shipping-cost/:pageNo/:perPage/:searchKeyword",
  listShippingCost
);

router.get("/get-shipping-cost-by-id/:id", getShippingCostDetailsById);

router.post(
  "/update-shipping-cost/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  updateShippingCost
);

router.get(
  "/delete-shipping-cost/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteShippingCost
);

// --------------------------- Social Links  ------------------------------
router.get("/get-social-link", listSocialLink);
router.post(
  "/add-social-link",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  addSocialLink
);
router.post(
  "/update-social-link/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  updateSocialLinks
);
router.get("/get-social-link-by-id/:id", getSocialLinkById);
router.get(
  "/delete-social-link/:id",
  verifyAuthMiddleware,
  verifyAdminMiddleware,
  deleteSocialLink
);

// bd api Divisions
router.get("/get-divisions", getAllDivisionsController);
router.get("/get-districts/:id", getDistrictsController);
router.get("/get-Upazilas/:id", getUpazilasController);

module.exports = router;
