import { useMutation } from "@apollo/client";
import { FaTrash } from "react-icons/fa";

// import { DELETE_PROJECT } from "../mutations/projectMutations";
import { GET_PROJECTS } from "../queries/projectQuery";

export default function ProjectCard({ project }) {
    // const [deleteProject] = useMutation(DELETE_PROJECT, {
    //     variables: { id: project.id },
    //     update(cache, { data: { deleteProject } }) {
    //         const { projects } = cache.readQuery({
    //             query: GET_PROJECTS,
    //             // Change the data in our cache by deleting target project
    //             data: {
    //                 projects: projects.filter(
    //                     (project) => project.id !== deleteProject.id
    //                 ),
    //             },
    //         });
    //     },
    // });

    return (
        <div className="flex justify-between items-center p-4 rounded-md shadow-md border-2 border-slate-100 w-[300px]">
            <header>
                <h3 className="text-xl font-semibold text-blue-600">
                    {project.name}
                </h3>
                <p className="text-slate-600 text-sm">Status: {project.status}</p>
            </header>

            <button className="btn btn--primary h-9">View</button>
        </div>
    );
}
