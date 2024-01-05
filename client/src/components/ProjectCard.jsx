import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
    return (
        <div className="flex justify-between items-center p-4 rounded-md shadow-md border-2 border-slate-100 w-[300px]">
            <header>
                <h3 className="text-xl font-semibold text-blue-600">
                    {project.name}
                </h3>
                <p className="text-slate-600 text-sm">Status: {project.status}</p>
            </header>

            <Link to={`/project/${project.id}`} className="btn btn--primary h-9">View</Link>
        </div>
    );
}
