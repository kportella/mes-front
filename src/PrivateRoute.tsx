import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../src/AuthContext';


const PrivateRoute = () => {
    const { isLoggedIn } = useAuth();
    console.log(isLoggedIn);
    return isLoggedIn == 'true' ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
