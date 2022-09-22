const { isUser } = require("../middleware/gurads");
const {
  createPost,
  updatePost,
  deletePost,
  vote,
} = require("../services/post");
const { mapErrors } = require("../util/mappers");
const router = require("express").Router();
const { getPostsById } = require("../services/post");
const { postViewModel } = require("../util/mappers");

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

router.get("/edit/:id", isUser(), async (req, res) => {
  const id = req.params.id;
  const post = postViewModel(await getPostsById(id));

  if (req.session.user === undefined) {
    return res.redirect("/login");
  } else if (req.session.user._id != post.author._id) {
    return res.redirect("/login");
  }

  res.render("edit", { title: "edit post", post });
});

router.post("/edit/:id", isUser(), async (req, res) => {
  const id = req.params.id;

  const existing = postViewModel(await getPostsById(id));

  if (req.session.user === undefined) {
    return res.redirect("/login");
  } else if (req.session.user._id != existing.author._id) {
    return res.redirect("/login");
  }

  const post = {
    title: req.body.title,
    keyword: req.body.keyword,
    location: req.body.location,
    date: req.body.date,
    image: req.body.image,
    description: req.body.description,
  };

  try {
    await updatePost(id, post);
    res.redirect("/catalog/" + id);
  } catch (err) {
    console.error(err);
    post._id = id;
    const errors = mapErrors(err);
    res.render("edit", { title: "edit post", errors, post });
  }
});

router.get("/delete/:id", isUser(), async (req, res) => {
  const id = req.params.id;
  const existing = postViewModel(await getPostsById(id));

  if (req.session.user === undefined) {
    return res.redirect("/login");
  } else if (req.session.user._id != existing.author._id) {
    return res.redirect("/login");
  }
  try {
    await deletePost(id);
    res.redirect("/catalog");
  } catch (err) {
    console.error(err);
    const errors = mapErrors(err);
    res.render("details", { title: post.title, errors });
  }
});

router.get("/vote/:id/:type", isUser(), async (req, res) => {
  const id = req.params.id;
  const value = req.params.type === "upvote" ? 1 : -1;

  try {
    await vote(id, req.session.user._id, value);
    res.redirect("/catalog/" + id);
  } catch (err) {
    console.error(err);
    const errors = mapErrors(err);
    res.render("details", { title: "Post details", errors });
  }
});

module.exports = router;
