const express = require("express");
const router = express.Router();
const { create } = require("../controllers/userController");

router.post("/", create);

module.exports = router;
