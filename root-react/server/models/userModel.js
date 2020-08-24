const { userCollection } = require("../database/dataBase");
const bcrypt = require("bcryptjs");

const createUser = async (firstName, lastName, password, email) => {
  const hash = bcrypt.hashSync(password, 10);
  console.log(hash);
  const doc = await userCollection.insert({
    firstName,
    lastName,
    password: hash,
    email,
  });
  return doc;
};

module.exports = { createUser };
