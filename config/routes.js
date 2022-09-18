const authControler = require("../controllers/auth");

module.exports = (app) => {
  app.use(authControler);
};
