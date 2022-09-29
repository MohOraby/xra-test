const { Post } = require('../db/models/post');

// Add post using mongoose create method
exports.addPost = async (data) => {
  try {
    const postData = {
      title: data.title,
      content: data.content,
      user: data.user
    };

    const post = await Post.create(postData);

    return post;
  } catch (err) {
    throw err;
  }
};

// Edit post
exports.editPost = async (data) => {
  try {
    const post = await Post.findByIdAndUpdate(data.id, { $set: { content: data.content, title: data.title } }, { new: true });

    return post;
  } catch (err) {
    throw err;
  }
};

// Delete Post
exports.deletePost = async (id) => {
  try {
    const post = await Post.findByIdAndDelete(id);

    return post;
  } catch (err) {
    throw err;
  }
};