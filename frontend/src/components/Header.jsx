import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../Slices/userApiSlice";
import { logout } from "../Slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, Fragment } from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Transition } from '@headlessui/react';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  const [logoutApiCall] = useLogoutMutation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-light-card/90 dark:bg-dark-card/90 shadow-lg backdrop-blur-lg' 
        : 'bg-transparent'
    }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <motion.span 
                className={`text-2xl font-bold ${
                  scrolled 
                    ? 'text-light-text dark:text-dark-text' 
                    : 'text-light-text dark:text-dark-text'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                Dance<span className="text-primary dark:text-accent">Mate</span>
              </motion.span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <motion.button 
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${
                scrolled 
                  ? 'hover:bg-light-hover dark:hover:bg-dark-hover' 
                  : 'hover:bg-light-hover/20 dark:hover:bg-dark-hover/20'
              } transition-colors duration-200`}
              aria-label="Toggle dark mode"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {darkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-dark-text" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-light-text" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </motion.button>
            
            {userInfo ? (
              <Menu as="div" className="relative">
                <Menu.Button className={`flex items-center space-x-2 ${
                  scrolled 
                    ? 'text-light-text dark:text-dark-text hover:text-primary dark:hover:text-accent' 
                    : 'text-light-text dark:text-dark-text hover:text-primary dark:hover:text-accent'
                } px-3 py-2 rounded-xl text-sm font-medium transition-colors duration-200`}>
                  <span className="text-primary dark:text-accent">{userInfo.name}</span>
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </Menu.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-56 rounded-xl shadow-lg bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border transition-colors duration-200 overflow-hidden">
                    <div className="py-1">
                      {userInfo.role === 'admin' && (
                        <>
                          <Menu.Item>
                            {({ active }) => (
                              <Link to="/adminhome" className={`block px-4 py-3 text-sm ${
                                active ? 'bg-light-hover dark:bg-dark-hover' : ''
                              } text-light-text dark:text-dark-text transition-colors duration-200`}>
                                Home
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link to="/createslots" className={`block px-4 py-3 text-sm ${
                                active ? 'bg-light-hover dark:bg-dark-hover' : ''
                              } text-light-text dark:text-dark-text transition-colors duration-200`}>
                                Create Slot
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link to="/slotsview" className={`block px-4 py-3 text-sm ${
                                active ? 'bg-light-hover dark:bg-dark-hover' : ''
                              } text-light-text dark:text-dark-text transition-colors duration-200`}>
                                View Schedule
                              </Link>
                            )}
                          </Menu.Item>
                        </>
                      )}
                      {userInfo.isActive && userInfo.role === 'teacher' && (
                        <>
                          <Menu.Item>
                            {({ active }) => (
                              <Link to="/teacherhome" className={`block px-4 py-3 text-sm ${
                                active ? 'bg-light-hover dark:bg-dark-hover' : ''
                              } text-light-text dark:text-dark-text transition-colors duration-200`}>
                                Dashboard
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link to="/createslots" className={`block px-4 py-3 text-sm ${
                                active ? 'bg-light-hover dark:bg-dark-hover' : ''
                              } text-light-text dark:text-dark-text transition-colors duration-200`}>
                                Create Slot
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link to="/slotsview" className={`block px-4 py-3 text-sm ${
                                active ? 'bg-light-hover dark:bg-dark-hover' : ''
                              } text-light-text dark:text-dark-text transition-colors duration-200`}>
                                View Schedule
                              </Link>
                            )}
                          </Menu.Item>
                        </>
                      )}
                      {userInfo.isActive && userInfo.role === 'student' && (
                        <Menu.Item>
                          {({ active }) => (
                            <Link to="/studenthome" className={`block px-4 py-3 text-sm ${
                              active ? 'bg-light-hover dark:bg-dark-hover' : ''
                            } text-light-text dark:text-dark-text transition-colors duration-200`}>
                              Dashboard
                            </Link>
                          )}
                        </Menu.Item>
                      )}
                      <Menu.Item>
                        {({ active }) => (
                          <Link to="/profile" className={`block px-4 py-3 text-sm ${
                            active ? 'bg-light-hover dark:bg-dark-hover' : ''
                          } text-light-text dark:text-dark-text transition-colors duration-200`}>
                            Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={logoutHandler}
                            className={`block w-full text-left px-4 py-3 text-sm ${
                              active ? 'bg-light-hover dark:bg-dark-hover' : ''
                            } text-light-text dark:text-dark-text transition-colors duration-200`}
                          >
                            Logout
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <div className="flex items-center space-x-4">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Link to="/login" className="btn btn-sm btn-primary">Sign in</Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Link to="/register" className="btn btn-sm btn-outline">Sign up</Link>
                </motion.div>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-lg ${
                scrolled 
                  ? 'text-light-text dark:text-dark-text hover:bg-light-hover dark:hover:bg-dark-hover' 
                  : 'text-light-text dark:text-dark-text hover:bg-light-hover/20 dark:hover:bg-dark-hover/20'
              } transition-colors duration-200 focus:outline-none`}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              className="md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <button 
                  onClick={toggleDarkMode}
                  className="flex items-center space-x-2 w-full px-3 py-2 rounded-lg text-light-text dark:text-dark-text hover:bg-light-hover dark:hover:bg-dark-hover transition-colors duration-200"
                >
                  <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                  {darkMode ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-dark-text" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-light-text" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                  )}
                </button>
                
                {userInfo ? (
                  <>
                    <div className="px-3 py-2 text-primary dark:text-accent font-medium">{userInfo.name}</div>
                    {userInfo.role === 'admin' && (
                      <>
                        <Link to="/adminhome" className="block px-3 py-2 text-light-text dark:text-dark-text hover:bg-light-hover dark:hover:bg-dark-hover rounded-lg transition-colors duration-200">Home</Link>
                        <Link to="/createslots" className="block px-3 py-2 text-light-text dark:text-dark-text hover:bg-light-hover dark:hover:bg-dark-hover rounded-lg transition-colors duration-200">Create Slot</Link>
                        <Link to="/slotsview" className="block px-3 py-2 text-light-text dark:text-dark-text hover:bg-light-hover dark:hover:bg-dark-hover rounded-lg transition-colors duration-200">View Schedule</Link>
                      </>
                    )}
                    {userInfo.isActive && userInfo.role === 'teacher' && (
                      <>
                        <Link to="/teacherhome" className="block px-3 py-2 text-light-text dark:text-dark-text hover:bg-light-hover dark:hover:bg-dark-hover rounded-lg transition-colors duration-200">Dashboard</Link>
                        <Link to="/createslots" className="block px-3 py-2 text-light-text dark:text-dark-text hover:bg-light-hover dark:hover:bg-dark-hover rounded-lg transition-colors duration-200">Create Slot</Link>
                        <Link to="/slotsview" className="block px-3 py-2 text-light-text dark:text-dark-text hover:bg-light-hover dark:hover:bg-dark-hover rounded-lg transition-colors duration-200">View Schedule</Link>
                      </>
                    )}
                    {userInfo.isActive && userInfo.role === 'student' && (
                      <Link to="/studenthome" className="block px-3 py-2 text-light-text dark:text-dark-text hover:bg-light-hover dark:hover:bg-dark-hover rounded-lg transition-colors duration-200">Dashboard</Link>
                    )}
                    <Link to="/profile" className="block px-3 py-2 text-light-text dark:text-dark-text hover:bg-light-hover dark:hover:bg-dark-hover rounded-lg transition-colors duration-200">Profile</Link>
                    <button
                      onClick={logoutHandler}
                      className="block w-full text-left px-3 py-2 text-light-text dark:text-dark-text hover:bg-light-hover dark:hover:bg-dark-hover rounded-lg transition-colors duration-200"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="space-y-2 px-3 pt-2">
                    <Link to="/login" className="btn btn-primary block text-center">Sign in</Link>
                    <Link to="/register" className="btn btn-outline block text-center">Sign up</Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Header;