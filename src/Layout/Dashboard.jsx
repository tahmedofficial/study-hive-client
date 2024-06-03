import { Outlet } from "react-router-dom";
import StudentSidebar from "../Pages/Dashboard/StudentDashboard/StudentSidebar/StudentSidebar";
import TutorSidebar from "../Pages/Dashboard/TutorDashboard/TutorSidebar/TutorSidebar";
import AdminSidebar from "../Pages/Dashboard/AdminDashboard/AdminSidebar/AdminSidebar";
import useAdmin from "../Hooks/useAdmin";
import useTutor from "../Hooks/useTutor";


const Dashboard = () => {

    const [isAdmin] = useAdmin();
    const [isTutor] = useTutor();

    return (
        <div className="flex gap-5">
            <div>
                {
                    isAdmin?.admin ? <AdminSidebar></AdminSidebar> :
                        <>
                            {
                                isTutor?.tutor ? <TutorSidebar></TutorSidebar> :
                                    <StudentSidebar></StudentSidebar>
                            }
                        </>
                }

            </div>
            <div className="pt-5">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;