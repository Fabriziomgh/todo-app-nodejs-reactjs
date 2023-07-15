import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
   const { loading, isAuthenticated } = useContext(AuthContext);

   if (loading) return <h1>Loading...</h1>;
   if (!loading && !isAuthenticated) return <Navigate to="/login" />;

   return <Outlet />;
};

export default ProtectedRoute;
