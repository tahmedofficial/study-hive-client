import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";

const ViewAllStudySessions = () => {

    const { user, sweetMessage, reload } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: approvedSessions = [] } = useQuery({
        queryKey: ["approSessions"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/sessions/${user?.email}`);
            return res.data;
        }
    })

    const { data: rejectedSessions = [], refetch } = useQuery({
        queryKey: ["rejeSessions"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/rejSessions/${user?.email}`);
            return res.data;
        }
    })

    const handleRequest = (id) => {
        axiosSecure.patch(`/session/${id}`)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    reload();
                    sweetMessage("Request Send");
                    console.log(res.data);
                }
            })
    }

    return (
        <div className="mb-20">
            <h1 className="text-4xl font-semibold text-center my-10">Approved Sessions</h1>
            <div className="divider"></div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Tutor Name</th>
                            <th>Tutor Email</th>
                            <th>Status</th>
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
                                <td>{session.tutorName}</td>
                                <td>{session.tutorEmail}</td>
                                <td className="font-bold text-green-600">{session.status}</td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>

            <h1 className="text-4xl font-semibold text-center my-10">Rejected Sessions</h1>
            <div className="divider"></div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Tutor Name</th>
                            <th>Tutor Email</th>
                            <th>Reject Reason</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            rejectedSessions.map((session, index) => <tr key={session._id} className="hover">
                                <th>{index + 1}</th>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={session.image} alt="image" />
                                        </div>
                                    </div>
                                </td>
                                <td>{session.tutorName}</td>
                                <td>{session.tutorEmail}</td>
                                <td>{session.rejectReason}</td>
                                <td>
                                    <button onClick={() => handleRequest(session._id)} className="btn btn-sm bg-primary_color text-white">Request</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewAllStudySessions;