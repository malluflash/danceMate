import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = () => {
  
  const { userInfo } = useSelector((state) => state.auth);


  const isAdmin = userInfo && (userInfo.role === 'admin' || userInfo.role === 'superadmin');


  return isAdmin ? <Outlet /> : <Navigate to='/' replace />;
};

export default AdminRoute;

