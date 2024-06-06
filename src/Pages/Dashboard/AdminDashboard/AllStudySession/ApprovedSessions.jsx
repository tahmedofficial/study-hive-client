import PropTypes from "prop-types";

const ApprovedSessions = ({ session, index, reload }) => {

    const { _id, image, tutorName, tutorEmail, registrationFee, status } = session;

    const handleUpdate = (id) => {
        console.log(id);
    }
    const handleDelete = (id) => {
        reload();
        console.log(id);
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
            <td><button onClick={() => handleUpdate(_id)} className="btn btn-sm bg-green-500 text-white">Approved</button></td>
            <td><button onClick={() => handleDelete(_id)} className="btn btn-sm bg-red-600 text-white">Reject</button></td>
        </>
    );
};

export default ApprovedSessions;

ApprovedSessions.propTypes = {
    reload: PropTypes.func,
    session: PropTypes.object,
    index: PropTypes.number
}