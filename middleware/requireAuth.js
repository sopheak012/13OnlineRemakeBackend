const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const requireAuth = async (req, res, next) => {
  //verify authenication

  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }
  const token = authorization.split(" ")[1];
  console.log(token);

  try {
    const { _id } = jwt.verify(token, process.env.SECRET_KEY);
    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ error: "Reqest is not authorized" });
  }
};

module.exports = requireAuth;
