import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.tsx';


const PrivateRoute = () => {
    const { accessToken } = useAuth();
    console.log(accessToken);
    return accessToken != null ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
