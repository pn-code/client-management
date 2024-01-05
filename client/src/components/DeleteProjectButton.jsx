import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

import { GET_PROJECTS } from "../queries/projectQuery";
import { DELETE_PROJECT } from "../mutations/projectMutations";

export default function DeleteProjectButton({ projectId }) {
    const navigate = useNavigate();

    const [deleteProject] = useMutation(DELETE_PROJECT, {
        variables: { id: projectId },
        onCompleted: () => navigate("/"),
        refetchQueries: [{ query: GET_PROJECTS }],
    });

    return (
        <button
            className="btn btn--danger h-9 flex gap-1.5 items-center"
            onClick={deleteProject}
            type="button"
        >
            <FaTrash /> Delete
        </button>
    );
}
