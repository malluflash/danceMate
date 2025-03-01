import { useState, useEffect } from 'react';
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
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Register</h1>
        <form onSubmit={submitHandler} className="text-gray-800 dark:text-gray-200 space-y-4">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-800"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-800"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="mobile" className="block text-sm font-medium mb-1">Mobile</label>
            <input
              type="tel"
              id="mobile"
              placeholder="Enter your mobile number with country code"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-800"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="role" className="block text-sm font-medium mb-1">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-800"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-800"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-800"
            />
          </div>

          {isLoading && <Loader />}
          
          <div className="text-center">
            <button 
              type="submit" 
              className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-6 rounded-md transition-colors duration-200 mt-4"
            >
              Sign Up
            </button>
          </div>
        </form>
        
        <div className="py-4 text-gray-800 dark:text-gray-200 text-center">
          Already Registered? <Link to="/login" className="text-primary hover:underline">Sign In</Link>
        </div>
      </div>
    </FormContainer>
  );
};

export default RegisterScreen;
