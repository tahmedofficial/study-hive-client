import { useParams } from "react-router-dom";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import ReviewModal from "../ReviewModal/ReviewModal";
import { useState } from "react";

const BookingDetails = () => {

    const { id } = useParams();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [showModal, setShowModal] = useState(false);


    const { data: myBooking = [] } = useQuery({
        queryKey: ["bookedSession"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/booked/${user?.email}`)
            return res.data[0]
        }
    })

    const booking = myBooking.find(item => item._id === id);

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="md:col-span-1">
                    <img className="rounded-lg h-full" src={booking?.sessionInfo?.image} alt="" />
                </div>
                <div className="md:col-span-2">
                    <div className="overflow-x-auto">
                        <table className="table">
                            <tbody>
                                <tr><td className="md:text-lg"><span className="font-bold">Title: </span>{booking?.sessionInfo?.title}</td></tr>
                                <tr><td className="md:text-lg"><span className="font-bold">Description: </span>{booking?.sessionInfo?.description}</td></tr>
                                <tr><td className="md:text-lg"><span className="font-bold">Tutor Name: </span>{booking?.sessionInfo?.tutorName}</td></tr>
                                <tr><td className="md:text-lg"><span className="font-bold">Duration: </span>{booking?.sessionInfo?.duration}</td></tr>
                                <tr><td className="md:text-lg"><span className="font-bold">Class Start Time: </span>{booking?.sessionInfo?.classStartTime}</td></tr>
                                <tr><td className="md:text-lg"><span className="font-bold">Class End Time: </span>{booking?.sessionInfo?.classEndDate}</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <button onClick={() => setShowModal(true)} className="btn px-10 bg-primary_color text-white text-lg mt-5">Review</button>
                    </div>
                </div>
            </div>
            <div>
                {
                    showModal ? <ReviewModal onClose={() => setShowModal(false)} booking={booking}></ReviewModal> : undefined
                }
            </div>
        </div>
    );
};

export default BookingDetails;