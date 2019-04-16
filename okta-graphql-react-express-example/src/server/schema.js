const typeDefs = `
  scalar Date
    type Post {
      originalId: ID!
      createdBy: String!
      createdAt: Date!
      text: String!
      likes: [String!]
    }

    type Query {
      posts: [Post]
    }

    type Mutation {
      createPost(createdBy: String!, text: String!): Post
      deletePost(originalId: ID!): [Post]
      updatePost(originalId: ID!, text: String!): [Post]
    }

    type Subscription {
      postCreated: Post
    }
  `
module.exports = typeDefs;