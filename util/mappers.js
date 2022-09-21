function mapErrors(error) {
  if (Array.isArray(error)) {
    return error;
    // this is error coming from mongoose
  } else if (error.name == "ValidationError") {
    return Object.values(error.errors).map((e) => ({ msg: e.message }));
  } else if (typeof error.message == "string") {
    return [
      {
        msg: error.message,
      },
    ];

    //if we dont know what exacly the error is
  } else {
    return [
      {
        msg: "Request error",
      },
    ];
  }
}

function postViewModel(post) {
  return {
    _id: post.id,
    title: post.title,
    keyword: post.keyword,
    location: post.location,
    date: post.date,
    image: post.image,
    description: post.description,
    author: post.author,
    votes: post.votes,
    rating: post.rating,
  };
}

module.exports = {
  mapErrors,
  postViewModel,
};
