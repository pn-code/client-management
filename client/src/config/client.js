import { InMemoryCache, ApolloClient } from "@apollo/client";

const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                clients: {
                    merge(_existing, incoming) {
                        return incoming;
                    },
                },
                projects: {
                    merge(_existing, incoming) {
                        return incoming;
                    },
                },
            },
        },
    },
});

const client = new ApolloClient({
    // Setting up Apollo Client with our server's GraphQL endpoint
    uri: "http://localhost:5000/graphql",
    cache,
});

export default client;
