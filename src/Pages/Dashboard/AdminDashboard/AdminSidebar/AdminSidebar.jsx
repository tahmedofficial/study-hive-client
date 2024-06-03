import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
    return (
        <ul className="menu menu-md pt-5 bg-primary_bg_color rounded-xl w-56 min-h-screen">
            <li><NavLink to="/dashboard/viewAllUsers">View All Users</NavLink></li>
            <li><NavLink to="/dashboard/allStudySession">All Study Session</NavLink></li>
            <li><NavLink to="/dashboard/allMaterials">All Materials</NavLink></li>
            <div className="divider"></div>
            <li><NavLink to="/">Home</NavLink></li>
        </ul>
    );
};

export default AdminSidebar;