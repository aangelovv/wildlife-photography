const authControler = require("../controllers/auth");
const homeController = require("../controllers/home");
const postControler = require("../controllers/post");

module.exports = (app) => {
  app.use(authControler);
  app.use(homeController);
  app.use(postControler);

  app.get("*", (req, res) => {
    res.render("404", { title: "Page not found" });
  });
};
