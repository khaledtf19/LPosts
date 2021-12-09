const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verify = require("./verifyToken");

const { registerValidation, loginValidation } = require("../validation/authV");

router.post("/register", async (req, res) => {
  // Validate
  const { error } = registerValidation(req.body);
  if (error) return res.status(401).json({ Error: error.details[0].message });

  //Checking if the user is already in the database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist)
    return res.status(401).json({ Error: "Email already exists" });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  console.log("hello register");

  const savedUser = await user.save();
  res.json({ user: user._id });
});

router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(401).json({ Error: error.details[0].message });

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(401).json({ Error: "Email is not found" });

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(401).json({ Error: "Invalid password" });

  const token = jwt.sign(
    { _id: user._id, email: user.email, name: user.name },
    process.env.TOKEN_SECRET
  );
  res.header("auth-token", token).json(token);
});

router.get("/me", verify, async (req, res) => {
  let userId = req.user._id;

  const user = await User.findById(userId);
  if (!user) return res.json(null);

  res.json({ name: user.name, email: user.email, _id: user._id });
});
module.exports = router;
