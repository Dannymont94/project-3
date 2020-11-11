const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Show {
    tvMazeId: Int
    name: String
    summary: String
    image: String
    genres: [String]
    network: String
    status: String
    rating: String
  }

  type User {
    _id: ID
    username: String
    email: String
    interestedCount: Int
    interested: [Show]
    watchingCount: Int
    watching: [Show]
    completedCount: Int
    completed: [Show]
    notInterestedCount: Int
    notInterested: [Show]
  }

  type Auth {
    token: ID
    user: User
  }

  input ShowInput {
    tvMazeId: Int
    name: String
    summary: String
    image: String
    genres: [String]
    network: String
    status: String
    rating: String
  }

  type Query {
    user: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    updateShows(oldCategory: String, newCategory: String, show: ShowInput): User
  }
`;

module.exports = typeDefs;