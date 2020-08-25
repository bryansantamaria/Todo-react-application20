const { createUser, loginUser } = require("../models/userModel");
const jwt = require("jsonwebtoken");

const create = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const doc = await createUser(firstName, lastName, email, password);
    return res.status(200).json(doc);
  } catch (error) {
    return res.status(401).json(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const doc = await loginUser(email, password);
    console.log(doc);
    const token = jwt.sign({ email: doc.email }, process.env.SECRET, {
      expiresIn: "1h",
    });
    console.log(token);
    return res.status(200).json(token);
  } catch (error) {
    return res.status(401).json(error);
  }
};

module.exports = { create, login };
