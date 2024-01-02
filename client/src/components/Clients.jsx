import { useQuery } from "@apollo/client";

import { GET_CLIENTS } from "../queries/clientQuery";
import ClientRow from "./ClientRow";
import Spinner from "./Spinner";

export default function Clients() {
    // To use the query to fetch data, utilize the `useQuery` function to call the query
    const { loading, error, data } = useQuery(GET_CLIENTS);

    if (loading) return <Spinner />;
    if (error)
        return <p className="full-screen center">Something went wrong</p>;

    return (
        <div className="p-2 w-full h-full">
            {!loading && !error && (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.clients.map((client) => (
                            <ClientRow key={client.id} client={client} />
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
