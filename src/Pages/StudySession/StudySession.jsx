import SessionCart from "../../Components/SessionCart/SessionCart";
import useAuth from "../../Hooks/useAuth";

const StudySession = () => {

    const { courses } = useAuth();

    return (
        <div className="md:w-5/6 mx-auto px-4 mt-16">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {
                    courses.slice(0, 5).map(course => <SessionCart key={course._id} session={course}></SessionCart>)
                }
            </div>
        </div>
    );
};

export default StudySession;