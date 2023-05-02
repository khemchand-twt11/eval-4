const bcrypt = require("bcrypt");
const { userModel } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { client } = require("../helper/redis.helper");
require("dotenv").config();
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await userModel.findOne({ email });

    if (userExists) {
      res.status(400).send("user already exists, please login");
    } else {
      const hashedPassword = await bcrypt.hash(password, 8);
      const newUser = new userModel({ name, email, password: hashedPassword });
      await newUser.save();
      res.status(201).send("Registration Successfull!");
    }
  } catch (error) {
    console.log(error.message);
  }
};

//LOGIN
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExists = await userModel.findOne({ email });

    if (userExists) {
      const result = await bcrypt.compare(password, userExists.password);
      const token = jwt.sign(
        { userid: userExists._id },
        process.env.TOKEN_SECRET_KEY
      );
      if (result) {
        res.status(200).send({ msg: "login successfull", token: token });
      } else {
        res.status(400).send({ msg: "wrong password" });
      }
    } else {
      res.status(400).send({ msg: "user doesn't exists, please signup" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const logout = async (req, res) => {
  const token = req.token;

  await client.set(token, token);
  res.status(200).send("logout successfully!");
};
module.exports = { signup, login, logout };
