import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../Slices/userApiSlice";
import { setCredentials } from '../../Slices/authSlice';
import { toast } from "react-toastify";
import { motion } from "framer-motion";

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-purple-pink-vertical py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/30 rounded-full filter blur-3xl opacity-60 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-accent/30 rounded-full filter blur-3xl opacity-60 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/20 rounded-full filter blur-3xl opacity-40"></div>
      </div>
      
      <motion.div 
        className="max-w-md w-full space-y-8 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <motion.h2 
            className="text-3xl font-extrabold text-white drop-shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Welcome back
          </motion.h2>
          <motion.p 
            className="mt-2 text-sm text-white/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Sign in to your Dance Mate account
          </motion.p>
        </div>
        
        <motion.div 
          className="card-gradient backdrop-blur-xl border-white/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <form className="space-y-6" onSubmit={submitHandler}>
            <div className="form-group">
              <label htmlFor="email" className="form-label text-white">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="input bg-primary/40 border-white/30 text-white placeholder-white/50 focus:bg-primary/50 focus:border-primary"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="form-label text-white">
                  Password
                </label>
                <div className="text-sm">
                  <Link to="#" className="text-sunset hover:text-white transition-colors">
                    Forgot password?
                  </Link>
                </div>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="input bg-primary/40 border-white/30 text-white placeholder-white/50 focus:bg-primary/50 focus:border-primary"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary w-full"
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>
          </form>
        </motion.div>

        <motion.div 
          className="text-center text-sm mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <p className="text-white/80">
            New to Dance Mate?{' '}
            <Link to="/register" className="font-medium text-sunset hover:text-white transition-colors">
              Create an account
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginScreen;
