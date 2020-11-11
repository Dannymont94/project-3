const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const Models = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        return await User.findById(context.user._id);
      }

      throw new AuthenticationError('Not logged in');
    }
  },
  Mutation: {
    addUser: async (parent, {username, email, password}) => {
      const user = await User.create({username, email, password});
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, {email, password}) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    updateShows: async (parent, { oldCategory, newCategory, show }, context) => {
      if (context.user) {
        if (!oldCategory && !newCategory) {
          return;
        } else if (!oldCategory) {
          // just adding to newCategory
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { [newCategory]: show } },
            { new: true, runValidators: true }
          );

          return updatedUser;
        } else if (!newCategory) {
          // just removing from oldCategory
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { [oldCategory]: { tvMazeId: show.tvMazeId } } },
            { new: true, runValidators: true }
          );

          return updatedUser;
        } else {
          // remove from oldCategory and then add to newCategory
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { 
              $pull: { [oldCategory]: { tvMazeId: show.tvMazeId } },
              $addToSet: { [newCategory]: show },
            },
            { new: true, runValidators: true }
          );

          return updatedUser;
        }
      }
      throw new AuthenticationError('Not logged in');
    }
  }
};

module.exports = resolvers;