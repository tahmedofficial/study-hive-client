import { useForm } from "react-hook-form";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import WaitModal from "../../../../Components/WaitModal/WaitModal";
import { useState } from "react";

const image_key = import.meta.env.VITE_imageKey;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_key}`;

const CreateStudySession = () => {

    const { user, sweetMessage } = useAuth();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const [isFinish, setFinish] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = async (data) => {

        setFinish(true);

        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: { "content-type": "multipart/form-data" }
        })

        if (res?.data?.success) {

            const sessionData = {
                tutorName: user?.displayName,
                tutorEmail: user?.email,
                registrationFee: 0,
                status: "pending",
                image: res?.data?.data?.display_url,
                title: data.title,
                duration: data.duration,
                description: data.description,
                registrationStartDate: data.registrationStartDate,
                registrationEndDate: data.registrationEndDate,
                classStartTime: data.classStartTime,
                classEndDate: data.classEndDate
            }

            const responce = await axiosSecure.post("/courses", sessionData);
            if (responce?.data?.insertedId) {
                reset();
                setFinish(false);
                sweetMessage("Added Successfully");
            }

        }
        setFinish(false);
    }


    return (
        <div className="md:w-4/6 mx-auto">
            <h1 className="text-center font-semibold my-10 text-3xl lg:text-4xl">Create Study Session</h1>
            <div className="bg-gray-100 px-10 py-5 lg:px-20 lg:py-10 rounded-lg">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col lg:flex-row gap-5">
                        <div className="w-full">
                            <h3 className="mb-2 ml-2">Tutor Name</h3>
                            <input {...register("tutorName")} className="h-10 outline-none rounded-lg px-3 w-full bg-white" disabled type="text" defaultValue={user?.displayName} />
                        </div>
                        <div className="w-full">
                            <h3 className="mb-2 ml-2">Tutor Email</h3>
                            <input {...register("tutorEmail")} className="h-10 outline-none rounded-lg px-3 w-full bg-white" disabled type="text" defaultValue={user?.email} />
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-5 mt-5">
                        <div className="w-full">
                            <h3 className="mb-2 ml-2">Title</h3>
                            <input {...register("title", { required: true })} className="h-10 outline-none rounded-lg px-3 w-full bg-white" type="text" placeholder="Title" />
                            {errors.title && <span className="text-red-600">This field is required</span>}
                        </div>
                        <div className="w-full">
                            <h3 className="mb-2 ml-2">Description</h3>
                            <input {...register("description", { required: true })} className="h-10 outline-none rounded-lg px-3 w-full bg-white" type="text" placeholder="Description" />
                            {errors.description && <span className="text-red-600">This field is required</span>}
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-5 mt-5">
                        <div className="w-full">
                            <h3 className="mb-2 ml-2">Registration Start Date</h3>
                            <input {...register("registrationStartDate", { required: true })} className="h-10 outline-none rounded-lg px-3 w-full bg-white" type="text" placeholder="mm/dd/yy" />
                            {errors.registrationStartDate && <span className="text-red-600">This field is required</span>}
                        </div>
                        <div className="w-full">
                            <h3 className="mb-2 ml-2">Registration End Date</h3>
                            <input {...register("registrationEndDate", { required: true })} className="h-10 outline-none rounded-lg px-3 w-full bg-white" type="text" placeholder="mm/dd/yy" />
                            {errors.registrationEndDate && <span className="text-red-600">This field is required</span>}
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-5 mt-5">
                        <div className="w-full">
                            <h3 className="mb-2 ml-2">Class Start Date</h3>
                            <input {...register("classStartTime", { required: true })} className="h-10 outline-none rounded-lg px-3 w-full bg-white" type="text" placeholder="mm/dd/yy" />
                            {errors.classStartTime && <span className="text-red-600">This field is required</span>}
                        </div>
                        <div className="w-full">
                            <h3 className="mb-2 ml-2">Class End Date</h3>
                            <input {...register("classEndDate", { required: true })} className="h-10 outline-none rounded-lg px-3 w-full bg-white" type="text" placeholder="mm/dd/yy" />
                            {errors.classEndDate && <span className="text-red-600">This field is required</span>}
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-5 mt-5">
                        <div className="w-full">
                            <h3 className="mb-2 ml-2">Duration</h3>
                            <input {...register("duration", { required: true })} className="h-10 outline-none rounded-lg px-3 w-full bg-white" type="text" placeholder="Duration" />
                            {errors.duration && <span className="text-red-600">This field is required</span>}
                        </div>
                        <div className="w-full">
                            <h3 className="mb-2 ml-2">Registration Fee</h3>
                            <input {...register("registrationFee")} className="h-10 outline-none rounded-lg px-3 w-full bg-white" disabled type="text" defaultValue={0} />
                        </div>
                    </div>
                    <div>
                        <input {...register("image", { required: true })} type="file" className="file-input mt-5 w-full max-w-xs" />
                        {errors.image && <span className="text-red-600">This field is required</span>}
                    </div>
                    <button className="btn bg-primary_color text-white px-12 mt-6 flex mx-auto">Add</button>
                </form>
            </div>
            <div>
                {isFinish ? <WaitModal message={"Please Wait"}></WaitModal> : undefined}
            </div>
        </div>
    );
};

export default CreateStudySession;