import { useQuery } from "@apollo/client";

import { GET_PROJECTS } from "../queries/projectQuery";
import ProjectCard from "./ProjectCard";
import Spinner from "./Spinner";

export default function Projects() {
    // To use the query to fetch data, utilize the `useQuery` function to call the query
    const { loading, error, data } = useQuery(GET_PROJECTS);

    if (loading) return <Spinner />;
    if (error) {
        console.error(error);
        return <p className="full-screen center">Something went wrong</p>;
    }

    return (
        <div>
            <h2>Projects</h2>
            {data.projects.length > 0 ? (
                <div className="w-full h-full flex flex-wrap gap-2">
                    {data.projects.map((project) => (
                        <ProjectCard project={project} key={project.id} />
                    ))}
                </div>
            ) : (
                <p>There are no projects currently.</p>
            )}
        </div>
    );
}
