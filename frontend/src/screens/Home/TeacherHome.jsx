import { Link } from 'react-router-dom';
import FeaturedDanceSection from "../../components/FeaturedDanceSection";
import HomeStats from "../../components/HomeStats";
import { motion } from 'framer-motion';

const TeacherHome = () => {
  return (
    <div className="min-h-screen bg-gradient-purple-pink-vertical pt-24 px-4 sm:px-6 lg:px-8 pb-12 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl opacity-60 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-accent/20 rounded-full filter blur-3xl opacity-60 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">Welcome, Teacher</h1>
          <p className="text-white/90">Manage your classes and connect with students</p>
        </motion.div>

        <HomeStats userType="teacher" />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <Link 
            to="/createslots"
            className="transform hover:scale-105 transition-transform duration-200"
          >
            <div className="card-gradient text-white h-full rounded-xl p-6 hover:shadow-glow transition-all duration-300">
              <div className="text-sunset text-4xl mb-4">📅</div>
              <h3 className="text-xl font-semibold mb-2 text-white">Create Slots</h3>
              <p className="text-white/80">Schedule new dance classes and manage your availability</p>
            </div>
          </Link>

          <Link 
            to="/profile"
            className="transform hover:scale-105 transition-transform duration-200"
          >
            <div className="card-gradient text-white h-full rounded-xl p-6 hover:shadow-glow transition-all duration-300">
              <div className="text-sunset text-4xl mb-4">👤</div>
              <h3 className="text-xl font-semibold mb-2 text-white">Profile</h3>
              <p className="text-white/80">View and update your account settings</p>
            </div>
          </Link>

          <Link 
            to="/slotsview"
            className="transform hover:scale-105 transition-transform duration-200"
          >
            <div className="card-gradient text-white h-full rounded-xl p-6 hover:shadow-glow transition-all duration-300">
              <div className="text-sunset text-4xl mb-4">👁️</div>
              <h3 className="text-xl font-semibold mb-2 text-white">View Slots</h3>
              <p className="text-white/80">Monitor your scheduled classes and bookings</p>
            </div>
          </Link>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="card-gradient p-6 rounded-xl"
        >
          <h2 className="text-2xl font-bold text-white mb-6 drop-shadow-lg">Featured Dance Styles</h2>
          <FeaturedDanceSection />
        </motion.div>
      </div>
    </div>
  );
};

export default TeacherHome;
