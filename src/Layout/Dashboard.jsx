import { Outlet } from "react-router-dom";
import StudentSidebar from "../Pages/Dashboard/StudentDashboard/StudentSidebar/StudentSidebar";
import TutorSidebar from "../Pages/Dashboard/TutorDashboard/TutorSidebar/TutorSidebar";


const Dashboard = () => {

    return (
        <div className="flex gap-5">
            <div>
                <StudentSidebar></StudentSidebar>
                <TutorSidebar></TutorSidebar>
            </div>
            <div className="pt-5">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;