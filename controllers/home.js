const { getPosts, getPostsById } = require("../services/post");
const { postViewModel } = require("../util/mappers");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("home", { title: "Home Page" });
});

router.get("/catalog", async (req, res) => {
  const posts = (await getPosts()).map(postViewModel);
  res.render("catalog", { title: "Catalog", posts });
});

router.get("/catalog/:id", async (req, res) => {
  const id = req.params.id;
  const post = postViewModel(await getPostsById(id));

  if (req.session.user) {
    post.hasUser = true;
  }

  if (req.session.user === undefined) {
    console.log("there is no user");
  } else if (req.session.user._id == post.author._id) {
    post.isAuthor = true;
  }

  res.render("details", { title: post.title, post });
});

module.exports = router;
