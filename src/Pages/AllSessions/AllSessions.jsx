import SessionCart from "../../Components/SessionCart/SessionCart";
import useAuth from "../../Hooks/useAuth";


const AllSessions = () => {

    const {courses}=useAuth();

    return (
        <div className="md:w-5/6 mx-auto mt-16 px-4">
            <h1 className="text-center text-4xl font-semibold py-10">- - - All Sessions - - -</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {
                    courses.map(course => <SessionCart key={course._id} session={course}></SessionCart>)
                }
            </div>
        </div>
    );
};

export default AllSessions;