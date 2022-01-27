// Import the required modules
const Joi = require("joi");

// Local Imports
const { Batch, Hostels, Years } = require("../schemas/Users");

// Min and Max Password Length
const MinPasswordLen = 6;
const MaxPasswordLen = 20;

// Exporting Register Schema
const RegisterSchema = Joi.object({
  name: Joi.string().required("Name is required"),
  email: Joi.string().email().required("Email is required"),
  year: Joi.string()
    .required("Year is required")
    .valid(...Years)
    .messages({
      "any.only": "Year must be valid",
    }),
  batch: Joi.string()
    .required("Batch is required")
    .valid(...Batch)
    .messages({
      "any.only": "Batch must be valid",
    }),
  hostel: Joi.string()
    .required("Hostel is required")
    .valid(...Hostels)
    .messages({
      "any.only": "Hostel must be valid",
    }),
  phone: Joi.string().required("Phone is required").length(10).messages({
    "string.length": "Phone must be valid 10 digit number",
  }),
  password: Joi.string()
    .min(6)
    .max(20)
    .required("Password is required")
    .messages({
      "string.min": `Password must be atleast ${MinPasswordLen} characters long`,
      "string.max": `Password must be atmost ${MaxPasswordLen} characters long`,
    }),
  push_notification_token: Joi.string().allow(""),
  room_number: Joi.string().required("Room Number is required"),
  remote_profile_picture: Joi.string().allow("").optional(),
}).options({ allowUnknown: true });

const ValidateRegister = (req, res, next) => {
  let newBody = {
    ...req.body,
    ...(req.file?.buffer && {
      profile_picture: req.file.buffer,
    }),
  };

  const result = RegisterSchema.validate(req.body);

  if (result.error)
    return res.status(400).send({ message: result.error.details[0].message });

  req.body = newBody;

  next();
};

// Exports
exports.ValidateRegister = ValidateRegister;
exports.RegisterSchema = RegisterSchema;
