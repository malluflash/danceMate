import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../../components/FormContainer";
import { useLoginMutation } from "../../Slices/userApiSlice";
import { setCredentials } from '../../Slices/authSlice';
import { toast } from "react-toastify";
import Loader from "../../components/Loader.jsx";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const redirectToHomePage = (role) => {
      
      switch (role) {
        case 'admin':
          navigate("/adminhome");
          break;
        case 'teacher':
          navigate("/teacherhome");
          break;
        case 'student':
          navigate("/studenthome");
          break;
      
    }
    };

    const checkUserStatusAndRedirect = async () => {
      if (userInfo && userInfo.role) {
       
        if (userInfo.isActive) {
          redirectToHomePage(userInfo.role);
        } else {
          navigate('/notauth');
        }
      }
    };
    checkUserStatusAndRedirect();
  }, [navigate, userInfo]);


  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };


  return (

    <FormContainer>
      
      <div>
        <h1 className="text-dark mb-5">Login</h1>
        <Form onSubmit={submitHandler} className="text-dark">
          <Form.Group className="my-2" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            
          </Form.Group>

          <Form.Group className="my-2" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
          </Form.Group>
          {isLoading && <Loader />}
          <div className="text-center">
            <Button 
            type="submit"
            variant="warning"
            className="mt-3">
              Login
            </Button>
          </div>
        </Form>

        <Row className="py-3 text-dark">
          <Col>
            New danceMate? <Link to={`/register`}>Register</Link>
          </Col>
        </Row>
      </div>
    </FormContainer>
  );
};
export default LoginScreen;
