import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useState } from "react";
import UploadMaterialsModal from "./UploadMaterialsModal";
import WaitModal from "../../../../Components/WaitModal/WaitModal";
import useAuth from "../../../../Hooks/useAuth";


const UploadMaterials = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [showModal, setShowModal] = useState(false);
    const [isUploding, setUploding] = useState(false);
    const [sessionId, setSessionId] = useState("");

    const { data: approvedSessions = [] } = useQuery({
        queryKey: ["approSessions"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/sessions/${user?.email}`);
            return res.data;
        }
    })

    const handleUploadModal = (id) => {
        setShowModal(true);
        setSessionId(id);
    }

    return (
        <div>
            <h1 className="text-4xl font-semibold text-center my-10">Upload Materials</h1>
            <div className="divider"></div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Tutor Email</th>
                            <th>Session Id</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            approvedSessions.map((session, index) => <tr key={session._id} className="hover">
                                <th>{index + 1}</th>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={session.image} alt="image" />
                                        </div>
                                    </div>
                                </td>
                                <td>{session.title}</td>
                                <td>{session.tutorEmail}</td>
                                <td>{session._id}</td>
                                <td>
                                    <button onClick={() => handleUploadModal(session._id)} className="btn btn-sm bg-primary_color text-white">Upload Materials</button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
            <div>
                {
                    showModal ? <UploadMaterialsModal uploding={setUploding} id={sessionId} onClose={() => setShowModal(false)}></UploadMaterialsModal> : undefined
                }
            </div>
            <div>
                {
                    isUploding ? <WaitModal message={"Uploding Material"}></WaitModal> : undefined
                }
            </div>
        </div>
    );
};

export default UploadMaterials;