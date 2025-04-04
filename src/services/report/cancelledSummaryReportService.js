const CancelledSummaryReportService = async (Request, DataModel) => {
  let fromDate = new Date(Request.body.fromDate);
  let toDate = new Date(Request.body.toDate);

  fromDate.setHours(0, 0, 0, 0);
  toDate.setHours(23, 59, 59, 999);

  try {
    let data = await DataModel.aggregate([
      { $match: { orderStatus: "Cancelled" } },
      {
        $match: {
          createdAt: { $gte: new Date(fromDate), $lte: new Date(toDate) },
        },
      },
      {
        $facet: {
          total: [{ $group: { _id: 0, totalAmount: { $sum: "$grandTotal" } } }],
          rows: [
            {
              $lookup: {
                from: "products",
                localField: "allProducts.productId",
                foreignField: "_id",
                as: "productsDetails",
              },
            },
            {
              $lookup: {
                from: "categories",
                localField: "productsDetails.categoryId",
                foreignField: "_id",
                as: "categoryName",
              },
            },
            {
              $lookup: {
                from: "subcategories",
                localField: "productsDetails.subCategoryId",
                foreignField: "_id",
                as: "subCategoryName",
              },
            },
            {
              $lookup: {
                from: "brands",
                localField: "productsDetails.brandId",
                foreignField: "_id",
                as: "brandName",
              },
            },
            {
              $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "userDetails",
              },
            },
          ],
        },
      },
    ]);

    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.toString() };
  }
};

module.exports = CancelledSummaryReportService;
