const authControler = require("../controllers/auth");
const homeController = require("../controllers/home");

module.exports = (app) => {
  app.use(authControler);
  app.use(homeController);
};
