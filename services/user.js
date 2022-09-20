const User = require("../models/User");
const { hash, compare } = require("bcrypt");

async function register(firstName, lastName, email, password) {
  const existing = await getUserByIdentificator(email);

  if (existing) {
    throw new Error("Username is taken");
  }

  const hashedPassword = await hash(password, 10);

  const user = new User({
    firstName,
    lastName,
    email,
    hashedPassword,
  });

  await user.save();

  return user;
}

async function login(email, password) {
  const user = await getUserByIdentificator(email);

  if (!user) {
    throw new Error("User doesn't exist");
  }

  const hasMatch = compare(password, user.hashedPassword);

  if (!hasMatch) {
    throw new Error("incorect username or password");
  }

  return user;
}

async function getUserByIdentificator(email) {
  const user = await User.findOne({
    email: new RegExp(`^${email}$`, "i"),
  });
  return user;
}

module.exports = {
  login,
  register,
};
