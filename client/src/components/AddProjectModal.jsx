import { useState } from "react";
import { FaBacon } from "react-icons/fa";
import { useQuery, useMutation } from "@apollo/client";

import { GET_CLIENTS } from "../queries/clientQuery";
import { GET_PROJECTS } from "../queries/projectQuery";
import { ADD_PROJECT } from "../mutations/projectMutations";

export default function AddProjectModal() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("new");
    const [clientId, setClientId] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const { data, error, loading } = useQuery(GET_CLIENTS);
    
    const [addProject] = useMutation(ADD_PROJECT, {
        variables: { name, description, status, clientId },
        update(cache, { data: { addProject } }) {
            const { projects } = cache.readQuery({
                query: GET_PROJECTS,
            });

            cache.writeQuery({
                query: GET_PROJECTS,
                data: { projects: [...projects, addProject] },
            });
        },
    });

    const handleOpen = () => {
        setIsOpen((prev) => !prev);
    };

    const clearInputs = () => {
        setName("");
        setDescription("");
        setStatus("");
        setClientId("");
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        
        if (name === "" || description === "" || clientId === "") {
            return alert(
                "Name, description, and client fields must be filled."
            );
        }

        addProject(name, description, status, clientId);
        clearInputs();
        setIsOpen(false);
    };

    if (loading) return null;
    if (error) return <p>Something went wrong!</p>;

    return (
        <>
            <button
                onClick={handleOpen}
                className="btn btn--primary flex gap-2 items-center"
            >
                <FaBacon />
                <div>Add Project</div>
            </button>

            {isOpen && (
                <div className="w-full h-screen absolute top-0 left-0 center bg-black/90">
                    <form
                        onSubmit={handleOnSubmit}
                        className="flex flex-col gap-2 bg-slate-50 w-full sm:max-w-[300px] py-4 px-8 rounded-md"
                    >
                        <h2 className="text-2xl text-blue-600 font-bold">
                            Add New Project
                        </h2>

                        <div className="flex flex-col gap-1 font-semibold">
                            <label htmlFor="name">Name: </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Project Name"
                            />
                        </div>

                        <div className="flex flex-col gap-1 font-semibold">
                            <label htmlFor="description">Description: </label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Project Description"
                            />
                        </div>

                        <div className="flex flex-col gap-1 font-semibold">
                            <label htmlFor="email">Status: </label>

                            <select
                                id="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option defaultValue value="new">
                                    Not Started
                                </option>
                                <option value="progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-1 font-semibold">
                            <label htmlFor="clientId">Client: </label>
                            <select
                                id="clientId"
                                value={clientId}
                                onChange={(e) => setClientId(e.target.value)}
                            >
                                <option value="">Select Client</option>
                                {data.clients.map((client) => (
                                    <option key={client.id} value={client.id}>
                                        {client.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex mt-5 gap-4">
                            <button
                                type="button"
                                onClick={handleOpen}
                                className="btn btn--secondary w-full"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn btn--primary w-full"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}
