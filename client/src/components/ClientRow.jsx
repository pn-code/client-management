import { useMutation } from "@apollo/client";
import { FaTrash } from "react-icons/fa";

import { DELETE_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQuery";
import { GET_PROJECTS } from "../queries/projectQuery";

export default function ClientRow({ client }) {
    const [deleteClient] = useMutation(DELETE_CLIENT, {
        variables: { id: client.id },
        refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],
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
