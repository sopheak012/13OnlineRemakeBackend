const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const isStrongPassword = require("./checkPassword");

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
  if (!email || !password) {
    throw new Error("All field must be filled");
  }
  try {
    const exists = await this.findOne({ email });
    if (exists) {
      throw new Error("Email already in use");
    }

    if (!isStrongPassword(password)) {
      throw new Error(
        "Password not strong enough. Minimum length 6, Must have at least 1 digit"
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.create({ email, password: hashedPassword });
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Static function for logging in a user
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error("All field must be filled");
  }
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
