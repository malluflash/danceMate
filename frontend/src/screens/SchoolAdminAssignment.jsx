import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { 
  BuildingOfficeIcon, 
  EnvelopeIcon, 
  MagnifyingGlassIcon, 
  UserPlusIcon 
} from '@heroicons/react/24/outline';

const SchoolAdminAssignment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [school, setSchool] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchEmail, setSearchEmail] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  
  useEffect(() => {
    fetchData();
  }, [id]);
  
  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch school data
      const schoolResponse = await axios.get(`/api/schools/${id}`);
      setSchool(schoolResponse.data);
      
      // Fetch users that could be school admins
      const usersResponse = await axios.get('/api/users');
      setUsers(usersResponse.data.filter(user => 
        user.role !== 'superadmin' && user.role !== 'schooladmin'
      ));
      
      setLoading(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to load data');
      setLoading(false);
      navigate('/superadminhome');
    }
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    
    if (!searchEmail.trim()) {
      return;
    }
    
    const user = users.find(u => u.email.toLowerCase() === searchEmail.toLowerCase());
    
    if (user) {
      setSelectedUser(user);
    } else {
      toast.error('User not found. Please check the email address.');
    }
  };
  
  const handleAssign = async () => {
    try {
      setSubmitting(true);
      
      await axios.put(`/api/schools/${id}/assign-admin`, {
        userId: selectedUser._id
      });
      
      toast.success(`${selectedUser.name} has been assigned as school admin`);
      navigate('/superadminhome');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to assign school admin');
      setSubmitting(false);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (!school) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <p className="text-gray-900 text-lg">School not found.</p>
            <button
              onClick={() => navigate('/superadminhome')}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4 sm:px-6 lg:px-8 pb-12">
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-8"
        >
          <div className="flex items-center mb-6">
            <UserPlusIcon className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">Assign School Admin</h1>
          </div>
          
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h2 className="text-lg font-medium text-gray-900 mb-2 flex items-center">
              <BuildingOfficeIcon className="h-5 w-5 mr-2 text-blue-600" />
              {school.name}
            </h2>
            <p className="text-gray-600 text-sm">{school.address}, {school.city}</p>
            
            {school.adminId ? (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800 text-sm">
                  This school already has an admin assigned. Assigning a new admin will replace the current one.
                </p>
              </div>
            ) : null}
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Find User by Email</h3>
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-grow">
                <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={searchEmail}
                  onChange={(e) => setSearchEmail(e.target.value)}
                  placeholder="Enter user email"
                  className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <MagnifyingGlassIcon className="h-5 w-5 mr-1" />
                Search
              </button>
            </form>
          </div>
          
          {selectedUser && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200"
            >
              <h3 className="text-lg font-medium text-gray-900 mb-2">Selected User</h3>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                  {selectedUser.name.charAt(0).toUpperCase()}
                </div>
                <div className="ml-4">
                  <p className="text-gray-900 font-medium">{selectedUser.name}</p>
                  <p className="text-gray-600">{selectedUser.email}</p>
                  <p className="text-gray-600 text-sm">Current role: {selectedUser.role}</p>
                </div>
              </div>
            </motion.div>
          )}
          
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={() => navigate('/superadminhome')}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!selectedUser || submitting}
              onClick={handleAssign}
              className={`px-6 py-2 bg-blue-600 text-white rounded-lg transition-colors flex items-center ${
                !selectedUser || submitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
              }`}
            >
              {submitting ? (
                <>
                  <span className="animate-spin h-4 w-4 border-t-2 border-b-2 border-white rounded-full mr-2"></span>
                  <span>Assigning...</span>
                </>
              ) : (
                <>
                  <UserPlusIcon className="h-5 w-5 mr-1" />
                  Assign as School Admin
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SchoolAdminAssignment; 