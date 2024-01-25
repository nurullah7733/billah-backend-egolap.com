const bcrypt = require("bcrypt");
const generateFakeProfilePic = require("../../utils/fakeProfilePic/fakeProfilePic");
const createUserService = async (Request, DataModel) => {
  let reqBody = Request.body;
  let password = Request.body.password;
  Request.body.photo = generateFakeProfilePic();
  try {
    const salt = await bcrypt.genSaltSync(10);
    password = await bcrypt.hash(password, salt);
    reqBody.password = password;
    let data = await DataModel.create(reqBody);
    return { status: "success", data };
  } catch (error) {
    return { status: "fail", data: error };
  }
};

module.exports = createUserService;
