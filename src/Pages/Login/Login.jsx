import { Link } from "react-router-dom";

const Login = () => {

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
    }

    return (
        <div>
            <h1 className="font-semibold text-center text-black py-14 text-4xl">Login</h1>
            <form onSubmit={handleLogin} className="flex flex-col gap-5 bg-gray-100 mx-3  p-10 md:w-4/6 md:mx-auto md:px-28 md:py-20 lg:px-44 rounded-2xl">
                <div>
                    <h3 className="mb-2 text-black">Email</h3>
                    <input className="h-10 w-full outline-none pl-3 rounded-lg" type="email" name="email" placeholder="Enter Your Email" required />
                </div>
                <div>
                    <h3 className="mb-2 text-black">Password</h3>
                    <input className="h-10 w-full outline-none pl-3 rounded-lg" type="password" name="password" placeholder="Enter Your Password" required />
                </div>
                <button className="btn bg-black text-white text-lg">Login</button>
                <div className="flex items-center font-medium mx-auto">
                    <h3>Do not have account</h3>
                    <Link to="/signUp">
                        <h3 className=" btn btn-link">Sign Up</h3>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Login;