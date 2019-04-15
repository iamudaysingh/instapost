const POSTS = [];
const POST_CHANNEL = "POST_CHANNEL";

const resolvers = {
  Query: {
    posts(root, args, context) {
      return POSTS;
    },
  },

  Mutation: {
    createPost(root, { createdBy, text }, { pubsub }) {
      const post = { originalId: POSTS.length + 1, createdBy, text, createdAt: new Date(), likes: [] };
      POSTS.push(post);
      pubsub.publish("POST_CHANNEL", { postCreated: post });
      return post;
    },
    deletePost(root, { originalId }, { pubsub }) {
      for(let i = 0; i < POSTS.length; i++) { 
        if ( POSTS[i].originalId == originalId) {
          POSTS.splice(i, 1);
          i--; 
        }
     };
      return POSTS;
    }
  },
  Subscription: {
    postCreated: {
      subscribe: (root, args, { pubsub }) => {
        return pubsub.asyncIterator(POST_CHANNEL);
      },
    },
  },
}

module.exports = resolvers;
