const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const { SECRET } = require('../../config');

module.exports = {
  Mutation: {
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } }
    ) {
      const user =
        (await User.findOne({ username })) || (await User.findOne({ email }));
      if (user) {
        throw new UserInputError('Username or email address is taken', {
          errors: {
            error: 'This username or email address is taken',
          },
        });
      }

      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = jwt.sign(
        {
          id: res.id,
          email: res.email,
          username: res.username,
        },
        SECRET,
        { expiresIn: '1hr' }
      );

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
