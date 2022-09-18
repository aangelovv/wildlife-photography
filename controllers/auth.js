const router = require("express").Router();

router.get("/register", (req, res) => {
  res.render("render");
});

router.get("/login", (res, req) => {
  res.render("login");
});

module.exports = router;
