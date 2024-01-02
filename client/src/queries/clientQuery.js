import { gql } from "@apollo/client";

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

export { GET_CLIENTS };
