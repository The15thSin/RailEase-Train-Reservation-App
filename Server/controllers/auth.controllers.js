const UserSchema = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const loginHandler = async (req, res) => {
  const user = await UserSchema.findOne({
    email: req.body.email,
    // password: req.body.password
  });

  if (!user) {
    return res.json({
      status: "error",
      error: "Invalid User",
    });
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (isPasswordValid) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      "secretKey12345"
    );

    res.json({
      status: "ok",
      message: "Log in successful",
      token,
    });
  } else {
    res.json({
      message: "User not found",
    });
  }
};

const registerHandler = async (req, res) => {
  console.log(req.body);
  try {
    const securePassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await UserSchema.create({
      name: req.body.name,
      email: req.body.email,
      password: securePassword,
      sex: req.body.sex,
      dob: req.body.dob,
      phone: req.body.phone,
      pincode: req.body.pincode,
    });

    console.log("New user created", newUser);
    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error", error: { err } });
  }
};

module.exports = {
  loginHandler,
  registerHandler,
};
