const express = require("express");
const { signup, login, logout } = require("../controllers/user.controller");
const { authentication } = require("../middlewares/auth.middleware");

const userRotute = express.Router();

userRotute.post("/register", signup);
userRotute.post("/login", login);
userRotute.get("/logout", authentication, logout);

module.exports = { userRotute };
