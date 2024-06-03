import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";

const BookedSession = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: session = [] } = useQuery({
        queryKey: ["bookedSession"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/booked/${user?.email}`)
            return res.data;
        }
    })

    console.log(session);

    return (
        <div>
            BookedSession
        </div>
    );
};

export default BookedSession;