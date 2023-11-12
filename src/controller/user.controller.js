import User from "../models/user.model.js";
import createError from "../utils/createError.js";
import bcrypt from "bcrypt";

export const AddUser = async (req, res, next) => {
  try {
    const { userName, password, userType } = req.body;

    // Check if the user already exists
    const user = await User.findOne({ userName: req.body.userName });
    if (user) {
      return next(createError(409, "User Already Exists"));
    }

    // Hash the password before saving it
    const saltRounds = 10; // You can adjust the number of salt rounds
    bcrypt.hash(password, saltRounds, async (err, hashedPassword) => {
      if (err) {
        return next(err);
      }

      // Create a new user with the hashed password
      let newUser = new User({
        userName,
        password: hashedPassword, // Store the hashed password
        userType,
      });

      if (userType == "Admin") {
        newUser = new User({
          userName,
          password: hashedPassword, // Store the hashed password
          userType,
          isAdmin: true,
        });
      }

      // Save the user to the database
      const savedUser = await newUser.save();

      res.status(201).json(savedUser);
    });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(createError(403, "User not found!"));

    await User.findByIdAndDelete(req.params.id);
    res.status(200).send("The User is deleted successfully.");
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).send(user);
};

export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const { password,isAdmin, resetToken, ...info } = user._doc;
    res.status(200).send(info);
  } catch (err) {
    next(err);
  }
};

// export const updateUser = async (req, res, next) => {
//   try {
//     const user = await User.findById({ _id: req.userId });
//     if (!user) return next(createError(403, "User not found!"));
//     const updateUser = await User.findByIdAndUpdate(
//       { _id: user._id },
//       { $set: { phone: req.body.phone, address: req.body.address } }
//     );
//     res.status(200).send(updateUser);
//   } catch (err) {
//     next(err);
//   }
// };

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ isAdmin: false });
    if (!users) return next(createError(404, "There is no any user found"));
    else return res.status(200).send(users);
  } catch (err) {
    next(err);
  }
};

// export const blockUser = async (req, res, next) => {
//   try {
//     const user = await User.findOne({ _id: req.params.id });
//     if (!user) return next(createError(404, "User not found"));

//     const updateUser = await findByIdAndUpdate(
//       { _id: user._id },
//       { $set: { status: "blocked" } }
//     );
//   } catch (err) {
//     next(err);
//   }
// };
