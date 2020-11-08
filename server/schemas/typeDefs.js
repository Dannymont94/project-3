const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Show {
    tvMazeId: Int
    name: String
    description: String
    image: String
    genres: [String]
    network: String
    status: String
    rating: Int
  }

  type User {
    _id: ID
    username: String
    email: String
    completed: [Show]
    interested: [Show]
    watching: [Show]
    completedCount: Int
    interestedCount: Int
    watchingCount: Int
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;