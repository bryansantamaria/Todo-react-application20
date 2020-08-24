const express = require("express");
const router = express.Router();
const { create, login } = require("../controllers/userController");

router.post("/", create);
router.post("/login", login);

module.exports = router;
