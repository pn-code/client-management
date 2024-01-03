import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useMutation } from "@apollo/client";

export default function AddClientModal() {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen((prev) => !prev);
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
                    <button onClick={handleOpen} className="btn btn--secondary">Cancel</button>
                </div>
            )}
        </>
    );
}
