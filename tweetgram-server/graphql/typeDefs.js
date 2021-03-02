const { gql } = require('apollo-server');
const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
  }
  type Comment {
    id: ID!
    createdAt: String!
    username: String!
    body: String!
  }
  type Like {
    id: ID!
    createdAt: String!
    username: String!
  }
  type User {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
    username: String!
    createdAt: String!
    token: String!
  }
  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post!
  }
  input RegisterInput {
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
  }
  input LoginInput {
    username: String!
    password: String!
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(loginInput: LoginInput): User!
    edit(editInput: RegisterInput): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    editPost(postId: ID!, body: String!): String!
    likePost(postId: ID!): Post!
    createComment(postId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    editComment(postId: ID!, commentId: ID!): Post!
  }
  type Subscription {
    newPost: Post!
  }
`;

module.exports = typeDefs;
