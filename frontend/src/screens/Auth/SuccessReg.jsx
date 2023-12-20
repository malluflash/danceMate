import { useSelector } from 'react-redux';
import FormContainer from '../../components/FormContainer';


const SuccessReg = () => {
  const { userInfo } = useSelector((state) => state.auth)

    return (
    
    <FormContainer>
    <h2 className="text-center pt-5  text-warning">Dear {userInfo.name}</h2>
    
    <h5 className="text-center mb-3 text-dark">
      Your Account has been successfully created. Please contact your
      admin to get it activated. Thank you!
    </h5>
    <div className="d-flex justify-content-center">
    </div>
    </FormContainer>
)};

export default SuccessReg;