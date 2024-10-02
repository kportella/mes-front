import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../src/AuthContext';


const PrivateRoute = () => {
    const { accessToken } = useAuth();
    console.log(accessToken);
    return accessToken != null ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
