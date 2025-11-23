import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SuperAdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const isSuperAdmin = userInfo && userInfo.role === 'superadmin';

  return isSuperAdmin ? <Outlet /> : <Navigate to='/notauth' replace />;
};

export default SuperAdminRoute; 