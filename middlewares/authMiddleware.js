const { verifyToken } = require("../services/jwtServices");
const authUser = (req, res, next) => {
  const jwt = req.header("Authorization");
  if (jwt) {
    const decode = verifyToken(jwt);
    if (decode) {
      req.payload = decode;
      next();
    } else {
      res.status(401).send("Unautherized");
    }
  } else {
    res.status(401).send("Unautherized");
  }
};

module.exports = authUser;
