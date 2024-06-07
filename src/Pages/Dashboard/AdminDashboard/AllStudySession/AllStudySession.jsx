import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useState } from "react";
import StatusModal from "./StatusModal";
import ApprovedModal from "./ApprovedModal";
import ApprovedSessions from "./ApprovedSessions";
import UpdateModal from "./UpdateModal";

const AllStudySession = () => {

    const axiosSecure = useAxiosSecure();
    const [showModal, setShowModal] = useState(false);
    const [showApprovedModal, setShowApprovedModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [approvedId, setApprovedId] = useState("");
    const [updateId, setUpdateId] = useState("");
    const [rejectId, setRejectId] = useState("");

    const { data: sessions = [], refetch } = useQuery({
        queryKey: ["pendingSessions"],
        queryFn: async () => {
            const res = await axiosSecure.get("/sessions");
            return res.data;
        }
    })

    const { data: approvedSessions = [], refetch: reload } = useQuery({
        queryKey: ["approvedSessions"],
        queryFn: async () => {
            const res = await axiosSecure.get("/courses");
            return res.data;
        }
    })

    const handleReject = (id) => {
        setRejectId(id);
        setShowModal(true);
    }

    const handleApproved = (id) => {
        setApprovedId(id);
        setShowApprovedModal(true);
    }

    return (
        <div>
            <h1 className="text-4xl font-semibold text-center my-10">Pending Sessions</h1>
            <div className="divider"></div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Tutor Name</th>
                            <th>Tutor Email</th>
                            <th>Registration Fee</th>
                            <th>Status</th>
                            <th>Reject</th>
                            <th>Approved</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            sessions.map((session, index) => <tr key={session._id}>
                                <th>{index + 1}</th>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-16 h-16">
                                            <img src={session.image} alt="Img" />
                                        </div>
                                    </div>
                                </td>
                                <td>{session.tutorName}</td>
                                <td>{session.tutorEmail}</td>
                                <td>${session.registrationFee}</td>
                                <td>{session.status}</td>
                                <td><button onClick={() => handleReject(session._id)} className="btn btn-sm bg-red-600 text-white">Reject</button></td>
                                <td><button onClick={() => handleApproved(session._id)} className="btn btn-sm bg-green-500 text-white">Approved</button></td>
                            </tr>)
                        }
                    </tbody>

                </table>
            </div>

            <h1 className="text-4xl font-semibold text-center my-10">Approved Sessions</h1>
            <div className="divider"></div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Tutor Name</th>
                                <th>Tutor Email</th>
                                <th>Registration Fee</th>
                                <th>Status</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                approvedSessions.map((session, index) => <tr key={session._id}>
                                    <ApprovedSessions setModal={setShowUpdateModal} setId={setUpdateId} session={session} index={index} reload={reload}></ApprovedSessions>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            <div>
                {
                    showApprovedModal ? <ApprovedModal reload={reload} refetch={refetch} id={approvedId} onClose={() => setShowApprovedModal(false)}></ApprovedModal> : undefined
                }
            </div>
            <div>
                {
                    showModal ? <StatusModal refetch={refetch} id={rejectId} onClose={() => setShowModal(false)}></StatusModal> : undefined
                }
            </div>
            <div>
                {
                    showUpdateModal ? <UpdateModal refetch={reload} id={updateId} onClose={() => setShowUpdateModal(false)}></UpdateModal> : undefined
                }
            </div>
        </div>
    );
};

export default AllStudySession;