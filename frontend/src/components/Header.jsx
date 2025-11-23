import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../Slices/userApiSlice";
import { logout } from "../Slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, Fragment } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Transition } from '@headlessui/react';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
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

  const handleScrollTo = (sectionId) => {
    setIsOpen(false); // Close mobile menu
    
    // If we're not on the homepage, navigate there first with hash
    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
    } else {
      // We're on the homepage, scroll to the section
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }, 50);
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-gradient-to-r from-primary/90 via-secondary/90 to-accent/90 shadow-lg backdrop-blur-lg border-b border-white/10' 
        : 'bg-transparent'
    }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex-shrink-0">
            {userInfo ? (
              <Link to="/" className="flex items-center">
                <motion.span 
                  className="text-2xl font-bold text-white drop-shadow-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Dance<span className="text-sunset">Mate</span>
                </motion.span>
              </Link>
            ) : (
              <Link 
                to="/"
                className="flex items-center"
              >
                <motion.span 
                  className="text-2xl font-bold text-white drop-shadow-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Dance<span className="text-sunset">Mate</span>
                </motion.span>
              </Link>
            )}
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {!userInfo && (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleScrollTo('home')}
                  className="text-white hover:text-sunset px-3 py-2 rounded-xl text-sm font-medium transition-colors duration-200"
                >
                  Home
                </button>
                <button
                  onClick={() => handleScrollTo('about')}
                  className="text-white hover:text-sunset px-3 py-2 rounded-xl text-sm font-medium transition-colors duration-200"
                >
                  About
                </button>
                <button
                  onClick={() => handleScrollTo('services')}
                  className="text-white hover:text-sunset px-3 py-2 rounded-xl text-sm font-medium transition-colors duration-200"
                >
                  Services
                </button>
                <button
                  onClick={() => handleScrollTo('dance-schools')}
                  className="text-white hover:text-sunset px-3 py-2 rounded-xl text-sm font-medium transition-colors duration-200"
                >
                  Schools
                </button>
                <button
                  onClick={() => handleScrollTo('how-it-works')}
                  className="text-white hover:text-sunset px-3 py-2 rounded-xl text-sm font-medium transition-colors duration-200"
                >
                  How It Works
                </button>
                <button
                  onClick={() => handleScrollTo('benefits')}
                  className="text-white hover:text-sunset px-3 py-2 rounded-xl text-sm font-medium transition-colors duration-200"
                >
                  Benefits
                </button>
                <button
                  onClick={() => handleScrollTo('reviews')}
                  className="text-white hover:text-sunset px-3 py-2 rounded-xl text-sm font-medium transition-colors duration-200"
                >
                  Reviews
                </button>
                <button
                  onClick={() => handleScrollTo('contact')}
                  className="text-white hover:text-sunset px-3 py-2 rounded-xl text-sm font-medium transition-colors duration-200"
                >
                  Contact
                </button>
              </div>
            )}
            
            {userInfo && (
              <Menu as="div" className="relative">
                <Menu.Button className="flex items-center space-x-2 text-white hover:text-sunset px-3 py-2 rounded-xl text-sm font-medium transition-colors duration-200">
                  <span className="text-sunset">{userInfo.name}</span>
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
                  <Menu.Items className="absolute right-0 mt-2 w-56 rounded-xl shadow-glow bg-gradient-to-br from-primary/95 via-secondary/95 to-accent/95 backdrop-blur-lg border border-white/20 transition-colors duration-200 overflow-hidden">
                    <div className="py-1">
                      {userInfo.role === 'superadmin' && (
                        <>
                          <Menu.Item>
                            {({ active }) => (
                              <Link to="/superadminhome" className={`block px-4 py-3 text-sm ${
                                active ? 'bg-white/20' : ''
                              } text-white hover:bg-white/10 transition-colors duration-200`}>
                                Dashboard
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link to="/schools/create" className={`block px-4 py-3 text-sm ${
                                active ? 'bg-light-hover dark:bg-dark-hover' : ''
                              } text-white hover:bg-white/10 transition-colors duration-200`}>
                                Add School
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link to="/usertable" className={`block px-4 py-3 text-sm ${
                                active ? 'bg-light-hover dark:bg-dark-hover' : ''
                              } text-white hover:bg-white/10 transition-colors duration-200`}>
                                All Users
                              </Link>
                            )}
                          </Menu.Item>
                        </>
                      )}
                    
                      {userInfo.role === 'schooladmin' && (
                        <>
                          <Menu.Item>
                            {({ active }) => (
                              <Link to="/schooladminhome" className={`block px-4 py-3 text-sm ${
                                active ? 'bg-light-hover dark:bg-dark-hover' : ''
                              } text-white hover:bg-white/10 transition-colors duration-200`}>
                                Dashboard
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link to="/schooladmin/teachers" className={`block px-4 py-3 text-sm ${
                                active ? 'bg-light-hover dark:bg-dark-hover' : ''
                              } text-white hover:bg-white/10 transition-colors duration-200`}>
                                Teachers
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link to="/schooladmin/students" className={`block px-4 py-3 text-sm ${
                                active ? 'bg-light-hover dark:bg-dark-hover' : ''
                              } text-white hover:bg-white/10 transition-colors duration-200`}>
                                Students
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link to="/createslots" className={`block px-4 py-3 text-sm ${
                                active ? 'bg-light-hover dark:bg-dark-hover' : ''
                              } text-white hover:bg-white/10 transition-colors duration-200`}>
                                Create Slot
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link to="/slotsview" className={`block px-4 py-3 text-sm ${
                                active ? 'bg-light-hover dark:bg-dark-hover' : ''
                              } text-white hover:bg-white/10 transition-colors duration-200`}>
                                View Schedule
                              </Link>
                            )}
                          </Menu.Item>
                        </>
                      )}
                      
                      {userInfo.role === 'admin' && (
                        <>
                          <Menu.Item>
                            {({ active }) => (
                              <Link to="/adminhome" className={`block px-4 py-3 text-sm ${
                                active ? 'bg-light-hover dark:bg-dark-hover' : ''
                              } text-white hover:bg-white/10 transition-colors duration-200`}>
                                Home
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link to="/createslots" className={`block px-4 py-3 text-sm ${
                                active ? 'bg-light-hover dark:bg-dark-hover' : ''
                              } text-white hover:bg-white/10 transition-colors duration-200`}>
                                Create Slot
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link to="/slotsview" className={`block px-4 py-3 text-sm ${
                                active ? 'bg-light-hover dark:bg-dark-hover' : ''
                              } text-white hover:bg-white/10 transition-colors duration-200`}>
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
                              } text-white hover:bg-white/10 transition-colors duration-200`}>
                                Dashboard
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link to="/createslots" className={`block px-4 py-3 text-sm ${
                                active ? 'bg-light-hover dark:bg-dark-hover' : ''
                              } text-white hover:bg-white/10 transition-colors duration-200`}>
                                Create Slot
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link to="/slotsview" className={`block px-4 py-3 text-sm ${
                                active ? 'bg-light-hover dark:bg-dark-hover' : ''
                              } text-white hover:bg-white/10 transition-colors duration-200`}>
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
                              active ? 'bg-white/20' : ''
                            } text-white hover:bg-white/10 transition-colors duration-200`}
                          >
                            Logout
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-white hover:bg-white/20 transition-colors duration-200 focus:outline-none"
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
                {!userInfo && (
                  <>
                    <button
                      onClick={() => handleScrollTo('home')}
                      className="block w-full text-left px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
                    >
                      Home
                    </button>
                    <button
                      onClick={() => handleScrollTo('about')}
                      className="block w-full text-left px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
                    >
                      About
                    </button>
                    <button
                      onClick={() => handleScrollTo('services')}
                      className="block w-full text-left px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
                    >
                      Services
                    </button>
                    <button
                      onClick={() => handleScrollTo('dance-schools')}
                      className="block w-full text-left px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
                    >
                      Schools
                    </button>
                    <button
                      onClick={() => handleScrollTo('how-it-works')}
                      className="block w-full text-left px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
                    >
                      How It Works
                    </button>
                    <button
                      onClick={() => handleScrollTo('benefits')}
                      className="block w-full text-left px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
                    >
                      Benefits
                    </button>
                    <button
                      onClick={() => handleScrollTo('reviews')}
                      className="block w-full text-left px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
                    >
                      Reviews
                    </button>
                    <button
                      onClick={() => handleScrollTo('contact')}
                      className="block w-full text-left px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
                    >
                      Contact
                    </button>
                    <div className="border-t border-white/10 my-2"></div>
                  </>
                )}
                
                {userInfo && (
                  <>
                    <div className="px-3 py-2 text-sunset font-medium">{userInfo.name}</div>
                    {userInfo.role === 'superadmin' && (
                      <>
                        <Link to="/superadminhome" className="block px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200">Dashboard</Link>
                        <Link to="/schools/create" className="block px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200">Add School</Link>
                        <Link to="/usertable" className="block px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200">All Users</Link>
                      </>
                    )}
                    
                    {userInfo.role === 'schooladmin' && (
                      <>
                        <Link to="/schooladminhome" className="block px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200">Dashboard</Link>
                        <Link to="/schooladmin/teachers" className="block px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200">Teachers</Link>
                        <Link to="/schooladmin/students" className="block px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200">Students</Link>
                        <Link to="/createslots" className="block px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200">Create Slot</Link>
                        <Link to="/slotsview" className="block px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200">View Schedule</Link>
                      </>
                    )}
                    
                    {userInfo.role === 'admin' && (
                      <>
                        <Link to="/adminhome" className="block px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200">Home</Link>
                        <Link to="/createslots" className="block px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200">Create Slot</Link>
                        <Link to="/slotsview" className="block px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200">View Schedule</Link>
                      </>
                    )}
                    {userInfo.isActive && userInfo.role === 'teacher' && (
                      <>
                        <Link to="/teacherhome" className="block px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200">Dashboard</Link>
                        <Link to="/createslots" className="block px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200">Create Slot</Link>
                        <Link to="/slotsview" className="block px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200">View Schedule</Link>
                      </>
                    )}
                    {userInfo.isActive && userInfo.role === 'student' && (
                      <Link to="/studenthome" className="block px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200">Dashboard</Link>
                    )}
                    <Link to="/profile" className="block px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200">Profile</Link>
                    <button
                      onClick={logoutHandler}
                      className="block w-full text-left px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
                    >
                      Logout
                    </button>
                  </>
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