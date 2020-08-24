const { createUser } = require("../models/userModel");
const jwt = require("jsonwebtoken");

const create = async (req, res) => {
  const { firstName, lastName, password, email } = req.body;
  try {
    const doc = await createUser(firstName, lastName, password, email);
    return res.status(200).json(doc);
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = { create };
