import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import { Link } from "react-router-dom";

const BookedSession = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: myBooking = [] } = useQuery({
        queryKey: ["bookedSession"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/booked/${user?.email}`)
            return res.data[0]
        }
    })
    // const myBooking = info.filter(booking => user?.email === booking.studentEmail);
    console.log(myBooking);
    return (
        <div>
            <div className="overflow-x-auto lg:w-5/6">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Tutor Name</th>
                            <th>Detail</th>
                            <th>review</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myBooking.map((session, index) => <tr key={session._id} className="hover">
                                <th>{index + 1}</th>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={session?.sessionInfo?.image} alt="image" />
                                        </div>
                                    </div>
                                </td>
                                <td>{session?.sessionInfo?.title}</td>
                                <td>{session?.sessionInfo?.tutorName}</td>
                                <td>
                                    <Link to={`/dashboard/bookingDetails/${session._id}`}>
                                        <button className="btn btn-sm bg-primary_color text-white">View Detail</button>
                                    </Link>
                                </td>
                                <td><button className="btn btn-sm bg-primary_color text-white">Review</button></td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BookedSession;