const express = require("express");
const User = require("../models/User"); //User is a database connected variable
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const fetchuser = require("../middleware/fetchuser");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "Roshanisgood$boy";
// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login require
router.post(
  "/createuser",
  [
    body("name", "Enter a Valid Name.").isLength({ min: 3 }),
    body("email", "Enter a valid Email.").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    // res.send(req.body)

    //check whether the user with this email exits already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({success, errors: "Email Already Exists." });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      // .then(user => res.json(user))
      // .catch(err => {console.log(err)
      // res.json({error: "please enter unique value for email"})});

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success=true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//ROUTE 2: Authenticate a user using post: "api/auth/login" NO login require
router.post(
  "/login",
  [
    body("email", "Enter a valid Email.").isEmail(),
    body("password", " pswrd Cannot be empty.").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ success, error: "Incorrect credential" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res.status(400).json({ success, error: "Incorrect credential" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);

      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
