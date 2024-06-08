import PropTypes from "prop-types";
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import { MdClose } from "react-icons/md";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import { useState } from "react";
import useAuth from "../../../../Hooks/useAuth";
import WaitModal from "../../../../Components/WaitModal/WaitModal";

const image_key = import.meta.env.VITE_imageKey;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_key}`;

const MaterialsUpdateModal = ({ onClose, material, id, refetch }) => {

    const { sweetMessage } = useAuth();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const [updating, setUpdating] = useState(false);
    const { register, handleSubmit, reset } = useForm()

    const onSubmit = async (data) => {

        if (data.image.length) {
            setUpdating(true);
            const imageFile = { image: data.image[0] }
            const res = await axiosPublic.post(image_hosting_api, imageFile, {
                headers: { "content-type": "multipart/form-data" }
            })

            if (res.data.success) {

                const materialData = {
                    image: res?.data?.data?.display_url,
                    title: data?.title,
                    material: data?.material
                }

                axiosSecure.patch(`/materials/${id}`, materialData)
                    .then(response => {
                        if (response.data.modifiedCount > 0) {
                            reset();
                            refetch();
                            onClose();
                            setUpdating(false);
                            sweetMessage("Material Updated Successfully");
                        }
                    })
            }
            setUpdating(false);
        }
        else {

            const materialData = {
                image: material?.image,
                title: data?.title,
                material: data?.material
            }

            axiosSecure.patch(`/materials/${id}`, materialData)
                .then(response => {
                    if (response.data.modifiedCount > 0) {
                        reset();
                        refetch();
                        onClose();
                        sweetMessage("Material Updated Successfully");
                    }
                })
        }

    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="mt-10 flex flex-col gap-5 text-gray-600">
                <button onClick={onClose} className="place-self-end text-2xl p-1 rounded-lg hover:bg-primary_color duration-300"><MdClose /></button>
                <div className="bg-primary_bg_color rounded-xl px-20 py-10 flex flex-col gap-5 items-center mx-4">
                    <h1 className="text-2xl md:text-3xl font-semibold">Update Materials</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <div className="w-full">
                                <h3 className="mb-2 ml-2">Title</h3>
                                <input {...register("title")} className="h-10 md:w-96 outline-none rounded-lg px-3 w-full bg-white" type="text" defaultValue={material.title} />
                            </div>
                            <div className="w-full mt-5">
                                <h3 className="mb-2 ml-2">Material Google Drive link</h3>
                                <input {...register("material")} className="h-10 md:w-96 outline-none rounded-lg px-3 w-full bg-white" type="text" defaultValue={material?.material} />
                            </div>
                        </div>
                        <div>
                            <input {...register("image")} className="file-input w-72 h-10 mt-5" type="file" />
                        </div>
                        <button className="btn bg-primary_color text-white px-12 mt-6 flex mx-auto">Update</button>
                    </form>
                </div>
            </div>
            <div>
                {
                    updating ? <WaitModal message="Material Updating"></WaitModal> : undefined
                }
            </div>
        </div>
    );
};

export default MaterialsUpdateModal;

MaterialsUpdateModal.propTypes = {
    onClose: PropTypes.func,
    refetch: PropTypes.func,
    material: PropTypes.object,
    id: PropTypes.string
}