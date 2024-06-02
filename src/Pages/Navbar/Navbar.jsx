import { RiMenu2Fill } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const Navbar = () => {

    const { user, logOutUser, sweetMessage } = useAuth();

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
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <RiMenu2Fill className="h-5 w-5 text-black" />
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li><NavLink to="/">Home</NavLink></li>
                            <li><NavLink to="/allSessions">All Sessions</NavLink></li>
                            <li><NavLink to="/login">Login</NavLink></li>
                            <li><NavLink to="/signUp">Sign Up</NavLink></li>
                        </ul>
                    </div>
                    <h1 className="text-3xl font-semibold lg:hidden">Study<span className="text-rose-600">Hive</span></h1>
                </div>
                <div className="navbar-center">
                    <h1 className="text-3xl font-semibold hidden lg:block">Study<span className="text-rose-600">Hive</span></h1>
                </div>
                <div className="navbar-end">
                    <button className="btn bg-primary_color mx-2 text-white">Dashboard</button>
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