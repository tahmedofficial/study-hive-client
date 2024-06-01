import PropTypes from 'prop-types';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {

    const { user, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return <span className="loading loading-spinner loading-lg text-primary_color mt-20 flex justify-center mx-auto"></span>
    }

    if (user) {
        return children
    }

    return <Navigate to="/login" state={location.pathname} replace></Navigate>
};

export default PrivateRoute;

PrivateRoute.propTypes = {
    children: PropTypes.node
}