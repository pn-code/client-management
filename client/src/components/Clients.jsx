import { gql, useQuery } from "@apollo/client";
import ClientRow from "./ClientRow";

// Create a GQL query with `gql` term
const GET_CLIENTS = gql`
    query {
        clients {
            id
            name
            email
            phone
        }
    }
`;

export default function Clients() {
    // To use the query to fetch data, utilize the `useQuery` function to call the query
    const { loading, error, data } = useQuery(GET_CLIENTS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Something went wrong</p>;

    return (
        <>
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
        </>
    );
}
