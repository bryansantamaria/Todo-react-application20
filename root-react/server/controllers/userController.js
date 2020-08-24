const { createUser } = require("../models/userModel");
const jwt = require("jsonwebtoken");

const create = async (req, res) => {
  const { firstName, lastName, password, email } = req.body;
  try {
    const doc = await createUser(firstName, lastName, password, email);
    return res.status(200).json(doc);
  } catch (error) {
    return res.status(403).json(error);
  }
};

const login = (req, res) => {
    const {password, email} = req.body;
    try {
        const doc = await loginUser(password, email);
        const token = jwt.sign({email: doc.email}, process.env.SECRET, {expiresIn:"1h"});
        return res.status(200).json(token);
    } catch (error) {
        return res.status(403).json(error);
    }
}

module.exports = { create, login };
