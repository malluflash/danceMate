import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const TeacherAndAdminRoute = () => {
  
  const { userInfo } = useSelector((state) => state.auth);


  const isAdmin = userInfo && userInfo.role === 'admin'&& userInfo.isActive;

  const isTeacher = userInfo && userInfo.role === 'teacher'&& userInfo.isActive;



  return isAdmin || isTeacher ? <Outlet /> : <Navigate to='/' replace />;
};

export default TeacherAndAdminRoute;

