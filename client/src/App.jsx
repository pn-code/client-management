import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

import Header from "./components/Header";
import Clients from "./components/Clients";

const client = new ApolloClient({
    // Setting up Apollo Client with our server's GraphQL endpoint
    uri: "http://localhost:5000/graphql",
    cache: new InMemoryCache(),
});

function App() {
    return (
        <>
            {/* Allow all components within our app to access GraphQL with Apollo Provider */}
            <ApolloProvider client={client}>
                <Header />
                <Clients />
            </ApolloProvider>
        </>
    );
}

export default App;
