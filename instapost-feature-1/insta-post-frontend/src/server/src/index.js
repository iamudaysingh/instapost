const { ApolloServer, PubSub } = require('apollo-server');
const cors = require('cors');
const typeDefs = require('./schema');
const resolvers = require('./resolver');

const pubsub = new PubSub()
const server = new ApolloServer({ typeDefs, resolvers, context: { pubsub }   })

// server.use(cors());


server.listen(4000).then(() => {
    console.log(`Server is ready at port 4000`);
});