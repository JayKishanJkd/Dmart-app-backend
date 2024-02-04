const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      req.status(401);
      throw new Error("Not authorized, please login");
    }
    //verify Token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    //get use id from token
    const user = await User.findById(verified.id).select("-password");

    if (!token) {
      res.status(401);
      throw new Error("Not authorized, please login");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, please login");
  }
});

//Admin only
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(401);
    throw new Error("Not  authorized as an admin");
  }
};
module.exports = {
  protect,
  adminOnly,
};
