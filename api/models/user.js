const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "must provide a first name"],
    trim: true,
    maxlength: [50, "first names cannot be more than 50 characters"],
  },
  lastName: {
    type: String,
    required: [true, "must provide a last name"],
    trim: true,
    maxlength: [50, "last names cannot be more than 50 characters"],
  },
  email: {
    type: String,
    unique: [true, "email needs to be unique"],
    required: [true, "must provide an email"],
    trim: true,
    maxlength: [50, "email cannot be more than 50 characters"],
  },
  password: {
    type: String,
    required: [true, "must provide a password"],
  },
  token: {
    type: String,
  },
});

module.exports = mongoose.model("User", UserSchema);
