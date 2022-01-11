const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name:{
    type: String,
    required:true
  },
  hostel:{
    type:String,
    required:true
  },
  roll_number:{ 
    type:String, 
    required:true
  },
  contact_number:{ 
    type: Number,
    required: true
  },
  room_number:{ 
    type: Number,
    required: true
  },
  profile_img:[
    {
      img:{
        type:String,
        data:Buffer,
        required:false
      }
    }
  ]



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

const user=mongoose.model('User', userSchema);
export default user;