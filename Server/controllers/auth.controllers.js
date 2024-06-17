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
      process.env.SECRET,
      {expiresIn: '40m'}
    );

    res.status(200).json({
      status: "ok",
      message: "Log in successful",
      token
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
      securityQuestion: req.body.securityQuestion,
      securityAnswer: req.body.securityAnswer
    });

    console.log("New user created", newUser);
    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error", message: "User already exists. Please login. In case you forgot your password, please reset it" });
    console.log(err);
  }
};

const forgotPassword = async (req, res) => {
  const user = await UserSchema.findOne(
    {
      email: req.body.email,
      dob: req.body.dob,
      securityQuestion: req.body.securityQuestion,
      securityAnswer: req.body.securityAnswer
    }
  );

  if (!user) {
    return res.json({
      status: "error",
      error: "Invalid User",
    });
  }

  const securePassword = await bcrypt.hash(req.body.password, 10);
  user.password = securePassword;
  await user.save();

  res.json({ status: "ok", message:"Password reset successful" });
}

const changePassword = async(req, res) => {
  const user = await UserSchema.findOne(
    {
      email: req.body.email,
      dob: req.body.dob,
    }
  );

  if(!user) {
    return res.json({
      status: 'error',
      error: "User does not exist"
    })
  }
  
  const isPasswordValid = await bcrypt.compare(
    req.body.oldPassword,
    user.password
  );

  if(!isPasswordValid){
    return res.json({
      status: 'error',
      error: 'Wrong password entered'
    })
  } else {
    const securePassword = await bcrypt.hash(req.body.password, 10);
    user.password = securePassword;
    await user.save();
    res.json({ status: "ok", message:"Password reset Successful"})
  }
}

module.exports = {
  loginHandler,
  registerHandler,
  forgotPassword,
  changePassword
};
