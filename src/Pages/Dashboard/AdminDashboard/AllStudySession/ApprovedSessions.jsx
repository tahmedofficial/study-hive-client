import PropTypes from "prop-types";
import Swal from "sweetalert2";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const ApprovedSessions = ({ session, index, reload }) => {

    const { reload: loading, sweetMessage } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { _id, image, tutorName, tutorEmail, registrationFee, status } = session;

    const handleUpdate = (id) => {
        console.log(id);
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Delete"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/courses/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            reload();
                            loading();
                            sweetMessage("Successfully Delete");
                        }
                    })
            }
        });

    }

    return (
        <>
            <th>{index + 1}</th>
            <td>
                <div className="avatar">
                    <div className="mask mask-squircle w-16 h-16">
                        <img src={image} alt="Img" />
                    </div>
                </div>
            </td>
            <td>{tutorName}</td>
            <td>{tutorEmail}</td>
            <td>${registrationFee}</td>
            <td>{status}</td>
            <td><button onClick={() => handleUpdate(_id)} className="btn btn-sm bg-green-500 text-white">Update</button></td>
            <td><button onClick={() => handleDelete(_id)} className="btn btn-sm bg-red-600 text-white">Delete</button></td>
        </>
    );
};

export default ApprovedSessions;

ApprovedSessions.propTypes = {
    reload: PropTypes.func,
    session: PropTypes.object,
    index: PropTypes.number
}