import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";

const UpdateModal = ({ onClose, id, refetch }) => {

    const modalRef = useRef();
    const { sweetMessage } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [note, setNote] = useState({});

    const closeModal = (event) => {
        if (modalRef.current === event.target) {
            onClose();
        }
    }

    useEffect(() => {
        axiosSecure.get(`/myNotes/${id}`)
            .then(res => {
                setNote(res.data);
            })
    }, [axiosSecure, id])

    const handleDelete = (event) => {
        event.preventDefault();
        const form = event.target;
        const title = form.title.value;
        const description = form.description.value;
        const updatedNote = { title, description };

        axiosSecure.patch(`/notes/${id}`, updatedNote)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    onClose();
                    sweetMessage("Successfully Updated");
                }
            })
    }

    return (
        <div ref={modalRef} onClick={closeModal} className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="mt-10 flex flex-col gap-5 text-gray-600">
                <button onClick={onClose} className="place-self-end text-2xl p-1 rounded-lg hover:bg-primary_color duration-300"><MdClose /></button>
                <div className="bg-white rounded-xl px-20 py-10 flex flex-col gap-5 items-center mx-4">
                    <h1 className="text-2xl md:text-3xl font-semibold">Share your experience</h1>
                    <form onSubmit={handleDelete} className="flex flex-col gap-3">
                        <input className="md:w-96 outline-none bg-gray-100 p-2 h-10 border-0 rounded-lg text-black" type="text" name="title" defaultValue={note.title} required />
                        <textarea className="md:w-96 outline-none bg-gray-100 p-2 h-20 border-0 rounded-lg text-black" name="description" defaultValue={note.description} required></textarea>
                        <button className="bg-primary_color px-10 py-2 mt-4 text-white rounded-lg hover:opacity-65 duration-300">Add</button>
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