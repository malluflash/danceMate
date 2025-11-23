import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { 
  AcademicCapIcon,
  CheckCircleIcon, 
  XCircleIcon, 
  PencilIcon,
  ArrowLeftIcon,
  UserPlusIcon
} from '@heroicons/react/24/outline';

const SchoolTeachersView = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  
  useEffect(() => {
    fetchTeachers();
  }, []);
  
  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/schooladmin/teachers');
      setTeachers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching teachers:', error);
      toast.error(error?.response?.data?.message || 'Failed to load teachers');
      setLoading(false);
    }
  };
  
  const handleStatusChange = async (userId, isActive) => {
    try {
      await axios.put(`/api/schooladmin/users/${userId}`, {
        isActive
      });
      
      toast.success(`Teacher ${isActive ? 'activated' : 'deactivated'} successfully`);
      setEditingId(null);
      fetchTeachers();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to update teacher');
    }
  };
  
  const filteredTeachers = teachers?.filter(teacher => 
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary to-primary flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary to-primary pt-10 px-4 pb-12">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link 
            to="/schooladminhome" 
            className="inline-flex items-center text-white/70 hover:text-white mb-4"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Link>
          
          <div className="flex items-center">
            <AcademicCapIcon className="h-8 w-8 text-accent mr-3" />
            <h1 className="text-2xl font-bold text-white">Manage Teachers</h1>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4"
        >
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search teachers..."
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
          
          <Link
            to="/schooladmin/adduser?role=teacher"
            className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/80 transition-colors flex items-center"
          >
            <UserPlusIcon className="h-5 w-5 mr-1" />
            Add Teacher
          </Link>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/10 p-6"
        >
          {filteredTeachers.length === 0 ? (
            <div className="text-center py-12">
              <AcademicCapIcon className="h-12 w-12 text-white/30 mx-auto mb-4" />
              <p className="text-white/70">No teachers found. Add a teacher to get started.</p>
              <Link
                to="/schooladmin/adduser?role=teacher"
                className="mt-4 inline-block px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/80 transition-colors"
              >
                Add Teacher
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-white/10">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Teacher</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {filteredTeachers.map((teacher) => (
                    <tr key={teacher._id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                            {teacher.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-white">{teacher.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white/80">{teacher.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white/80">{teacher.contactNumber}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingId !== teacher._id ? (
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            teacher.isActive 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {teacher.isActive ? (
                              <CheckCircleIcon className="mr-1 h-4 w-4" />
                            ) : (
                              <XCircleIcon className="mr-1 h-4 w-4" />
                            )}
                            {teacher.isActive ? 'Active' : 'Inactive'}
                          </span>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleStatusChange(teacher._id, true)}
                              className={`p-1 rounded ${teacher.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
                            >
                              <CheckCircleIcon className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleStatusChange(teacher._id, false)}
                              className={`p-1 rounded ${!teacher.isActive ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}
                            >
                              <XCircleIcon className="h-5 w-5" />
                            </button>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                        <button
                          onClick={() => setEditingId(editingId === teacher._id ? null : teacher._id)}
                          className="text-accent hover:text-white transition-colors"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SchoolTeachersView; 