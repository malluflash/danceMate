import { useState, useEffect } from 'react';
import { useUserTableQuery, useEditUserMutation, useUpdateUserInfoMutation } from "../Slices/adminApiSlice";
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import axios from 'axios';
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  PencilIcon, 
  UserIcon, 
  AcademicCapIcon, 
  UserGroupIcon,
  BuildingOfficeIcon,
  XMarkIcon,
  CheckIcon
} from '@heroicons/react/24/outline';

const SuperAdminUserTable = () => {
  const { data: users, isLoading, refetch } = useUserTableQuery();
  const [editUser] = useEditUserMutation();
  const [updateUserInfo] = useUpdateUserInfoMutation();
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [schools, setSchools] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      const response = await axios.get('/api/schools');
      setSchools(response.data);
    } catch (error) {
      console.error('Error fetching schools:', error);
    }
  };

  const handleEditClick = (user) => {
    setEditingUser({
      _id: user._id,
      name: user.name,
      email: user.email,
      contactNumber: user.contactNumber || '',
      role: user.role,
      isActive: user.isActive,
      schoolId: user.school?._id || user.school || ''
    });
    setEditingId(user._id);
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setEditingId(null);
  };

  const handleSaveEdit = async () => {
    if (!editingUser) return;

    try {
      await updateUserInfo({
        id: editingUser._id,
        name: editingUser.name,
        email: editingUser.email,
        contactNumber: editingUser.contactNumber,
        role: editingUser.role,
        isActive: editingUser.isActive,
        schoolId: editingUser.schoolId || null
      }).unwrap();

      toast.success('User updated successfully');
      setEditingUser(null);
      setEditingId(null);
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || error?.error || 'Failed to update user');
    }
  };

  const handleQuickStatusChange = async (userId, newStatus) => {
    try {
      const user = users.find(u => u._id === userId);
      if (!user) return;

      await updateUserInfo({
        id: userId,
        isActive: newStatus
      }).unwrap();

      toast.success(`User ${newStatus ? 'activated' : 'deactivated'}`);
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || error?.error || 'Failed to update user status');
    }
  };

  const filteredUsers = users?.filter(user => 
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.school?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleIcon = (role) => {
    switch(role) {
      case 'superadmin':
        return <UserGroupIcon className="h-5 w-5 text-purple-500" />;
      case 'schooladmin':
        return <BuildingOfficeIcon className="h-5 w-5 text-blue-500" />;
      case 'teacher':
        return <AcademicCapIcon className="h-5 w-5 text-green-500" />;
      case 'student':
        return <UserIcon className="h-5 w-5 text-yellow-500" />;
      default:
        return <UserIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">All Users</h2>
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search users, emails, or schools..."
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

      <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">School</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <AnimatePresence>
              {filteredUsers?.map((user) => (
                <motion.tr 
                  key={user._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {editingId === user._id ? (
                    <>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                            {editingUser.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="ml-4 flex-1">
                            <input
                              type="text"
                              value={editingUser.name}
                              onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                              className="w-full px-2 py-1 bg-white border border-gray-300 rounded text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                              type="email"
                              value={editingUser.email}
                              onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                              className="w-full mt-1 px-2 py-1 bg-white border border-gray-300 rounded text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="text"
                          value={editingUser.contactNumber}
                          onChange={(e) => setEditingUser({...editingUser, contactNumber: e.target.value})}
                          className="w-full px-2 py-1 bg-white border border-gray-300 rounded text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Contact number"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={editingUser.role}
                          onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}
                          className="bg-white border border-gray-300 rounded px-3 py-1 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="superadmin">Super Admin</option>
                          <option value="schooladmin">School Admin</option>
                          <option value="teacher">Teacher</option>
                          <option value="student">Student</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={editingUser.schoolId}
                          onChange={(e) => setEditingUser({...editingUser, schoolId: e.target.value})}
                          className="bg-white border border-gray-300 rounded px-3 py-1 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                        >
                          <option value="">No School</option>
                          {schools.map((school) => (
                            <option key={school._id} value={school._id}>
                              {school.name}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setEditingUser({...editingUser, isActive: true})}
                            className={`p-1 rounded ${editingUser.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
                          >
                            <CheckCircleIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => setEditingUser({...editingUser, isActive: false})}
                            className={`p-1 rounded ${!editingUser.isActive ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}
                          >
                            <XCircleIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={handleSaveEdit}
                            className="text-green-600 hover:text-green-700 transition-colors"
                            title="Save"
                          >
                            <CheckIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="text-red-600 hover:text-red-700 transition-colors"
                            title="Cancel"
                          >
                            <XMarkIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                            {user.name?.charAt(0).toUpperCase()}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">{user.contactNumber || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getRoleIcon(user.role)}
                          <span className="ml-2 text-sm text-gray-700 capitalize">{user.role}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">
                          {user.school?.name || 'No School'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {user.isActive ? (
                            <CheckCircleIcon className="mr-1 h-4 w-4" />
                          ) : (
                            <XCircleIcon className="mr-1 h-4 w-4" />
                          )}
                          {user.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEditClick(user)}
                            className="text-blue-600 hover:text-blue-700 transition-colors"
                            title="Edit user"
                          >
                            <PencilIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleQuickStatusChange(user._id, !user.isActive)}
                            className={user.isActive ? "text-red-600 hover:text-red-700" : "text-green-600 hover:text-green-700"}
                            title={user.isActive ? "Deactivate" : "Activate"}
                          >
                            {user.isActive ? (
                              <XCircleIcon className="h-5 w-5" />
                            ) : (
                              <CheckCircleIcon className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SuperAdminUserTable;

