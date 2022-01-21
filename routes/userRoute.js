import express from "express";
import User from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import crypto from "crypto-js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import upload from "../utils/multer.js";
import { cloudinary2 } from "../utils/cloudinary.js";

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

//endpoint for signup without activation

userRouter.post(
  "/signup",
  upload.single("image"),
  expressAsyncHandler(async (req, res) => {
   
      // console.log(req.body);
      const { name, email, hostel, rollNumber, roomNumber, contactNumber } = req.body;
      // User.findOne({email}).exec((err, user) => {
      //   if(user) {
      //     return res.status(400).json({error:"User with this email address already exists"});
      //   }
      // });
      const result = await cloudinary2.uploader.upload(req.file.path);
      console.log(result);
      const user = new User({
        name,
        email,
        password: bcrypt.hashSync(req.body.password, 8),
        hostel,
        rollNumber,
        roomNumber,
        contactNumber,
        cloudinaryId: result.public_id,
        profileImg: result.secure_url,
      });
      let createdUser = await User.save();
      console.log(createdUser);
      const payload = {
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        hostel: createdUser.hostel,
        rollNumber: createdUser.rollNumber,
        roomNumber: createdUser.roomNumber,
        contactNumber: createdUser.contactNumber,
      };
      const token = jwt.sign(payload,`${process.env.JWT_SECRET}`,{expiresIn: "20min" });
    

    // NODEMAILER TRANSPORT FOR SENDING POST NOTIFICATION VIA EMAIL
    const transporter = nodemailer.createTransport({
      host: 'kolegia.com',
      port: 587,
      auth: {
        user: 'pandey.aditya4272@gmail.com',
        pass: 'process.env.PASSWORD',
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    transporter.sendMail({
      //link has to be changed later on
      from: '"Kolegia Team" <pandey.aditya4272@gmail.com>',
      to:   createdUser.email,
      subject: "Account Activation Link",
      html: `
              <h5>Please click on this <a href="https://localhost:8000/activate/${token}">link</a> to activate your password</h5>
              <p>Link not clickable?, copy and paste the following url in your address bar.</p>
              <p>${process.env.CLIENT_URL}/activate/${token}</p>
              <P>If this was a mistake, just ignore this email and nothing will happen.</P>
              `,
    });


  })
);

//endpoint for activation

userRouter.post(
  "/activate",
  expressAsyncHandler(async (req, res) => {
    const {token}= req.body;
    if(token){
      jwt.verify(token,process.env.JWT_SECRET, function(err,decodedToken){
        if(err){
          return res.status(400).json({error: 'Incorrect or Expired Link'})
        }
        const {name,email} = decodedToken;
        // User.findOne({email}).exec((err, user) => {
        //   if(user) {
        //     return res.status(400).json({error:"User with this email address already exists"});
        //   }
        // });
        let user = new User({
          name,
          email,
          password: bcrypt.hashSync(req.body.password, 8),
          hostel,
          rollNumber,
          roomNumber,
          contactNumber,
          cloudinaryId: result.public_id,
          profileImg: result.secure_url,
        });
        let createdUser =  User.save((err,success) => {
          if(err){
            console.log("error in signup: ",err);
            return res.status(400).json({error:err});
          }
          else{
            res.status(200).json({message:"success in signup!"})
          }
        });

      })
    }
    else{
      return res.status(404).json({message:'Error in signing up!'})
    }
  })
)

//Endpoint for  updating user details

userRouter.post("/updateuser", (req, res) => {
  req.check("name", " Name missing").notEmpty();
  req.check("hostel", "Update hostel details").notEmpty();
  req.check("rollNumber", " Roll number missing").notEmpty();
  req.check("roomNumber", " Room number missing").notEmpty();
  //profilePic condition to be added @Vivek-Sherkhane
  req.check("password", "Password cannot be empty").notEmpty();
  req
    .check("contactNumber", "Phone number is invalid")
    .isMobilePhone(["en-IN"]);
  const errors = req.validationErrors();
  let response;
  if (errors) {
    response = {
      success: false,
      errors,
    };
    res.send(response);
  } else {
    response = {
      success: true,
      errors: null,
    };
    User.findOneAndUpdate(
      { email: req.body.email },
      {
        name: req.body.name,
        password: req.body.password,
        contactNumber: req.body.contactNumber,
        hostel: req.body.hostel,
        roomNumber: req.body.roomNumber,
        rollNumber: req.body.rollNumber,
      }
    ).then(function (result) {
      res.send(response);
    });
  }
});

//endpoint for deleting account

userRouter.delete(
  "/deleteaccount/:id",
  expressAsyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const deleteAccount = await User.findByIdAndRemove(id);
      if (deleteAccount) {
        res.status(200).json({
          message: "Client deleted successfully!",
        });
      } else {
        res.status(400).json({
          message: "No client exist with that id",
        });
      }
    } catch (err) {
      res.status(500).json({ message: "Error in deleting" });
    }
  })
);

//endpoint for forgot password

userRouter.post(
  "/forgotPassword",
  expressAsyncHandler(async (req, res) => {
    const { email } = req.body;

    // NODEMAILER TRANSPORT FOR SENDING POST NOTIFICATION VIA EMAIL
    const transporter = nodemailer.createTransport({
      host: HOST,
      port: PORT,
      auth: {
        user: USER,
        pass: PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    crypto.randomBytes(32, (err, buffer) => {
      if (err) {
        console.log(err);
      }
      const token = buffer.toString("hex");
      User.findOne({ email: email }).then((user) => {
        if (!user) {
          return res
            .status(422)
            .json({ error: "User does not exist in our database" });
        }
        user.resetToken = token;
        user.expireToken = Date.now() + 3600000;
        user.save().then((result) => {
          transporter.sendMail({
            //link has to be changed later on
            to: user.email,
            from: "Kolegia Team <pandey.aditya4272@gmail.com>",
            subject: "Password reset request",
            html: `
                    <p>You requested for password reset!</p>
                    <h5>Please click this <a href="https://localhost:8000/reset/${token}">link</a> to reset your password</h5>
                    <p>Link not clickable?, copy and paste the following url in your address bar.</p>
                    <p>https://localhost:8000/reset/${token}</p>
                    <P>If this was a mistake, just ignore this email and nothing will happen.</P>
                    `,
          });
        });
      });
    });
  })
);

//endpoint for reset password

userRouter.post(
  "/reset",
  expressAsyncHandler(async (req, res) => {
    const newPassword = req.body.password;
    const sentToken = req.body.token;
    User.findOne({ resetToken: sentToken, expireToken: { $gt: Date.now() } })
      .then((user) => {
        if (!user) {
          return res.status(422).json({ error: "Try again session expired" });
        }
        bcrypt.hash(newPassword, 12).then((hashedpassword) => {
          user.password = hashedpassword;
          user.resetToken = undefined;
          user.expireToken = undefined;
          user.save().then((saveduser) => {
            res.json({ message: "password updated success" });
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  })
);

export default userRouter;


