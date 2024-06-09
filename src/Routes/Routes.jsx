import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import AllSessions from "../Pages/AllSessions/AllSessions";
import SessionDetails from "../Components/SessionDetails/SessionDetails";
import PrivateRoute from "../Routes/PrivateRoute"
import Dashboard from "../Layout/Dashboard";
import BookedSession from "../Pages/Dashboard/StudentDashboard/BookedSession/BookedSession";
import CreateNote from "../Pages/Dashboard/StudentDashboard/CreateNote/CreateNote";
import ManageNotes from "../Pages/Dashboard/StudentDashboard/ManageNotes/ManageNotes";
import ViewStudyMaterials from "../Pages/Dashboard/StudentDashboard/ViewStudyMaterials/ViewStudyMaterials";
import CreateStudySession from "../Pages/Dashboard/TutorDashboard/CreateStudySession/CreateStudySession";
import ViewAllStudySessions from "../Pages/Dashboard/TutorDashboard/ViewAllStudySessions/ViewAllStudySessions";
import UploadMaterials from "../Pages/Dashboard/TutorDashboard/UploadMaterials/UploadMaterials";
import ViewAllMaterials from "../Pages/Dashboard/TutorDashboard/ViewAllMaterials/ViewAllMaterials";
import ViewAllUsers from "../Pages/Dashboard/AdminDashboard/ViewAllUsers/ViewAllUsers";
import AllStudySession from "../Pages/Dashboard/AdminDashboard/AllStudySession/AllStudySession";
import AllMaterials from "../Pages/Dashboard/AdminDashboard/AllMaterials/AllMaterials";
import AdminPrivateRoute from "./AdminPrivateRoute";
import TutorPrivateRoute from "./TutorPrivateRoute";
import PaymentPage from "../Pages/PaymentPage/PaymentPage";
import BookingDetails from "../Pages/Dashboard/StudentDashboard/BookedSession/BookingDetails";
import StudentMaterialsDetails from "../Pages/Dashboard/StudentDashboard/StudentMaterialsDetails/StudentMaterialsDetails";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/signUp",
                element: <SignUp></SignUp>
            },
            {
                path: "/allSessions",
                element: <AllSessions></AllSessions>
            },
            {
                path: "/sessionDetails/:id",
                element: <PrivateRoute><SessionDetails></SessionDetails></PrivateRoute>
            },
            {
                path: "/payment/:id",
                element: <PrivateRoute><PaymentPage></PaymentPage></PrivateRoute>
            }
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            // Student Routes
            {
                path: "bookedSession",
                element: <BookedSession></BookedSession>
            },
            {
                path: "bookingDetails/:id",
                element: <BookingDetails></BookingDetails>
            },
            {
                path: "createNote",
                element: <CreateNote></CreateNote>
            },
            {
                path: "manageNotes",
                element: <ManageNotes></ManageNotes>
            },
            {
                path: "viewStudyMaterials",
                element: <ViewStudyMaterials></ViewStudyMaterials>
            },
            {
                path: "materialsDetails/:id",
                element: <StudentMaterialsDetails></StudentMaterialsDetails>
            },
            // Tutor Routes
            {
                path: "createStudySession",
                element: <TutorPrivateRoute><CreateStudySession></CreateStudySession></TutorPrivateRoute>
            },
            {
                path: "viewAllStudySessions",
                element: <TutorPrivateRoute><ViewAllStudySessions></ViewAllStudySessions></TutorPrivateRoute>
            },
            {
                path: "uploadMaterials",
                element: <TutorPrivateRoute><UploadMaterials></UploadMaterials></TutorPrivateRoute>
            },
            {
                path: "viewAllMaterials",
                element: <TutorPrivateRoute><ViewAllMaterials></ViewAllMaterials></TutorPrivateRoute>
            },
            // Admin Routes
            {
                path: "viewAllUsers",
                element: <AdminPrivateRoute><ViewAllUsers></ViewAllUsers></AdminPrivateRoute>
            },
            {
                path: "allStudySession",
                element: <AdminPrivateRoute><AllStudySession></AllStudySession></AdminPrivateRoute>
            },
            {
                path: "allMaterials",
                element: <AdminPrivateRoute><AllMaterials></AllMaterials></AdminPrivateRoute>
            }
        ]
    }
]);

export default router;