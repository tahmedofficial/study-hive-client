import { Link } from "react-router-dom";
import SessionCart from "../../Components/SessionCart/SessionCart";
import useAuth from "../../Hooks/useAuth";

const StudySession = () => {

    const { courses } = useAuth();

    return (
        <div className="md:w-5/6 mx-auto px-4 mt-16">
            <h1 className="text-center text-4xl font-semibold py-10">- - - Study Session - - -</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {
                    courses.slice(0, 5).map(course => <SessionCart key={course._id} session={course}></SessionCart>)
                }
            </div>
            <Link to="/allSessions">
                <button className="btn mt-10 bg-primary_color text-white px-12 flex mx-auto">See All Sessions</button>
            </Link>
        </div>
    );
};

export default StudySession;