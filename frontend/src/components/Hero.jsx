import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-light-bg dark:bg-dark-bg overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/10 z-0"></div>
      
      {/* Decorative circles */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 dark:bg-primary/20 rounded-full filter blur-3xl opacity-70"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/10 dark:bg-accent/20 rounded-full filter blur-3xl opacity-70"></div>
      
      <div className="container-custom relative z-10 py-20">
        <motion.div 
          className="text-center max-w-4xl mx-auto"
          initial="hidden"
          animate="show"
          variants={container}
        >
          <motion.h1 
            className="mb-6 font-bold"
            variants={item}
          >
            Welcome to <span className="gradient-text">Dance Mate</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-light-text/80 dark:text-dark-text/80 max-w-3xl mx-auto mb-10"
            variants={item}
          >
            An innovative online platform committed to elevating your dance education journey.
            Experience accessible, interactive, and community-driven dance instruction
            that transforms the way you learn and grow.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
            variants={item}
          >
            <Link
              to="/login"
              className="btn btn-primary"
            >
              Get Started
            </Link>
            <Link
              to="/register"
              className="btn btn-outline"
            >
              Sign Up
            </Link>
          </motion.div>
          
          {/* Features Section */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
            variants={container}
          >
            <motion.div 
              className="card dark:bg-dark-card/50 backdrop-blur-lg"
              variants={item}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <div className="text-accent text-4xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Personalized Learning</h3>
              <p className="text-light-text/70 dark:text-dark-text/70">Tailored dance programs that match your skill level and goals</p>
            </motion.div>
            
            <motion.div 
              className="card dark:bg-dark-card/50 backdrop-blur-lg"
              variants={item}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <div className="text-accent text-4xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Instructors</h3>
              <p className="text-light-text/70 dark:text-dark-text/70">Learn from professional dancers with years of experience</p>
            </motion.div>
            
            <motion.div 
              className="card dark:bg-dark-card/50 backdrop-blur-lg"
              variants={item}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <div className="text-accent text-4xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Flexible Schedule</h3>
              <p className="text-light-text/70 dark:text-dark-text/70">Book classes that fit your schedule and lifestyle</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;