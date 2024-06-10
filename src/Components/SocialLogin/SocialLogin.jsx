import { FaGithub, FaGoogle } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useLocation, useNavigate } from "react-router-dom";

const SocialLogin = () => {

    const { setUser, loginWithGoogle, loginWithGithub, sweetMessage, errorMessage } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const location = useLocation();

    const handleGoogleLogin = () => {
        loginWithGoogle()
            .then(result => {
                setUser({ email: result?.user?.email });
                const user = {
                    name: result?.user?.displayName,
                    image: result?.user?.photoURL,
                    email: result?.user?.email,
                    role: "student"
                }
                axiosPublic.post("/users", user)
                    .then(res => {
                        if (res.data.insertedId) {
                            sweetMessage(`${result?.user?.displayName} your account created successfully`)
                            navigate(location?.state ? location.state : "/")
                            return
                        }
                        sweetMessage(`${result?.user?.displayName} your are login successfully`)
                        navigate(location?.state ? location.state : "/")
                    })
            })
            .catch(error => {
                if (error.code === "auth/account-exists-with-different-credential") {
                    errorMessage("Email address already exists")
                }
            })
    }

    const handleGithubLogin = () => {
        loginWithGithub()
            .then(result => {
                const user = {
                    name: result?.user?.displayName,
                    image: result?.user?.photoURL,
                    email: result?.user?.email,
                    role: "student"
                }
                axiosPublic.post("/users", user)
                    .then(res => {
                        if (res.data.insertedId) {
                            sweetMessage(`${result?.user?.displayName} your account created successfully`)
                            navigate(location?.state ? location.state : "/")
                            return
                        }
                        sweetMessage(`${result?.user?.displayName} your are login successfully`)
                        navigate(location?.state ? location.state : "/")
                    })
            })
            .catch(error => {
                if (error.code === "auth/account-exists-with-different-credential") {
                    errorMessage("Email address already exists")
                }
            })
    }

    return (
        <div>
            <div className="flex gap-4 justify-center my-3">
                <button onClick={handleGoogleLogin} className="btn btn-circle text-2xl bg-primary_color text-white"><FaGoogle /></button>
                <button onClick={handleGithubLogin} className="btn btn-circle text-2xl bg-primary_color text-white"><FaGithub /></button>
            </div>
        </div>
    );
};

export default SocialLogin;