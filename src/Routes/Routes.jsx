import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import AllSessions from "../Pages/AllSessions/AllSessions";
import SessionDetails from "../Components/SessionDetails/SessionDetails";


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
                element: <SessionDetails></SessionDetails>
            }
        ]
    },
]);

export default router;