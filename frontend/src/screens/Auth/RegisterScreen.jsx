import { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from "../../Slices/userApiSlice";
import { setCredentials } from '../../Slices/authSlice';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [role, setRole] = useState("student");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
 

const dispatch = useDispatch();
const navigate = useNavigate();

const [register, { isLoading }] = useRegisterMutation();

const { userInfo } = useSelector((state) => state.auth);

useEffect(() => {
  if (userInfo) {
    navigate('/regmsg');
  }
}, [navigate, userInfo]);

  const notifyError = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000, // Set the time (in milliseconds) the toast should be displayed
      hideProgressBar: false,
    });
  };

  const validateForm = () => {
    const errors = {};

    // Validate Name
    if (!name.trim()) {
      errors.name = "Name is required";
      notifyError("Name is required");
    }

    // Validate Email
    if (!email.trim()) {
      errors.email = "Email is required";
      notifyError("Email is required");
    }

    // Validate Mobile
    if (!contactNumber.trim()) {
      errors.phone = "Mobile is required";
      notifyError("Mobile is required");
    }

    // Validate Role
    if (!role) {
      errors.role = "Role is required";
      notifyError("Role is required");
    }

    // Validate Password
    if (!password.trim()) {
      errors.password = "Password is required";
      notifyError("Password is required");
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters";
      notifyError("Password must be at least 8 characters");
    }

    // Validate Confirm Password
    if (!confirmPassword.trim()) {
      errors.confirmPassword = "Confirm Password is required";
      notifyError("Confirm Password is required");
    } else if (confirmPassword !== password) {
      errors.confirmPassword = "Passwords do not match";
      notifyError("Passwords do not match");
    }
    
    return Object.keys(errors).length === 0; // Return true if there are no errors
  };


 
  const submitHandler = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const res = await register({ name, email, password, contactNumber, role }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate('/regmsg');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <FormContainer>
        <div>
          <h1 className="text-dark mb-5">Register</h1>
          <Form onSubmit={submitHandler} className="text-dark">
            <Form.Group className="my-2" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>              
            </Form.Group>

            <Form.Group className="my-2" controlId="email">
              <Form.Label className="w-25">Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="mobile">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="phone"
                placeholder="Enter your mobile number with country code"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="role">
              <Form.Label>Role</Form.Label>
              <Form.Select
                type="text"
                placeholder="Select a role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="my-2" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className="my-2" controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            {isLoading && <Loader />}
            <div className="text-center">
              <Button type="submit" variant="info" className="mt-3">
                Sign Up
              </Button>
            </div>
          </Form>
          <Row className="py-3 text-dark">
            <Col>
              Already Registered? <Link to={`/login`}>Sign In</Link>
            </Col>
          </Row>
        </div>
     
    </FormContainer>
  );
};

export default RegisterScreen;
