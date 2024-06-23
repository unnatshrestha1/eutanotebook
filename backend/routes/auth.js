const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");
const user = require("../models/User");


const JWT_SECRET = "Unnatisagoodb$oy";

//ROUTE 1: create a User using: POST "/api/auth/createuser". Doesn't require Auth. No login required.
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success= false;
    //    console.log(req.body);
    //    const user= User(req.body); //user le request body ma k data send garyo, tesko euta naya use object banako based on the blueprint set on the 'User' Schema
    //    user.save(); //saves newly created user to the database

    //if there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check whether the user with this email exists already
    try {
      let user = await User.findOne({success, email: req.body.email });
      console.log(user);
      if (user) {
        return res
          .status(400)
          .json({success, error: "Sorry a user with this email already exists" });
      }

      //bcrypt package le password hashing garna milcha; salt is added to the input password making it a whole different code/hashed-password
      const salt = await bcrypt.genSalt(10);
      secPass = await bcrypt.hash(req.body.password, salt);
      //Create a new user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);

      //   res.json(user);
      success=true;
      res.json({success, authtoken });

      //Catch error
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error: Some Error Occured");
    }
  }
);

//auth.js is an endpoint

//ROUTE 2: Authenticate a User using: POST "/api/auth/login" No login required.

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success= false;
    //if there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success=false;
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success= false;
        return res
          .status(400)
          .json({ success, error: "Please try to login with correct credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success= true;
      res.json({ success, authtoken });
      //creating a JWT containing the user's ID. This token is signed with a secret key (JWT_SECRET). The token is then sent back to the client in the response. The client can use this token for authenticated requests.
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error: Some Error Occured");
    } 
  }
);

//ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser" LOGIN REQUIRED!
//login chaine routes haruma middleware rakhnu parcha in this case fetchuser middleware after /getuser
//In summary, this code handles a request to get user details by first verifying the user through middleware, then querying the database for the user's information, and finally sending the user information back in the response while excluding the password. If any error occurs, it sends a generic error message in the response.
router.post(
  "/getuser", fetchuser, async (req, res) => {
    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user)
    } catch (error) {
      console.error(error.message);                                             
      res.status(500).send("Internal Server Error: Some Error Occured");
    }
    []
  }
);


module.exports = router;



//jwtsecret chai authtoken ma integrate gareko so that can verify the account of the user 
//data vanne object lai secrect sanga sign gareko to give it a unique identity