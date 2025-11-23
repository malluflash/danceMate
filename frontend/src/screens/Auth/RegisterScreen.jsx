import { useState, useEffect } from 'react';
import FormContainer from '../../components/FormContainer';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from "../../Slices/userApiSlice";
import { setCredentials } from '../../Slices/authSlice';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import axios from 'axios';

const RegisterScreen = () => {
  const [searchParams] = useSearchParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [role, setRole] = useState("student");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [schoolId, setSchoolId] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [schools, setSchools] = useState([]);
  const [loadingSchools, setLoadingSchools] = useState(false);
 

const dispatch = useDispatch();
const navigate = useNavigate();

const [register, { isLoading }] = useRegisterMutation();

const { userInfo } = useSelector((state) => state.auth);

useEffect(() => {
  if (userInfo) {
    navigate('/regmsg');
  }
  
  // Get school ID from URL params if available
  const schoolParam = searchParams.get('school');
  const schoolNameParam = searchParams.get('schoolName');
  if (schoolParam) {
    setSchoolId(schoolParam);
  }
  if (schoolNameParam) {
    setSchoolName(decodeURIComponent(schoolNameParam));
  }
  
  // Fetch active schools for selection
  fetchActiveSchools();
}, [navigate, userInfo, searchParams]);

const fetchActiveSchools = async () => {
  try {
    setLoadingSchools(true);
    const response = await axios.get('/api/schools/active');
    setSchools(response.data);
  } catch (error) {
    console.error('Error fetching schools:', error);
    // Don't show error, just allow manual entry
  } finally {
    setLoadingSchools(false);
  }
};

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

    // Validate School
    if (!schoolId.trim()) {
      errors.school = "Dance Institute is required";
      notifyError("Please select your dance institute");
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
        const res = await register({ 
          name, 
          email, 
          password, 
          contactNumber, 
          role,
          school: schoolId 
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate('/regmsg');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <FormContainer>
      <div className="w-full">
        <div className="mb-5 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-lg">Join Your Dance Institute</h1>
          <p className="text-white/80 text-sm">
            This registration is invite-only. Please use the invitation link provided by your dance institute.
          </p>
        </div>
        <form onSubmit={submitHandler} className="text-white space-y-4 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2 text-white/90">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 border border-white/30 bg-primary/40 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sunset focus:border-sunset text-white placeholder-white/50 focus:bg-primary/50 transition-all"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-white/90">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 border border-white/30 bg-primary/40 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sunset focus:border-sunset text-white placeholder-white/50 focus:bg-primary/50 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="mobile" className="block text-sm font-medium mb-2 text-white/90">Mobile</label>
              <input
                type="tel"
                id="mobile"
                placeholder="Enter your mobile number"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                className="w-full px-4 py-2.5 border border-white/30 bg-primary/40 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sunset focus:border-sunset text-white placeholder-white/50 focus:bg-primary/50 transition-all"
              />
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium mb-2 text-white/90">Role</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole("student")}
                  className={`px-4 py-3 rounded-lg border-2 transition-all ${
                    role === "student"
                      ? "border-sunset bg-sunset/30 text-white"
                      : "border-white/30 bg-primary/40 text-white/90 hover:border-white/50 hover:bg-primary/50"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    {role === "student" && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                    <span className="font-medium text-sm">Student</span>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setRole("teacher")}
                  className={`px-4 py-3 rounded-lg border-2 transition-all ${
                    role === "teacher"
                      ? "border-sunset bg-sunset/30 text-white"
                      : "border-white/30 bg-primary/40 text-white/90 hover:border-white/50 hover:bg-primary/50"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    {role === "teacher" && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                    <span className="font-medium text-sm">Teacher</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="school" className="block text-sm font-medium mb-2 text-white/90">
              Dance Institute <span className="text-sunset">*</span>
            </label>
            {schoolName ? (
              <div className="w-full px-4 py-2.5 border border-white/30 bg-primary/40 rounded-lg text-white/90">
                {schoolName}
                <button
                  type="button"
                  onClick={() => {
                    setSchoolId("");
                    setSchoolName("");
                  }}
                  className="ml-2 text-sunset hover:text-white text-sm underline"
                >
                  Change
                </button>
              </div>
            ) : (
              <select
                id="school"
                value={schoolId}
                onChange={(e) => {
                  const selectedSchool = schools.find(s => s._id === e.target.value);
                  setSchoolId(e.target.value);
                  if (selectedSchool) {
                    setSchoolName(selectedSchool.name);
                  }
                }}
                required
                disabled={loadingSchools}
                className="w-full px-4 py-2.5 border border-white/30 bg-primary/40 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sunset focus:border-sunset text-white focus:bg-primary/50 transition-all appearance-none cursor-pointer disabled:opacity-50"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%23FFD3D5' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 0.75rem center',
                  backgroundSize: '1.5em 1.5em',
                  paddingRight: '2.5rem'
                }}
              >
                <option value="" className="bg-primary text-white">
                  {loadingSchools ? 'Loading institutes...' : 'Select your dance institute'}
                </option>
                {schools.map((school) => (
                  <option key={school._id} value={school._id} className="bg-primary text-white">
                    {school.name} - {school.city}
                  </option>
                ))}
              </select>
            )}
            <p className="text-xs text-white/60 mt-1">
              Select the dance institute you've been invited to join
            </p>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2 text-white/90">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter password (min 8 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 border border-white/30 bg-white/10 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sunset focus:border-sunset text-white placeholder-white/50 focus:bg-white/20 transition-all"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2 text-white/90">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2.5 border border-white/30 bg-white/10 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sunset focus:border-sunset text-white placeholder-white/50 focus:bg-white/20 transition-all"
            />
          </div>

          {isLoading && <Loader />}
          
          <div className="pt-2">
            <button 
              type="submit" 
              className="btn btn-primary w-full py-3"
              disabled={isLoading}
            >
              {isLoading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </div>
        </form>
        
        <div className="mt-6 pt-6 border-t border-white/20 text-center space-y-3">
          <p className="text-white/80">
            Already have an account?{' '}
            <Link to="/login" className="text-sunset hover:text-white transition-colors font-medium">
              Sign In
            </Link>
          </p>
          <p className="text-xs text-white/60">
            Need to register a new dance school?{' '}
            <Link to="/contact" className="text-sunset/80 hover:text-sunset transition-colors underline">
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </FormContainer>
  );
};

export default RegisterScreen;
