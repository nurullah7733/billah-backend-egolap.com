const { default: mongoose } = require("mongoose");

const getDetailsByIdThreeJoinService = async (
  Request,
  DataModel,
  joinStage1,
  joinStage2,
  joinStage3,
  joinStage4
) => {
  let id = Request.params.id;
  let objectId = mongoose.Types.ObjectId;
  let query = {};
  query._id = objectId(id);

  try {
    let data;

    data = await DataModel.aggregate([
      { $match: query },
      joinStage1,
      joinStage2,
      joinStage3,
      joinStage4,
    ]);

    return { status: "success", data };
  } catch (error) {
    return { status: "fail", data: error.toString() };
  }
};

module.exports = getDetailsByIdThreeJoinService;
