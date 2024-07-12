const mongoose = require("mongoose");
const { deleteCloudinaryImg } = require("../../utils/cloudinary");

const deleteServiceWithImg = async (Request, DataModel) => {
  let id = Request.params.id;

  let objectId = mongoose.Types.ObjectId;
  let query = {};
  query._id = objectId(id);

  try {
    if (mongoose.Types.ObjectId.isValid(id)) {
      // delete img
      let imgDataOfDataModel = await DataModel.findOne({ _id: id });

      imgDataOfDataModel?.img?.map(async (item) => {
        await deleteCloudinaryImg(item.public_id);
      });

      // delete info
      var data = await DataModel.deleteMany(query);

      return { status: "success", data };
    } else {
      return { status: "fail", data: "Invalid Object Id" };
    }
  } catch (error) {
    return { status: "fail", data: error };
  }
};

module.exports = deleteServiceWithImg;
