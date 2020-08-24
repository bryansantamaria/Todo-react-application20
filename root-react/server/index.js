require("dotenv").config();
const express = require("express");
const path = require("path");
const toDosRoute = require("./routes/toDoRoute.js");
const usersRoute = require("./routes/userRoute");
const { authenticate } = require("./middlewares/auth");
const cors = require("cors");

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

app.use("/", usersRoute);
app.use("/todo", authenticate, toDosRoute);

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Listening to port: ${PORT}`);
});
