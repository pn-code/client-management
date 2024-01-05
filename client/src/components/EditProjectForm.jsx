import { useState } from "react";
import { useMutation } from "@apollo/client";

import { UPDATE_PROJECT } from "../mutations/projectMutations";
import { GET_PROJECT } from "../queries/projectQuery";

export default function EditProjectForm({ project }) {
    const [name, setName] = useState(project.name);
    const [description, setDescription] = useState(project.description);
    const [status, setStatus] = useState("");

    const [updateProject] = useMutation(UPDATE_PROJECT, {
        variables: { id: project.id, name, description, status },
        refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
        onCompleted: () => alert("Project has been updated!"),
    });

    const handleOnSubmit = (e) => {
        e.preventDefault();

        if (name === "" || description === "" || status === "") {
            return alert("All fields must be filled.");
        }

        updateProject(name, description, status);
    };

    return (
        <form
            onSubmit={handleOnSubmit}
            className="flex flex-col gap-2 w-full rounded-md mt-5"
        >
            <h2 className="text-2xl text-blue-600 font-bold">
                Edit Project Details
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

            <button type="submit" className="btn btn--primary w-full mt-5">
                Submit
            </button>
        </form>
    );
}
