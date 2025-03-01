import { Link } from 'react-router-dom';
import EnhancedUserTable from "../../components/EnhancedUserTable";
import HomeStats from "../../components/HomeStats";
import { motion } from 'framer-motion';

const AdminHome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary pt-20 px-4 pb-12">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Welcome, Admin</h1>
          <p className="text-white/70">Manage your dance studio platform from one place</p>
        </motion.div>

        <HomeStats userType="admin" />

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
            <div className="card bg-white/10 backdrop-blur-lg text-white h-full border border-white/10 rounded-xl p-6 hover:shadow-xl transition-shadow">
              <div className="text-accent text-4xl mb-4">📅</div>
              <h3 className="text-xl font-semibold mb-2">Create Slots</h3>
              <p className="text-gray-300">Schedule new dance classes and manage time slots</p>
            </div>
          </Link>

          <Link 
            to="/slotsview"
            className="transform hover:scale-105 transition-transform duration-200"
          >
            <div className="card bg-white/10 backdrop-blur-lg text-white h-full border border-white/10 rounded-xl p-6 hover:shadow-xl transition-shadow">
              <div className="text-accent text-4xl mb-4">👁️</div>
              <h3 className="text-xl font-semibold mb-2">View Slots</h3>
              <p className="text-gray-300">Monitor and manage all scheduled dance classes</p>
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
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="card bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/10"
        >
          <EnhancedUserTable />
        </motion.div>
      </div>
    </div>
  );
};

export default AdminHome;
