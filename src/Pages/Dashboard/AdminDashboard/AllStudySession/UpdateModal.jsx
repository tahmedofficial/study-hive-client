import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";

const UpdateModal = ({ onClose, id, refetch }) => {

    const axiosSecure = useAxiosSecure();
    const [session, setSession] = useState({});
    const { reload, sweetMessage } = useAuth()

    useEffect(() => {
        axiosSecure.get(`/courses/${id}`)
            .then(res => {
                setSession(res.data);
            })
    }, [axiosSecure, id])

    const handleUpdate = (event) => {
        event.preventDefault();
        const form = event.target;
        const tutorName = form.tutorName.value;
        const tutorEmail = form.tutorEmail.value;
        const title = form.title.value;
        const description = form.description.value;
        const registrationStartDate = form.registrationStartDate.value;
        const registrationEndDate = form.registrationEndDate.value;
        const classStartTime = form.classStartTime.value;
        const classEndDate = form.classEndDate.value;
        const registrationFee = form.registrationFee.value;
        const duration = form.duration.value;

        const data = {
            tutorName,
            tutorEmail,
            title,
            description,
            registrationStartDate,
            registrationEndDate,
            classStartTime,
            classEndDate,
            registrationFee,
            duration
        }

        axiosSecure.patch(`/sessions/${id}`, data)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    reload();
                    onClose();
                    sweetMessage("Updated Successfully");
                }
            })
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="mt-10 flex flex-col gap-5 text-gray-600">
                <button onClick={onClose} className="place-self-end text-2xl p-1 rounded-lg hover:bg-primary_color duration-300"><MdClose /></button>
                <div className="bg-primary_bg_color rounded-xl px-20 py-10 flex flex-col gap-5 items-center mx-4">
                    <h1 className="text-2xl md:text-3xl font-semibold">Update Session Info</h1>
                    <form onSubmit={handleUpdate}>
                        <div className="flex flex-col lg:flex-row gap-5">
                            <div className="w-full">
                                <input name="tutorName" className="h-10 md:w-96 outline-none rounded-lg px-3 w-full bg-white" disabled type="text" defaultValue={session.tutorName} required />
                            </div>
                            <div className="w-full">
                                <input name="tutorEmail" className="h-10 md:w-96 outline-none rounded-lg px-3 w-full bg-white" disabled type="text" defaultValue={session.tutorEmail} required />
                            </div>
                        </div>
                        <div className="flex flex-col lg:flex-row gap-5 mt-5">
                            <div className="w-full">
                                <input name="title" className="h-10 md:w-96 outline-none rounded-lg px-3 w-full bg-white" type="text" defaultValue={session.title} required />
                            </div>
                            <div className="w-full">
                                <input name="description" className="h-10 md:w-96 outline-none rounded-lg px-3 w-full bg-white" type="text" defaultValue={session.description} required />
                            </div>
                        </div>
                        <div className="flex flex-col lg:flex-row gap-5 mt-5">
                            <div className="w-full">
                                <input name="registrationStartDate" className="h-10 md:w-96 outline-none rounded-lg px-3 w-full bg-white" type="text" defaultValue={session.registrationStartDate} required />
                            </div>
                            <div className="w-full">
                                <input name="registrationEndDate" className="h-10 md:w-96 outline-none rounded-lg px-3 w-full bg-white" type="text" defaultValue={session.registrationEndDate} required />
                            </div>
                        </div>
                        <div className="flex flex-col lg:flex-row gap-5 mt-5">
                            <div className="w-full">
                                <input name="classStartTime" className="h-10 md:w-96 outline-none rounded-lg px-3 w-full bg-white" type="text" defaultValue={session.classStartTime} required />
                            </div>
                            <div className="w-full">
                                <input name="classEndDate" className="h-10 md:w-96 outline-none rounded-lg px-3 w-full bg-white" type="text" defaultValue={session.classEndDate} required />
                            </div>
                        </div>
                        <div className="flex flex-col lg:flex-row gap-5 mt-5">
                            <div className="w-full">
                                <input name="duration" className="h-10 md:w-96 outline-none rounded-lg px-3 w-full bg-white" type="text" defaultValue={session.duration} required />
                            </div>
                            <div className="w-full">
                                <input name="registrationFee" className="h-10 md:w-96 outline-none rounded-lg px-3 w-full bg-white" type="text" defaultValue={session.registrationFee} required />
                            </div>
                        </div>
                        <button className="btn bg-primary_color text-white px-12 mt-6 flex mx-auto">Update</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateModal;

UpdateModal.propTypes = {
    onClose: PropTypes.func,
    id: PropTypes.string,
    refetch: PropTypes.func
}