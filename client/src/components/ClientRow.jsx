import { useMutation } from "@apollo/client";
import { FaTrash } from "react-icons/fa";

import { DELETE_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQuery";

export default function ClientRow({ client }) {
    const [deleteClient] = useMutation(DELETE_CLIENT, {
        variables: { id: client.id },
        // We can update the data by refetching queries like so,
        // However, it can be slower than the next approach due to refetching
        refetchQueries: [{ query: GET_CLIENTS }],
        // Using Apollo cache here for higher efficiency
        update(cache, { data: { deleteClient } }) {
            // Get clients from existing query
            const { clients } = cache.readQuery({
                query: GET_CLIENTS,
                // Change the data in our cache by deleting target client
                data: {
                    clients: clients.filter(
                        (client) => client.id !== deleteClient.id
                    ),
                },
            });
        },
    });

    return (
        <tr>
            <td>{client.name}</td>
            <td>{client.email}</td>
            <td>{client.phone}</td>
            <td>
                <button onClick={deleteClient} className="btn btn--danger">
                    <FaTrash />
                </button>
            </td>
        </tr>
    );
}
