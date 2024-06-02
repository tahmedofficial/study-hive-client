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
            }
        ]
    },
    {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: "bookedSession",
                element: <BookedSession></BookedSession>
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
            }
        ]
    }
]);

export default router;