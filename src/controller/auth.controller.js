import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { JWT_KEY } from "../config/config.js";
import createError from "../utils/createError.js";

export const login = async (req, res, next) => {
  try {
    if (req.cookies.accessToken) {
      return next(createError(409, "User is already logged in."));
    }
    const user = await User.findOne({ userName: req.body.userName });
    if (!user) {
      return next(createError(404, "User not Found"));
    }
    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect) return next(createError(404, "Wrong password or username"));
    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
        userType: user.userType,
      },
      JWT_KEY
    );

    const { password, ...info } = user._doc;

    res.cookie("accessToken", token, { httpOnly: true }).status(200).send(info);
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out.");
};
