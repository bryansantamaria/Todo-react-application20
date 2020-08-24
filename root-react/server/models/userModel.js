const { userCollection } = require("../database/dataBase");
const bcrypt = require("bcryptjs");

const createUser = async (firstName, lastName, password, email) => {
  const doc = await userCollection.find({ email: email });
  if (!doc) {
    const hash = bcrypt.hashSync(password, 10);
    const doc = await userCollection.insert({
      firstName,
      lastName,
      password: hash,
      email,
    });
    return doc;
  }
  return console.log("EMAIL already registered!");
};

const loginUser = async (password, email) => {
  const doc = await userCollection.find({ email: email });
  if (!doc) res.status(403).json("Email not found");

  const success = bcrypt.compareSync(password, doc.password);
  if (!success) res.status(403).json("Wrong password");

  return doc;
};

module.exports = { createUser, loginUser };
