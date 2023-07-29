const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("./middleware/fetchuser");

const JWT_SECRET = "thisIsAJWTSecret";

router.post(
  "/createuser",
  [
    body("email", "Enter a valid email").isEmail(),
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("password", "Password length must be atleast 5 charaters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({success: false, errors: errors.array() });
      }
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({success: false, msg: "User with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      securePass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        password: securePass,
        email: req.body.email,
      }).then((user) => {
        const data = {
          user: {
            id: user.id,
          },
        };
        const authToken = jwt.sign(data, JWT_SECRET);
        console.log(authToken);

        res.json({ success: true, authToken: authToken });
      });
    } catch (error) {
      res.status(500).send("Internal Server Error");
      console.log({success: false, msg: error.message});
    }
  }
);

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success: false, errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({success: false, msg: "Try again with correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({success: false, msg: "Try again with correct credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({success: true, authToken: authToken });
    } catch (err) {
      res.status(500).send("Internal Server Error");
      console.log(err.message);
    }
  }
);

router.post(
  "/getuser",
  fetchuser,
  async (req, res) => {
    try {
      const userID = req.user.id;
      const user = await User.findById(userID).select("-password");
      res.send(user);
    } catch (err) {
      res.status(500).send("Internal Server Error");
      console.log(err.message);
    }
  }
);

module.exports = router;
