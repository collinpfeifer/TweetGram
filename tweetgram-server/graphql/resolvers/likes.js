const { UserInputError } = require('apollo-server-errors');
const checkAuth = require('../../utils/checkAuth');
const Post = require('../../utils/checkAuth');

module.exports = {
  Mutation: {
    async likePost(_, { postId }, context) {
      const { username } = checkAuth(context);
      const post = await Post.findById(postId);
      if (post) {
        if (post.likes.find((like) => like.username === username)) {
          // post already liked
          post.likes = post.likes.filter((like) => like.username !== username);
        } else {
          //not liked
          post.likes.push({
            username,
            createdAt: new Date().toISOString(),
          });
        }

        await post.save();
        return post;
      } else throw new UserInputError('Post not found');
    },
  },
};
