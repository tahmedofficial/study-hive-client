import PropTypes from 'prop-types';
import useAuth from '../Hooks/useAuth';
import useTutor from '../Hooks/useTutor';
import { Navigate, useLocation } from 'react-router-dom';

const TutorPrivateRoute = ({ children }) => {

    const { user, isLoading } = useAuth();
    const [isTutor, isPending] = useTutor();
    const location = useLocation();

    if (isLoading || isPending) {
        return <span className="loading loading-spinner loading-lg text-primary_color mt-20 flex justify-center mx-auto"></span>
    }

    if (user && isTutor?.tutor) {
        return children;
    }

    return <Navigate to="/login" state={location.pathname} replace></Navigate>

};

export default TutorPrivateRoute;

TutorPrivateRoute.propTypes = {
    children: PropTypes.node
}