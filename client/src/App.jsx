import { ApolloProvider } from "@apollo/client";

import client from "./config/client";
import Header from "./components/Header";
import Clients from "./components/Clients";

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
