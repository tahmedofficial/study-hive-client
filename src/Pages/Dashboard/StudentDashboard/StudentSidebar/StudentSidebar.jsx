import { NavLink } from "react-router-dom";

const StudentSidebar = () => {
    return (
        <ul className="menu menu-md pt-5 bg-primary_bg_color rounded-xl w-56 min-h-screen">
            <li><NavLink to="/dashboard/bookedSession">Booked Session</NavLink></li>
            <li><NavLink to="/dashboard/createNote">Create Note</NavLink></li>
            <li><NavLink to="/dashboard/manageNotes">Manage Notes</NavLink></li>
            <li><NavLink to="/dashboard/viewStudyMaterials">Study Materials</NavLink></li>
            <div className="divider"></div>
            <li><NavLink to="/">Home</NavLink></li>
        </ul>
    );
};

export default StudentSidebar;