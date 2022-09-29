const Joi = require('joi');

const { Post } = require('../db/models/post');

const postServices = require('../services/post');

// Function to add Post
exports.addPost = async (req, res) => {
  try {
    const body = req.body;
    const user = req.user;

    // Joi body validation
    const validationSchema = Joi.object({
      content: Joi.string().required(),
      title: Joi.string().required()
    });

    await validationSchema.validateAsync(body);

    const data = { user, content: body.content, title: body.title };

    // Using the service to add Post
    const post = await postServices.addPost(data);

    return res.json({ post });
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};

// Function to get Posts list
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find({});

    return res.json({ posts });
  } catch (err) {
    return res.status(400).send(err);
  }
};

// Function to edit Post
exports.editPost = async (req, res) => {
  try {
    const body = req.body;
    const currentPost = await Post.findById(req.params.id);

    // Joi body validation
    const validationSchema = Joi.object({
      content: Joi.string().required(),
      title: Joi.string().required()
    });

    await validationSchema.validateAsync(body);

    const data = { id: currentPost._id, content: body.content, title: body.title };

    // Using the service to edit Post
    const newPost = await postServices.editPost(data);

    return res.json({ newPost });
  } catch (err) {
    return res.status(400).send(err);
  }
};

// Function to delete Post
exports.deletePost = async (req, res) => {
  try {
    // Using the custom service to delete Post
    const deletedPost = await postServices.deletePost(req.params.id);

    return res.json({ deletedPost });
  } catch (err) {
    return res.status(400).send(err);
  }
};