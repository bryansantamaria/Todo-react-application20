const { userCollection } = require("../database/dataBase");
const bcrypt = require("bcryptjs");

const createUser = async (firstName, lastName, password, email) => {
  const uniqueEmail = await userCollection.find({ email: email });
  if (!uniqueEmail) {
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

module.exports = { createUser };
