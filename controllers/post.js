const { isUser } = require("../middleware/gurads");
const { createPost } = require("../services/post");
const { mapErrors } = require("../util/mappers");
const router = require("express").Router();

router.get("/create", isUser(), (req, res) => {
  res.render("create", { title: "Create post" });
});

router.post("/create", isUser(), async (req, res) => {
  const userId = req.session.user._id;

  const post = {
    title: req.body.title,
    keyword: req.body.keyword,
    location: req.body.location,
    date: req.body.date,
    image: req.body.image,
    description: req.body.description,
    author: userId,
  };
  try {
    await createPost(post);
    res.redirect("/catalog");
  } catch (err) {
    console.error();
    const errors = mapErrors(err);
    res.render("create", { title: "Create post", errors, data: post });
  }
});

module.exports = router;