import { gql } from "@apollo/client";

const DELETE_PROJECT = gql`
    mutation deleteProject($id: ID!) {
        deleteProject(id: $id) {
            id
            name
            status
        }
    }
`;

export { DELETE_PROJECT };
