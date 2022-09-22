const { isUser } = require("../middleware/gurads");
const {
  getPosts,
  getPostsbyAuthor,
  getPostsById,
} = require("../services/post");
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
  } else {
    post.hasVoted =
      post.votes.find((v) => v._id == req.session.user._id) != undefined;
  }

  res.render("details", { title: post.title, post });
});

router.get("/profile", isUser(), async (req, res) => {
  const posts = (await getPostsbyAuthor(req.session.user._id)).map(
    postViewModel
  );
  console.log(posts);
  res.render("profile", { title: "Profile", posts });
});

module.exports = router;
