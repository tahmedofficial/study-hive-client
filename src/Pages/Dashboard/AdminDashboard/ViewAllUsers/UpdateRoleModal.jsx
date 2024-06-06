import PropTypes from "prop-types";
import { useRef } from "react";
import { MdClose } from "react-icons/md";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";


const UpdateRoleModal = ({ onClose, id, refetch }) => {

    const { sweetMessage } = useAuth();
    const modalRef = useRef();
    const axiosSecure = useAxiosSecure();

    const closeModal = (event) => {
        if (modalRef.current === event.target) {
            onClose();
        }
    }
    const handleUpdate = (event) => {
        event.preventDefault();
        const role = event.target.role.value;
        console.log({ role });
        axiosSecure.patch(`/users/${id}`, { role })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    onClose();
                    sweetMessage("Successfully Updated")
                    console.log(res.data);
                }
            })
    }

    return (
        <div ref={modalRef} onClick={closeModal} className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="mt-10 flex flex-col gap-5 text-gray-600">
                <button onClick={onClose} className="place-self-end text-2xl p-1 rounded-lg hover:bg-primary_color duration-300"><MdClose /></button>
                <div className="bg-white rounded-xl px-20 py-10 flex flex-col gap-5 items-center mx-4">
                    <h1 className="text-2xl md:text-3xl font-semibold">Update user role</h1>
                    <form onSubmit={handleUpdate} className="flex flex-col gap-3">
                        <select name="role" className="h-10 bg-primary_bg_color px-3 rounded-lg outline-none">
                            <option>student</option>
                            <option>admin</option>
                            <option>tutor</option>
                        </select>
                        <button className="bg-primary_color px-10 py-2 mt-4 text-white rounded-lg hover:opacity-65 duration-300">Update</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateRoleModal;

UpdateRoleModal.propTypes = {
    onClose: PropTypes.func,
    refetch: PropTypes.func,
    id: PropTypes.string
}
