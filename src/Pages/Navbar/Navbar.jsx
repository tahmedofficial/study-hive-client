import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAdmin from "../../Hooks/useAdmin";
import useTutor from "../../Hooks/useTutor";

const Navbar = () => {

    const { user, logOutUser, sweetMessage } = useAuth();
    const [isAdmin] = useAdmin();
    const [isTutor] = useTutor();

    const handleLogOut = () => {
        logOutUser()
            .then(() => {
                sweetMessage("Log Out Successfully")
            })
    }

    return (
        <nav className="bg-primary_bg_color">
            <div className="navbar md:w-5/6 mx-auto">
                <div className="navbar-start">
                    <div>
                        {
                            isAdmin?.admin ?
                                <Link to="/dashboard/viewAllUsers">
                                    <button className="btn bg-primary_color mx-2 text-white">Dashboard</button>
                                </Link> :
                                <>
                                    {
                                        isTutor?.tutor ?
                                            <Link to="/dashboard/createStudySession">
                                                <button className="btn bg-primary_color mx-2 text-white">Dashboard</button>
                                            </Link> :
                                            <Link to="/dashboard/bookedSession">
                                                <button className="btn bg-primary_color mx-2 text-white">Dashboard</button>
                                            </Link>
                                    }
                                </>
                        }
                    </div>
                </div>
                <div className="navbar-center">
                    <h1 className="text-3xl font-semibold">Study<span className="text-rose-600">Hive</span></h1>
                </div>
                <div className="navbar-end">
                    <div className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src={user ? user?.photoURL : undefined} alt="Profile" />
                        </div>
                    </div>
                    <div className="ml-3">
                        {user ?
                            <button onClick={handleLogOut} className="btn bg-primary_color text-white">Log Out</button> :
                            <Link to="/login">
                                <button className="btn bg-primary_color text-white">Login</button>
                            </Link>
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;