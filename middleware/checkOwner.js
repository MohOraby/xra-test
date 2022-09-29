const { Post } = require('./../db/models/post');

const checkOwner = async (req, res, next) => {
  // Check if post exists
  const post = await Post.findOne({ _id: req.params.id });
  if (!post) return res.status(400).send('Post does not exist');

  // Check if the post user and current user are the same
  // Uses authenticate middleware req.user
  if (post.user.equals(req.user._id)) {
    next();
  } else {
    return res.status(401).send('Unauthorized');
  }
};

module.exports = { checkOwner };