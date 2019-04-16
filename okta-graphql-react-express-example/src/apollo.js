import { ApolloClient, InMemoryCache } from 'apollo-boost';
import { split } from "apollo-client-preset";
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
let auth;
export const updateAuth = (newAuth) => {
  auth = newAuth;
};

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql"
});
  
const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
  reconnect: true
  }
});

const link = split(
  ({ query }) => {
  const { kind, operation } = getMainDefinition(query);
  return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink,
);

export default new ApolloClient({
  link,
  cache: new InMemoryCache(),
  request: async (operation) => {
    const token = await auth.getAccessToken();
    operation.setContext({
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
});
