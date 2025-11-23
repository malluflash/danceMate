import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SchoolAdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  // If no user info, redirect to login
  if (!userInfo) {
    return <Navigate to='/login' replace />;
  }

  // If user is not school admin or super admin, check if inactive
  const isSchoolAdmin = userInfo.role === 'schooladmin' || userInfo.role === 'superadmin';
  
  if (!isSchoolAdmin) {
    // If user is logged in but not school admin, redirect based on status
    if (!userInfo.isActive) {
      return <Navigate to='/notauth' replace />;
    }
    return <Navigate to='/' replace />;
  }

  return <Outlet />;
};

export default SchoolAdminRoute; 