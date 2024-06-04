import { useParams } from "react-router-dom";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const BookingDetails = () => {

    const { id } = useParams();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: myBooking = [] } = useQuery({
        queryKey: ["bookedSession"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/booked/${user?.email}`)
            return res.data[0]
        }
    })

    const booking = myBooking.find(item => item._id === id);
    console.log(booking?.sessionInfo);

    return (
        <div>
            {id}
        </div>
    );
};

export default BookingDetails;