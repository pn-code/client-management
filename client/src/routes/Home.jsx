import AddClientModal from "../components/AddClientModal";
import AddProjectModal from "../components/AddProjectModal";
import Projects from "../components/Projects";
import Clients from "../components/Clients";

export default function Home() {
    return (
        <>
            <div className="flex gap-2">
                <AddClientModal />
                <AddProjectModal />
            </div>

            <Projects />
            <Clients />
        </>
    );
}
