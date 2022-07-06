const express = require("express");
const mongoose = require("mongoose");

const db = require("./config/connection");
const routes = require("./routes");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost//localhost/social-network",
  {
    userFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.set("debug", true);

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`running on port ${PORT}!`);
  });
});
