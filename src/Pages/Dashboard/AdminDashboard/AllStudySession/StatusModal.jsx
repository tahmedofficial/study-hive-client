import PropTypes from "prop-types";
import { useRef } from "react";
import { MdClose } from "react-icons/md";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";

const StatusModal = ({ onClose, id, refetch }) => {

    const modalRef = useRef();
    const axiosSecure = useAxiosSecure();
    const { reload, sweetMessage } = useAuth();

    const closeModal = (event) => {
        if (modalRef.current === event.target) {
            onClose();
        }
    }

    const handleReject = (event) => {
        event.preventDefault();
        const form = event.target;
        const rejectReason = form.rejectReason.value;
        const data = {
            status: "rejected",
            rejectReason: rejectReason
        }
        console.log(data);
        axiosSecure.patch(`/courses/${id}`, data)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    reload();
                    onClose();
                    sweetMessage("Update Successfully")
                }
            })
    }
    console.log("inmodal Status", id);

    return (
        <div ref={modalRef} onClick={closeModal} className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="mt-10 flex flex-col gap-5 text-gray-600">
                <button onClick={onClose} className="place-self-end text-2xl p-1 rounded-lg hover:bg-primary_color duration-300"><MdClose /></button>
                <div className="bg-white rounded-xl px-20 py-10 flex flex-col gap-5 items-center mx-4">
                    <h1 className="text-2xl md:text-3xl font-semibold">Reject Reason</h1>
                    <form onSubmit={handleReject} className="flex flex-col gap-3">
                        <input className="h-10 bg-primary_bg_color outline-none px-3 rounded-lg" name="rejectReason" type="text" placeholder="Reject reason" />
                        <button className="bg-primary_color px-10 py-2 mt-4 text-white rounded-lg hover:opacity-65 duration-300">Reject</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default StatusModal;

StatusModal.propTypes = {
    onClose: PropTypes.func,
    id: PropTypes.string,
    refetch: PropTypes.func
}