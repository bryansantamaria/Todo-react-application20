const { createUser, loginUser } = require("../models/userModel");

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
    const token = await loginUser(email, password);
    return res.status(200).json(token);
  } catch (error) {
    return res.status(401).json(error);
  }
};

module.exports = { create, login };
