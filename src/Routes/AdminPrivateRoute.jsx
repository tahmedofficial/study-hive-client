import PropTypes from 'prop-types';
import useAuth from '../Hooks/useAuth';
import useAdmin from '../Hooks/useAdmin';
import { Navigate, useLocation } from 'react-router-dom';

const AdminPrivateRoute = ({ children }) => {

    const { user, isLoading } = useAuth();
    const [isAdmin, isPending] = useAdmin();
    const location = useLocation();

    if (isLoading || isPending) {
        return <span className="loading loading-spinner loading-lg text-primary_color mt-20 flex justify-center mx-auto"></span>
    }

    if (user && isAdmin?.admin) {
        return children;
    }

    return <Navigate to="/login" state={location.pathname} replace></Navigate>

};

export default AdminPrivateRoute;

AdminPrivateRoute.propTypes = {
    children: PropTypes.node
}