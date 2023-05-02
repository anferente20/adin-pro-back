const { response } = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const { generateJWT } = require("../helpers/jwt.helper");
const { googleVerify } = require("../helpers/google-verify.helper");

const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    //verify email
    const userDB = await User.findOne({ email });
    //user mail is not registered
    if (!userDB) {
      res.status(404).json({
        ok: false,
        msg: "User not found.",
      });
    }

    //verify password
    const validPassword = bcrypt.compareSync(password, userDB.password);
    if (!validPassword) {
      res.status(403).json({
        ok: false,
        msg: "You are not allowed to login.",
      });
    }

    const token = await generateJWT(userDB.id);

    res.json({
      ok: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Talk with the DBA",
    });
  }
};

const googleAuth = async (req, res = response) => {
  const gToken = req.body.token;

  try {
    const { email, picture, name } = await googleVerify(gToken);

    const userDB = await User.findOne({ email });
    let user;
    if (!userDB) {
      user = new User({
        name: name,
        email: email,
        password: "@@@",
        image: picture,
        googleToken: true,
      });
    } else {
      user = userDB;
      user.googleToken = true;
    }

    //save user
    await user.save();

    //Generate token
    const token = await generateJWT(user.id);

    res.json({
      ok: true,
      name,
      email,
      picture,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Google Authenticartion is incorrect",
    });
  }
};

const renewToken = async (req, res = response) => {
  const uid = req.uid;
  const token = await generateJWT(uid);

  //get user
  const userDB = await User.findById(uid);
  if (!userDB) {
    response.status(404).json({
      ok: false,
      msg: "User not found",
    });
  }
  res.json({
    ok: true,
    token,
    user: userDB,
  });
};

module.exports = {
  login,
  googleAuth,
  renewToken,
};
