import { useState } from "react";
import { FaBacon } from "react-icons/fa";
import { useMutation } from "@apollo/client";

export default function AddProjectModal() {
    const [name, setName] = useState("");
    const [status, setStatus] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen((prev) => !prev);
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
    };

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
                        className="flex flex-col gap-2"
                    >
                        <h2 className="text-2xl text-blue-600 font-bold">
                            Add New Project
                        </h2>
                        <div className="flex flex-col gap-1 text-white font-semibold">
                            <label htmlFor="name">Name: </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-1 text-white font-semibold">
                            <label htmlFor="email">Status: </label>
                            <input
                                type="status"
                                id="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            />
                        </div>

                        <div className="flex mt-2 gap-4">
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
