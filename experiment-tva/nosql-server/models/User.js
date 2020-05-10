const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  email: {
    type: String,
    required: "`{PATH}` is required!",
    minlength: 6,
    unique: true,
  },
  password: {
    type: String,
    required: "`{PATH}` is required!",
    minlength: 6,
  },
  uid: {
    type: String,
    required: true,
    default: uuidv4(),
  },
});

// Hashing password before saving a new user to the database
UserSchema.pre("save", async function (next) {
  let user = this;

  if (user.isModified("password") || user.isNew) {
    let hashPwd = await bcrypt.hash(user.password, 12);
    user.password = hashPwd;
  }
  next();
});

// Comparing password input to hashed password in the database
UserSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Creating a model of the schema
const User = mongoose.model("User", UserSchema);

// Export
module.exports = User;
