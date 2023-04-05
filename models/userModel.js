const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Static function for signing up a new user
userSchema.statics.signUp = async function (email, password) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.create({ email, password: hashedPassword });
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Static function for logging in a user
userSchema.statics.login = async function (email, password) {
  try {
    const user = await this.findOne({ email });
    if (!user) {
      throw new Error("Email not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid password");
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
