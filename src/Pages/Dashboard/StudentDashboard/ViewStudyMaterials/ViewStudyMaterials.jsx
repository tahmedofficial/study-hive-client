import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const ViewStudyMaterials = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: myBookingSessions = [] } = useQuery({
        queryKey: ["bookeSessions"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/booked/${user?.email}`)
            return res.data[0]
        }
    })

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 px-3">
            {
                myBookingSessions.map(session => <div key={session._id}>
                    <div className='p-3 shadow-md max-w-96 rounded-lg bg-primary_bg_color h-full flex flex-col'>
                        <div>
                            <img className='max-w-90 w-full rounded-lg lg:h-48' src={session?.sessionInfo?.image} alt="image" />
                        </div>
                        <div className='my-4 flex-grow'>
                            <h1 className='text-xl md:text-2xl font-medium'>Title: {session?.sessionInfo?.title}</h1>
                            <h3>Description: {session?.sessionInfo?.description}</h3>
                        </div>
                        <Link to={`/dashboard/materialsDetails/${session.sessionId}`}>
                            <button className='btn bg-primary_color w-full text-white mt-5'>Read Now</button>
                        </Link>
                    </div>
                </div>)
            }
        </div>
    );
};

export default ViewStudyMaterials;