import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircleIcon, 
  XCircleIcon,
  PencilIcon, 
  UserPlusIcon,
  BuildingOfficeIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

const SchoolsList = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/schools');
      setSchools(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching schools:', error);
      toast.error(error?.response?.data?.message || 'Failed to load schools');
      setLoading(false);
    }
  };

  const handleStatusToggle = async (schoolId, isActive) => {
    try {
      await axios.put(`/api/schools/${schoolId}`, {
        isActive: !isActive
      });
      
      toast.success(`School ${isActive ? 'deactivated' : 'activated'} successfully`);
      fetchSchools();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to update school');
    }
  };

  const filteredSchools = schools?.filter(school => 
    school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 md:mb-0">Dance Schools</h2>
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search schools..."
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>
      </div>

      {filteredSchools.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <BuildingOfficeIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">No schools found. Create a new school to get started.</p>
          <Link 
            to="/schools/create"
            className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add New School
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredSchools.map((school) => (
              <motion.div
                key={school._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <BuildingOfficeIcon className="h-6 w-6 text-blue-600 mr-2" />
                      <h3 className="text-lg font-semibold text-gray-900">{school.name}</h3>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      school.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {school.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPinIcon className="h-4 w-4 mr-2 text-gray-400" />
                      {school.city}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <EnvelopeIcon className="h-4 w-4 mr-2 text-gray-400" />
                      {school.email}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <PhoneIcon className="h-4 w-4 mr-2 text-gray-400" />
                      {school.contactNumber}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                    <div className="flex space-x-2">
                      <Link
                        to={`/schools/${school._id}`}
                        className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                        title="Edit School"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </Link>
                      <Link
                        to={`/schools/${school._id}/assign-admin`}
                        className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                        title="Assign Admin"
                      >
                        <UserPlusIcon className="h-5 w-5" />
                      </Link>
                      <button
                        onClick={() => handleStatusToggle(school._id, school.isActive)}
                        className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                        title={school.isActive ? 'Deactivate School' : 'Activate School'}
                      >
                        {school.isActive ? (
                          <XCircleIcon className="h-5 w-5" />
                        ) : (
                          <CheckCircleIcon className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    
                    <Link
                      to={`/schools/${school._id}/users`}
                      className="text-sm text-blue-600 hover:text-blue-700 transition-colors font-medium"
                    >
                      View Users →
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default SchoolsList; 