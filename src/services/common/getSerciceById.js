const { default: mongoose } = require("mongoose");

const getServiceById = async (Request, DataModel) => {
  let id = Request.params.id;

  try {
    if (mongoose.Types.ObjectId.isValid(id)) {
      let objectId = mongoose.Types.ObjectId;
      let query = {};
      query._id = objectId(id);
      let data = await DataModel.aggregate([{ $match: query }]);
      return { status: "success", data };
    } else {
      return { status: "fail", data: "Invalid Object Id" };
    }
  } catch (error) {
    return { status: "success", data: error.toString() };
  }
};

module.exports = getServiceById;
