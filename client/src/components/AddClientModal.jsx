import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useMutation } from "@apollo/client";

import { ADD_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQuery";

export default function AddClientModal() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const [addClient] = useMutation(ADD_CLIENT, {
        variables: { name, email, phone },
        update(cache, { data: { addClient } }) {
            // Get clients from existing query
            const { clients } = cache.readQuery({
                query: GET_CLIENTS,
            });

            cache.writeQuery({
                query: GET_CLIENTS,
                data: { clients: [...clients, addClient] },
            });
        },
    });

    const handleOpen = () => {
        setIsOpen((prev) => !prev);
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        if (name === "" || email === "" || phone === "") {
            return alert("All fields must be filled.");
        }

        addClient(name, email, phone);
        setIsOpen((prev) => !prev);
        setName("");
        setEmail("");
        setPhone("");
    };

    return (
        <>
            <button
                onClick={handleOpen}
                className="btn btn--primary flex gap-2 items-center"
            >
                <FaUser />
                <div>Add Client</div>
            </button>

            {isOpen && (
                <div className="w-full h-screen absolute top-0 left-0 center bg-black/90">
                    <form
                        onSubmit={handleOnSubmit}
                        className="flex flex-col gap-2 bg-slate-50 w-full sm:max-w-[300px] py-4 px-8 rounded-md"
                    >
                        <h2 className="text-2xl font-bold border-b-2 border-slate-300">
                            Add New Client
                        </h2>
                        <div className="flex flex-col gap-1 font-semibold">
                            <label htmlFor="name">Name: </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Client Name"
                            />
                        </div>
                        <div className="flex flex-col gap-1 font-semibold">
                            <label htmlFor="email">Email: </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Client Email"
                            />
                        </div>
                        <div className="flex flex-col gap-1 font-semibold">
                            <label htmlFor="name">Phone: </label>
                            <input
                                type="text"
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Client Phone Number"
                            />
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
