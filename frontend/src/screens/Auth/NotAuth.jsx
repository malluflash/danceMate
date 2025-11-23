import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import FormContainer from '../../components/FormContainer';


const NotAuth = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    // If userInfo is null (logged out), redirect to home
    if (!userInfo) {
      navigate('/');
    }
  }, [userInfo, navigate]);

  // If no userInfo, don't render (will redirect)
  if (!userInfo) {
    return null;
  }

  return (
    <FormContainer>
      <h2 className="text-center pt-5 text-warning">
        Dear {userInfo.name || 'User'}
      </h2>
      
      <h5 className="text-center mb-3 text-dark">
        Your Account is inactive. Please contact your admin!!
      </h5>
      <div className="d-flex justify-content-center">
      </div>
    </FormContainer>
  );
};

export default NotAuth;