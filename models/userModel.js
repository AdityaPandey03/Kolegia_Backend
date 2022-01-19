// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  hostel: {
    type: String,
    required: true,
  },
  rollNumber: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: Number,
    required: true,
  },
  roomNumber: {
    type: Number,
    required: true,
  },
  profileImg: {
    type: String,
    default:
      "https://res.cloudinary.com/geekysrm/image/upload/v1542221619/default-user.png",
    required: false,
  },
  cloudinaryId: {
    type: String,
  },
});

// userSchema.pre('save', function(next) {
//   const user = this;
//   if (!user.isModified('password')) {
//     return next();
//   }

//   bcrypt.genSalt(10, (err, salt) => {
//     if (err) {
//       return next(err);
//     }

//     bcrypt.hash(user.password, salt, (err, hash) => {
//       if (err) {
//         return next(err);
//       }
//       user.password = hash;
//       next();
//     });
//   });
// });

// userSchema.methods.comparePassword = function(candidatePassword) {
//   const user = this;

//   return new Promise((resolve, reject) => {
//     bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
//       if (err) {
//         return reject(err);
//       }

//       if (!isMatch) {
//         return reject(false);
//       }

//       resolve(true);
//     });
//   });
// };

const User = mongoose.model("user", userSchema);
export default User;
