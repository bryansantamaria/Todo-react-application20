const { userCollection } = require("../database/dataBase");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createUser = async (firstName, lastName, email, password) => {
  const doc = await userCollection.findOne({ email: email });
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

const loginUser = async (email, password) => {
  const doc = await userCollection.findOne({ email: email });
  if (!doc) res.status(403).json("Email not found");

  const success = bcrypt.compareSync(password, doc.password);
  console.log(success);
  if (!success) res.status(403).json("Wrong password");
  const token = jwt.sign({ email: doc.email }, process.env.SECRET, {
    expiresIn: "1h",
  });
  return token;
};

const verifyToken = async (token, secret) => {
  const validToken = await jwt.verify(token, secret);
  return validToken;
};

module.exports = { createUser, loginUser, verifyToken };
