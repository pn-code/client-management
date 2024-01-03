import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="full-screen center flex-col">
            <FaExclamationTriangle color="#cf2102" size={100} />
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p className="text-slate-600 mb-4">
                Sorry, this page does not exist
            </p>
            <Link className="btn btn--primary" to="/">
                Return Home
            </Link>
        </div>
    );
}
