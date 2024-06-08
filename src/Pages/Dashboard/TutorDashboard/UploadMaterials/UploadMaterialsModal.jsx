import PropTypes from "prop-types";
import { MdClose } from "react-icons/md";
import useAuth from "../../../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const image_key = import.meta.env.VITE_imageKey;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_key}`;



// https://drive.google.com/uc?export=download&id=1b4Q9RU67RRMtBFiZ95Itq81fz4JK9Mec
// https://drive.google.com/uc?id=1b4Q9RU67RRMtBFiZ95Itq81fz4JK9Mec
// https://drive.google.com/file/d/1b4Q9RU67RRMtBFiZ95Itq81fz4JK9Mec/view?usp=sharing


const UploadMaterialsModal = ({ onClose, id, uploding }) => {

    const { user, sweetMessage } = useAuth();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, formState: { errors }, reset } = useForm()


    const onSubmit = async (data) => {

        uploding(true);

        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: { "content-type": "multipart/form-data" }
        })

        if (res.data.success) {

            const materialData = {
                sessionId: id,
                tutorEmail: user?.email,
                image: res?.data?.data?.display_url,
                title: data?.title,
                material: data?.material
            }

            axiosSecure.post("/materials", materialData)
                .then(response => {
                    if (response.data.insertedId) {
                        reset();
                        onClose();
                        uploding(false);
                        sweetMessage("Material Uploaded Successfully");
                    }
                })

        }
        uploding(false);
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="mt-10 flex flex-col gap-5 text-gray-600">
                <button onClick={onClose} className="place-self-end text-2xl p-1 rounded-lg hover:bg-primary_color duration-300"><MdClose /></button>
                <div className="bg-primary_bg_color rounded-xl px-20 py-10 flex flex-col gap-5 items-center mx-4">
                    <h1 className="text-2xl md:text-3xl font-semibold">Upload Materials</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col lg:flex-row gap-5">
                            <div className="w-full">
                                <input name="tutorName" className="h-10 md:w-96 outline-none rounded-lg px-3 w-full bg-white" disabled type="text" defaultValue={user?.email} />
                            </div>
                            <div className="w-full">
                                <input name="tutorEmail" className="h-10 md:w-96 outline-none rounded-lg px-3 w-full bg-white" disabled type="text" defaultValue={id} />
                            </div>
                        </div>
                        <div className="flex flex-col lg:flex-row gap-5 mt-5">
                            <div className="w-full">
                                <input {...register("title", { required: true })} className="h-10 md:w-96 outline-none rounded-lg px-3 w-full bg-white" type="text" placeholder="Title" />
                                <br />
                                {errors.title && <span className="text-red-600">This field is required</span>}
                            </div>
                            <div className="w-full">
                                <input {...register("material", { required: true })} className="h-10 md:w-96 outline-none rounded-lg px-3 w-full bg-white" type="text" placeholder="Material Google Drive link" />
                                <br />
                                {errors.material && <span className="text-red-600">This field is required</span>}
                            </div>
                        </div>
                        <div>
                            <input {...register("image", { required: true })} className="file-input w-72 h-10 mt-5" type="file" /> <br />
                            <br />
                            {errors.image && <span className="text-red-600">This field is required</span>}
                        </div>
                        <button className="btn bg-primary_color text-white px-12 mt-6 flex mx-auto">Upload</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UploadMaterialsModal;

UploadMaterialsModal.propTypes = {
    onClose: PropTypes.func,
    id: PropTypes.string,
    uploding: PropTypes.func
}