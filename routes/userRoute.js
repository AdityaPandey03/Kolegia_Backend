import express from "express";
import User from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userRouter = express.Router();

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const payload = {
            _id: user._id,
            name: user.name,
            email: user.email,
            hostel: user.hostel,
            roll_number: user.roll_number,
            room_number: user.room_number,
            contact_number: user.contact_number,
          };
          jwt.sign(
            payload,
            `${process.env.JWT_SECRET}`,
            { expiresIn: "30d" },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token,
              });
            }
          );
          return;
        } else {
          res.status(401).send({ message: "Inavlid password" });
        }
      } else {
        res.status(401).send({ message: "Inavlid email or password" });
      }
    } catch (err) {
      res.status(500).json({ message: "error in user login" });
    }
  })
);

userRouter.post(
  "/signup",
  expressAsyncHandler(async (req, res) => {
    try {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        hostel: req.body.hostel,
        roll_number: req.body.roll_number,
        room_number: req.body.room_number,
        contact_number: req.body.contact_number,
      });
      const createdUser = await user.save();
      const payload = {
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        hostel: createdUser.hostel,
        roll_number: createdUser.roll_number,
        room_number: createdUser.room_number,
        contact_number: createdUser.contact_number,
      };
      jwt.sign(
        payload,
        `${process.env.JWT_SECRET}`,
        { expiresIn: "30d" },
        (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token,
          });
        }
      );
    } catch (err) {
      res.status(500).json(err);
    }
  })
);

export default userRouter;
