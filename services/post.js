const Post = require("../models/Post");

async function createPost(post) {
  const result = new Post(post);
  await result.save();

  return result;
}

async function getPosts() {
  return Post.find({});
}

async function getPostsById(id) {
  return Post.findById({ id }).populate("author", "firstname lastName");
}

module.exports = {
  createPost,
  getPosts,
  getPostsById,
};
