const jwt = require("jsonwebtoken");

const createToken = async (email, id) => {
  let payload = {
    exp: Math.floor(Date.now() / 1000 + 30 * 24 * 60 * 60), // 30 days in seconds
    data: email + " " + id,
  };

  return await jwt.sign(payload, process.env.JWT_SECRET_KEY);
};

module.exports = createToken;
