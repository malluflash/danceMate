import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SuperAdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  // If no user info, redirect to login
  if (!userInfo) {
    return <Navigate to='/superadmin/login' replace />;
  }

  // If user is not super admin, check if inactive
  const isSuperAdmin = userInfo.role === 'superadmin';
  
  if (!isSuperAdmin) {
    // If user is logged in but not super admin, redirect based on status
    if (!userInfo.isActive) {
      return <Navigate to='/notauth' replace />;
    }
    return <Navigate to='/' replace />;
  }

  return <Outlet />;
};

export default SuperAdminRoute; 