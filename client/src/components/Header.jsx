import React from "react";
import Logo from "../assets/react.svg";

export default function Header() {
    return (
        <nav className="p-2 bg-slate-100">
            <div>
                <a className="flex gap-4 items-center" href="/">
                    <img src={Logo} alt="Client Management" />
                    <div className="text-lg font-semibold text-blue-500">Client Management</div>
                </a>
            </div>
        </nav>
    );
}
