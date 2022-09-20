const express = require("express");
const { create: handlebars } = require("express-handlebars");
const session = require("express-session");
const uerSession = require("../middleware/userSession");

module.exports = (app) => {
  app.engine(
    "hbs",
    handlebars({
      extname: ".hbs",
    }).engine
  );
  app.set("view engine", "hbs");

  app.use(
    session({
      secret: "my super duper secret",
      resave: false,
      saveUninitialized: true,
      cookie: { secure: "auto" },
    })
  );

  app.use(uerSession());
  app.use(express.urlencoded({ extended: true }));
  app.use("/static", express.static("static"));
};
