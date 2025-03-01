import { Link } from 'react-router-dom';
import FeaturedDanceSection from "../../components/FeaturedDanceSection";
import HomeStats from "../../components/HomeStats";
import { motion } from 'framer-motion';

const StudentHome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary pt-20 px-4 pb-12">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Welcome, Dancer</h1>
          <p className="text-white/70">Discover and book your favorite dance classes</p>
        </motion.div>

        <HomeStats userType="student" />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <Link 
            to="/bookslots"
            className="transform hover:scale-105 transition-transform duration-200"
          >
            <div className="card bg-white/10 backdrop-blur-lg text-white h-full border border-white/10 rounded-xl p-6 hover:shadow-xl transition-shadow">
              <div className="text-accent text-4xl mb-4">🎫</div>
              <h3 className="text-xl font-semibold mb-2">Book Slots</h3>
              <p className="text-gray-300">Browse and book available dance classes</p>
            </div>
          </Link>

          <Link 
            to="/profile"
            className="transform hover:scale-105 transition-transform duration-200"
          >
            <div className="card bg-white/10 backdrop-blur-lg text-white h-full border border-white/10 rounded-xl p-6 hover:shadow-xl transition-shadow">
              <div className="text-accent text-4xl mb-4">👤</div>
              <h3 className="text-xl font-semibold mb-2">Profile</h3>
              <p className="text-gray-300">View and update your account settings</p>
            </div>
          </Link>

          <Link 
            to="/mybookings"
            className="transform hover:scale-105 transition-transform duration-200"
          >
            <div className="card bg-white/10 backdrop-blur-lg text-white h-full border border-white/10 rounded-xl p-6 hover:shadow-xl transition-shadow">
              <div className="text-accent text-4xl mb-4">📋</div>
              <h3 className="text-xl font-semibold mb-2">My Bookings</h3>
              <p className="text-gray-300">Track your booked classes and schedule</p>
            </div>
          </Link>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="card bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/10"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Featured Dance Styles</h2>
          <FeaturedDanceSection />
        </motion.div>
      </div>
    </div>
  );
};

export default StudentHome;
