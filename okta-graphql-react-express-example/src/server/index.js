const { ApolloServer, PubSub } = require('apollo-server')
const typeDefs = require('./schema')
const resolvers = require('./resolver')

const pubsub = new PubSub()
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req, connection }) => {
        if (connection) {
            const { context } = connection;
            return { pubsub, context }
        } else {
            const token = req.headers.authorization || '';
            return { pubsub, token };
        }
    },
})
server.listen(4000).then(() => {
    console.log(`Server is ready at port 4000`);
});