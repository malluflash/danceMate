import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { ArrowPathIcon, UsersIcon, AcademicCapIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import HomeStats from "../../components/HomeStats";
import SchoolUserTable from "../../components/SchoolUserTable";

const SchoolAdminHome = () => {
  const [school, setSchool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [teacherCount, setTeacherCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchSchoolData = async () => {
      try {
        const schoolResponse = await axios.get('/api/schooladmin/school');
        setSchool(schoolResponse.data);
        
        const teachersResponse = await axios.get('/api/schooladmin/teachers');
        setTeacherCount(teachersResponse.data.length);
        
        const studentsResponse = await axios.get('/api/schooladmin/students');
        setStudentCount(studentsResponse.data.length);
        
        setLoading(false);
      } catch (error) {
        toast.error(error?.response?.data?.message || 'Failed to load school data');
        setLoading(false);
      }
    };
    
    fetchSchoolData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-purple-pink-vertical flex justify-center items-center">
        <ArrowPathIcon className="h-12 w-12 text-white animate-spin" />
      </div>
    );
  }

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
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
            Welcome, {userInfo.name}
          </h1>
          <p className="text-white/90">
            Manage {school ? school.name : 'your dance school'} from one place
          </p>
        </motion.div>

        <HomeStats userType="schooladmin" />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="transform hover:scale-105 transition-transform duration-200">
            <div className="card-gradient text-white h-full rounded-xl p-6 hover:shadow-glow transition-all duration-300">
              <div className="text-sunset mb-4"><TeachersIcon className="h-10 w-10" /></div>
              <h3 className="text-xl font-semibold mb-2 text-white">Teachers</h3>
              <p className="text-4xl font-bold text-white mb-2">{teacherCount}</p>
              <p className="text-white/80">Manage your school's teachers</p>
              <Link to="/schooladmin/teachers" className="mt-4 inline-block text-sunset hover:text-white transition-colors">
                View Teachers →
              </Link>
            </div>
          </div>

          <div className="transform hover:scale-105 transition-transform duration-200">
            <div className="card-gradient text-white h-full rounded-xl p-6 hover:shadow-glow transition-all duration-300">
              <div className="text-sunset mb-4"><UsersIcon className="h-10 w-10" /></div>
              <h3 className="text-xl font-semibold mb-2 text-white">Students</h3>
              <p className="text-4xl font-bold text-white mb-2">{studentCount}</p>
              <p className="text-white/80">Manage your school's students</p>
              <Link to="/schooladmin/students" className="mt-4 inline-block text-sunset hover:text-white transition-colors">
                View Students →
              </Link>
            </div>
          </div>
          
          <Link 
            to="/createslots"
            className="transform hover:scale-105 transition-transform duration-200"
          >
            <div className="card-gradient text-white h-full rounded-xl p-6 hover:shadow-glow transition-all duration-300">
              <div className="text-sunset text-4xl mb-4">📅</div>
              <h3 className="text-xl font-semibold mb-2 text-white">Manage Schedule</h3>
              <p className="text-white/80">Create and manage dance class schedules</p>
            </div>
          </Link>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="card-gradient p-6 rounded-xl"
        >
          <SchoolUserTable />
        </motion.div>
      </div>
    </div>
  );
};

const TeachersIcon = ({ className }) => (
  <AcademicCapIcon className={className} />
);

export default SchoolAdminHome; 