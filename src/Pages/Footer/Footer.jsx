import { FaFacebookF, FaInstagram, FaLinkedin, FaPhone, FaTwitter } from "react-icons/fa";
import { FaArrowRightLong, FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Footer = () => {
    return (
        <div className="bg-secondary_color py-24 mt-24">
            <footer className="footer md:w-5/6 mx-auto px-10">
                <div>
                    <h1 className="font-semibold text-xl text-white">Services</h1>
                    <h3 className="text-white">Trip Advisor</h3>
                    <h3 className="text-white">Airbnb</h3>
                    <h3 className="text-white">Booking</h3>
                    <h3 className="text-white">Hotwire</h3>
                </div>
                <div>
                    <h1 className="font-semibold text-xl text-white">Company</h1>
                    <h3 className="text-white">About us</h3>
                    <h3 className="text-white">Orbitz</h3>
                    <h3 className="text-white">Jobs</h3>
                    <h3 className="text-white">Priceline</h3>
                </div>
                <div>
                    <h1 className="font-semibold text-xl text-white">Address</h1>
                    <h3 className="text-white flex items-center gap-2">
                        <FaLocationDot />
                        <span>123 Main Street, New York, NY 10001, USA</span>
                    </h3>
                    <h3 className="text-white flex items-center gap-2">
                        <FaPhone />
                        <span>+990 3647685623</span>
                    </h3>
                    <h3 className="text-white flex items-center gap-2">
                        <MdEmail />
                        <span>studyhive@gmail.com</span>
                    </h3>
                </div>
                <div className="w-full">
                    <h1 className="font-semibold text-xl text-white">Newsletter</h1>
                    <div className="join w-full">
                        <input className="join-item outline-none px-2 bg-white w-full md:w-2/3" type="text" placeholder="username@site.com" />
                        <button className="join-item btn bg-primary_color text-white text-lg border-0">
                            <FaArrowRightLong />
                        </button>
                    </div>
                    <h1 className="text-xl font-semibold text-white mt-5">Follow us on</h1>
                    <div className="flex gap-4 text-xl text-white">
                        <div className="border border-white hover:text-primary_color hover:border-primary_color duration-300 rounded-full p-2">
                            <FaFacebookF />
                        </div>
                        <div className="border border-white hover:text-primary_color hover:border-primary_color duration-300 rounded-full p-2">
                            <FaTwitter />
                        </div>
                        <div className="border border-white hover:text-primary_color hover:border-primary_color duration-300 rounded-full p-2">
                            <FaInstagram />
                        </div>
                        <div className="border border-white hover:text-primary_color hover:border-primary_color duration-300 rounded-full p-2">
                            <FaLinkedin />
                        </div>
                    </div>
                </div>
            </footer>
            <div className="border-t border-white mt-16">
                <h3 className="text-white text-center mt-8">Copyright © 2024 - All right reserved by Study Hive Company Ltd</h3>
            </div>
        </div>
    );
};

export default Footer;