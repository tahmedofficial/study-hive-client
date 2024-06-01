import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../Pages/Footer/Footer";

const Main = () => {

    return (
        <div className="font-manrope">
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
            <ToastContainer />
        </div>
    );
};

export default Main;