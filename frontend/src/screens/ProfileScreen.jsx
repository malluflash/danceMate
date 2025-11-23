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
      <div className="w-full">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-6 drop-shadow-lg text-center">Update Profile</h1>

        <form onSubmit={submitHandler} className="text-white space-y-5">
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
        
          <div>
            <label htmlFor="mobile" className="block text-sm font-medium mb-2 text-white/90">Mobile</label>
          <input
            type="tel"
            id="mobile"
            placeholder="Enter your mobile number with country code"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
              className="w-full px-4 py-2.5 border border-white/30 bg-primary/40 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sunset focus:border-sunset text-white placeholder-white/50 focus:bg-primary/50 transition-all"
          />
        </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2 text-white/90">Password</label>
          <input
            type="password"
            id="password"
              placeholder="Enter new password (min 8 characters)"
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
            {isLoading ? 'Updating...' : 'Update Profile'}
          </button>
        </div>
      </form>
      </div>
    </FormContainer>
  );
};

export default ProfileScreen;
