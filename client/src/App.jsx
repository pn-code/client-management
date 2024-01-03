import { ApolloProvider } from "@apollo/client";

import client from "./config/client";
import Header from "./components/Header";
import Clients from "./components/Clients";
import AddClientModal from "./components/AddClientModal";

function App() {
    return (
        <>
            {/* Allow all components within our app to access GraphQL with Apollo Provider */}
            <ApolloProvider client={client}>
                <Header />
                <main className="p-2">
                    <AddClientModal />
                    <Clients />
                </main>
            </ApolloProvider>
        </>
    );
}

export default App;
