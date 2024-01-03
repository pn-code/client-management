import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import Spinner from "../components/Spinner";
import { GET_PROJECT } from "../queries/projectQuery";
import ClientInfo from "../components/ClientInfo";

export default function Project() {
    const { id } = useParams();

    const { loading, error, data } = useQuery(GET_PROJECT, {
        variables: { id },
    });

    if (loading) return <Spinner />;
    if (error) return <p>Something went wrong!</p>;

    return (
        <div>
            <header className="flex justify-between item-center mb-4">
                <h1>{data.project.name}</h1>
                <Link className="btn btn--primary" to="/">
                    Back
                </Link>
            </header>

            <p>{data.project.description}</p>

            <h2>Project Status: </h2>
            <p>{data.project.status}</p>

            <ClientInfo client={data.project.client}/>
        </div>
    );
}
