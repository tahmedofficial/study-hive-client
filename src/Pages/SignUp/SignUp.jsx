import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";
import { updateProfile } from "firebase/auth";
import { useState } from "react";
import WaitModal from "../../Components/WaitModal/WaitModal";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";

const image_key = import.meta.env.VITE_imageKey;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_key}`;

const SignUp = () => {

    const { signUpUser, setUser, sweetMessage, errorMessage } = useAuth()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const axiosPublic = useAxiosPublic();
    const [isFinihs, setFinish] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (data) => {

        // validation
        if (data.password.length < 6) {
            return errorMessage("Password must be 6 characters");
        }

        setFinish(true);
        const imageFile = { image: data.photo[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: { "content-type": "multipart/form-data" }
        })

        if (res.data.success) {

            signUpUser(data?.email, data?.password)
                .then(result => {
                    updateProfile(result.user, {
                        displayName: data?.name,
                        photoURL: res?.data?.data?.display_url,
                    })
                        .then(() => {
                            setUser({
                                email: data?.email,
                                displayName: data?.name,
                                photoURL: res?.data?.data?.display_url
                            })
                            const user = {
                                name: data?.name,
                                email: data?.email,
                                image: res?.data?.data?.display_url,
                                role: data?.role
                            }
                            axiosPublic.post("/users", user)
                                .then(response => {
                                    console.log(response.data);
                                    if (response.data.insertedId) {
                                        setFinish(false);
                                        sweetMessage(`${data?.name} your account created successfully`)
                                        navigate("/")
                                    }
                                })
                        })
                        .catch(() => setFinish(false))
                })
                .catch(error => {
                    setFinish(false);
                    if (error.code === "auth/email-already-in-use") {
                        errorMessage("Email address already in use")
                    }
                    const errorMessage = error.message;
                    console.log(errorMessage);
                })
        }
    }

    return (
        <div>
            <h1 className="font-semibold text-center text-black py-14 text-4xl">Sign Up</h1>
            <div className="bg-gray-100 mx-3  p-10 md:w-4/6 md:mx-auto md:px-28 md:py-20 lg:px-44 rounded-2xl">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                    <div>
                        <h3 className="mb-2 text-black">Name</h3>
                        <input {...register("name", { required: true })} className="h-10 w-full outline-none pl-3 rounded-lg" type="text" placeholder="Enter Your Name" />
                        {errors.name && <span className="text-red-600">This field is required</span>}
                    </div>
                    <div>
                        <h3 className="mb-2 text-black">Email</h3>
                        <input {...register("email", { required: true })} className="h-10 w-full outline-none pl-3 rounded-lg" type="email" placeholder="Enter Your Email" />
                        {errors.email && <span className="text-red-600">This field is required</span>}
                    </div>
                    <div>
                        <h3 className="mb-2 text-black">User Role</h3>
                        <select {...register("role", { required: true })} className="h-10 w-full outline-none pl-3 rounded-lg" defaultValue="student" >
                            <option value="student" >student</option>
                            <option>tutor</option>
                            <option>admin</option>
                        </select>
                        {errors.role && <span className="text-red-600">This field is required</span>}
                    </div>
                    <div>
                        <h3 className="mb-2 text-black">Password</h3>
                        <input {...register("password", { required: true })} className="h-10 w-full outline-none pl-3 rounded-lg" type="password" placeholder="Enter Your Password" />
                        {errors.password && <span className="text-red-600">This field is required</span>}
                    </div>
                    <div>
                        <h3 className="mb-2 text-black">Profile Picture</h3>
                        <input {...register("photo", { required: true })} className="file-input w-72 h-10" type="file" /> <br />
                        {errors.photo && <span className="text-red-600">This field is required</span>}
                    </div>
                    <button className="btn bg-primary_color text-white text-lg">Sign Up</button>
                </form>
                <div className="flex items-center font-medium mx-auto justify-center">
                    <h3>Already Sign Up</h3>
                    <Link to="/login">
                        <h3 className=" btn btn-link">Login</h3>
                    </Link>
                </div>
                <SocialLogin></SocialLogin>
            </div>
            <div>
                {isFinihs ? <WaitModal message="Account is creating"></WaitModal> : undefined}
            </div>
        </div>
    );
};

export default SignUp;