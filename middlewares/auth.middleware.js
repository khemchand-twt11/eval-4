const jwt = require("jsonwebtoken");
require("dotenv").config();
const authentication = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    let decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    req.userid = decoded.userid;
    req.token = token;
    next();
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { authentication };
