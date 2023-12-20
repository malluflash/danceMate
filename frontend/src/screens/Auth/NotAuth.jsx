import { useSelector } from 'react-redux';
import FormContainer from '../../components/FormContainer';


const NotAuth = () => {
  const { userInfo } = useSelector((state) => state.auth)

    return (
    
    <FormContainer>
    <h2 className="text-center pt-5  text-warning">Dear {userInfo.name}</h2>
    
    <h5 className="text-center mb-3 text-dark">
      Your Account is inactive. Please contact your admin!!
    </h5>
    <div className="d-flex justify-content-center">
    </div>
    </FormContainer>
)};

export default NotAuth;