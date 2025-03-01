import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useUpdateUserMutation } from "../Slices/userApiSlice";
import { setCredentials } from "../Slices/authSlice";

const ProfileScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
    setContactNumber(userInfo.contactNumber);
  }, [userInfo.email, userInfo.name, userInfo.contactNumber]);

  const dispatch = useDispatch();

  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else if (password.length === 0) {
      toast.error("Please enter your passowrd");
    } else if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          contactNumber,
          password
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
      
    }
  };

  return (
    <FormContainer>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Update Profile</h1>

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
            Update
          </button>
        </div>
      </form>
    </FormContainer>
  );
};

export default ProfileScreen;
