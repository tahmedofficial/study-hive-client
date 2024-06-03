import { NavLink } from "react-router-dom";

const TutorSidebar = () => {
    return (
        <ul className="menu menu-md pt-5 bg-primary_bg_color rounded-xl w-56 min-h-screen">
            <li><NavLink to="/dashboard/createStudySession">Create Study Session</NavLink></li>
            <li><NavLink to="/dashboard/viewAllStudySessions">View All Study Sessions</NavLink></li>
            <li><NavLink to="/dashboard/uploadMaterials">Upload Materials</NavLink></li>
            <li><NavLink to="/dashboard/viewAllMaterials">View All Materials</NavLink></li>
            <li><NavLink to="/dashboard/viewAllNotes">View All Notes</NavLink></li>
            <div className="divider"></div>
            <li><NavLink to="/">Home</NavLink></li>
        </ul>
    );
};

export default TutorSidebar;