const POSTS = [];
const POST_CHANNEL = "POST_CHANNEL";

const resolvers = {
  Query: {
    posts(root, args, context) {
      return POSTS;
    },
  },

  Mutation: {
    createPost(root, { createdBy, text }, context, info) {
      const { pubsub } = context;
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
    },
    updatePost(root, { originalId, text }, { pubsub }) {
      const post = POSTS.map(post => {
        if(post.originalId == originalId) {
          post.text = text;
          return post;
        }
      })
      return post;
    },
  },
  Subscription: {
    postCreated: {
      subscribe: (root, args, context) => {
        const { pubsub } = context;
        return pubsub.asyncIterator(POST_CHANNEL);
      },
    },
  },
}

module.exports = resolvers;
