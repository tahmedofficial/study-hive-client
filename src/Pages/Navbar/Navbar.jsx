import { RiMenu2Fill } from "react-icons/ri";
import { NavLink } from "react-router-dom";

const Navbar = () => {

    return (
        <nav>
            <div className="navbar bg-base-100 md:w-5/6 mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <RiMenu2Fill className="h-5 w-5 text-black" />
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li><NavLink to="/">Home</NavLink></li>
                            <li><NavLink to="/login">Login</NavLink></li>
                            <li><NavLink to="/signUp">Sign Up</NavLink></li>
                        </ul>
                    </div>
                </div>
                <div className="navbar-center">
                    <h1 className="text-3xl font-semibold">Study<span className="text-rose-600">Hive</span></h1>
                </div>
                <div className="navbar-end">
                    <div className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="Profile" />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;