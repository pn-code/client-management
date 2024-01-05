import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { FaHome } from "react-icons/fa";

import { GET_PROJECT } from "../queries/projectQuery";
import Spinner from "../components/Spinner";
import ClientInfo from "../components/ClientInfo";
import EditProjectForm from "../components/EditProjectForm";
import DeleteProjectButton from "../components/DeleteProjectButton";

export default function Project() {
    const { id } = useParams();

    if (!id) throw new Error("There is no project id.");

    const { loading, error, data } = useQuery(GET_PROJECT, {
        variables: { id },
    });

    if (loading) return <Spinner />;
    if (error) return <p>Something went wrong!</p>;

    return (
        <div className="full-screen flex-col center">
            <div className="sm:mx-[20%] p-6 bg-blue-50 rounded-md md:w-[600px]">
                <header className="w-full flex justify-between item-center mb-4 border-b-2 pb-2 border-blue-400">
                    <h1>{data.project.name}</h1>
                    <div className="flex gap-2 items-center">
                        <Link
                            className="btn btn--primary flex gap-1.5 items-center"
                            to="/"
                        >
                            <FaHome /> Back
                        </Link>
                        <DeleteProjectButton projectId={data.project.id} />
                    </div>
                </header>

                <h2>Description: </h2>
                <p>{data.project.description}</p>

                <h2>Project Status: </h2>
                <p>{data.project.status}</p>

                <ClientInfo client={data.project.client} />
                <EditProjectForm project={data.project} />
            </div>
        </div>
    );
}
