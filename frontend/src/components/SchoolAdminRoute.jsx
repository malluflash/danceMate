import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SchoolAdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const isSchoolAdmin = userInfo && (userInfo.role === 'schooladmin' || userInfo.role === 'superadmin');

  return isSchoolAdmin ? <Outlet /> : <Navigate to='/notauth' replace />;
};

export default SchoolAdminRoute; 