import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const StudentRoute = () => {
  
  const { userInfo } = useSelector((state) => state.auth);


  const isStudent = userInfo && userInfo.role === 'student' && userInfo.isActive;


  return isStudent ? <Outlet /> : <Navigate to='/' replace />;
};

export default StudentRoute;