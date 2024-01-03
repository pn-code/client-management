import { ApolloProvider } from "@apollo/client";

import client from "./config/client";
import Header from "./components/Header";
import Clients from "./components/Clients";
import AddClientModal from "./components/AddClientModal";
import AddProjectModal from "./components/AddProjectModal";
import Projects from "./components/Projects";

function App() {
    return (
        <>
            {/* Allow all components within our app to access GraphQL with Apollo Provider */}
            <ApolloProvider client={client}>
                <Header />
                <main className="p-2">
                    <div className="flex gap-2">
                        <AddClientModal />
                        <AddProjectModal />
                    </div>
                    
                    <Projects />
                    <Clients />
                </main>
            </ApolloProvider>
        </>
    );
}

export default App;
