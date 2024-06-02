import { Outlet } from "react-router-dom";
import StudentSidebar from "../Pages/Dashboard/StudentDashboard/StudentSidebar/StudentSidebar";


const Dashboard = () => {

    return (
        <div className="flex gap-5">
            <div>
                <StudentSidebar></StudentSidebar>
            </div>
            <div className="pt-5">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;