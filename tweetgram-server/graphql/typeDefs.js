const { gql } = require('apollo-server');
const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
    comments: [Comments]!
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
    token: String!
    username: String!
    createdAt: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
  }
  type Mutation {
    register(username: String!, email: String!, password: String!, confirmPassword: String!): User!
    login(username: String!, password: String!): User!
    edit(username: String!, email: String!, password: String!, confirmPassword: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    editPost(postId: ID!, body: String!): String!
    createComment(postId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!):  Post!
    editComment(postId: ID!, commentId: ID!): Post!
    likeComment(postId: ID!); Post!
  }
  type Subscription{
    newPost: Post!
  }
`;

module.exports = typeDefs;
