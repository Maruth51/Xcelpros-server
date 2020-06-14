const jwt = require("jsonwebtoken");

const createToken = payload => {
  return jwt.sign(payload, process.env.JWT_KEY || "13EIr*51", { expiresIn: "5h" });
};

const verifyToken = token => {
  try {
    const data = jwt.verify(token, process.env.JWT_KEY || "13EIr*51");
    console.log(data);
    return data;
  } catch (e) {
    console.error(e);
    return false;
  }
};
module.exports = { createToken, verifyToken };
