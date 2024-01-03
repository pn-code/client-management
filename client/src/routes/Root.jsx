import { ApolloProvider } from "@apollo/client";
import Header from "../components/Header";
import client from "../config/client";
import { Outlet } from "react-router-dom";

export default function Root() {
    return (
        <>
            <ApolloProvider client={client}>
                <Header />
                <main className="p-2">
                    <Outlet />
                </main>
            </ApolloProvider>
        </>
    );
}
