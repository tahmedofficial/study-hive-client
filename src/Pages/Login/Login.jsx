import { Link, useLocation, useNavigate } from "react-router-dom";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";
import useAuth from "../../Hooks/useAuth";

const Login = () => {

    const { loginUser, sweetMessage, errorMessage } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        loginUser(email, password)
            .then(result => {
                sweetMessage(`${result?.user?.displayName} your are login successfully`)
                navigate(location?.state ? location.state : "/")
            })
            .catch(() => {
                errorMessage("Incorrect email or password")
            })
    }

    return (
        <div>
            <h1 className="font-semibold text-center text-black py-14 text-4xl">Login</h1>
            <div className="bg-gray-100 mx-3  p-10 md:w-4/6 md:mx-auto md:px-28 md:py-20 lg:px-44 rounded-2xl">
                <form onSubmit={handleLogin} className="flex flex-col gap-5">
                    <div>
                        <h3 className="mb-2 text-black">Email</h3>
                        <input className="h-10 w-full outline-none pl-3 rounded-lg" type="email" name="email" placeholder="Enter Your Email" required />
                    </div>
                    <div>
                        <h3 className="mb-2 text-black">Password</h3>
                        <input className="h-10 w-full outline-none pl-3 rounded-lg" type="password" name="password" placeholder="Enter Your Password" required />
                    </div>
                    <button className="btn bg-primary_color text-white text-lg">Login</button>
                </form>
                <div className="flex items-center font-medium mx-auto justify-center">
                    <h3>Do not have account</h3>
                    <Link to="/signUp">
                        <h3 className=" btn btn-link">Sign Up</h3>
                    </Link>
                </div>
                <SocialLogin></SocialLogin>
            </div>
        </div>
    );
};

export default Login;