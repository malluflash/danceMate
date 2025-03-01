import { useState } from 'react';
import { useUserTableQuery, useEditUserMutation } from "../Slices/adminApiSlice";
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  PencilIcon, 
  UserIcon, 
  AcademicCapIcon, 
  UserGroupIcon 
} from '@heroicons/react/24/outline';

const EnhancedUserTable = () => {
  const { data: users, isLoading, refetch } = useUserTableQuery();
  const [editUser] = useEditUserMutation();
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  const handleStatusChange = async (userId, newRole, userStatus) => {
    try {
      const response = await editUser({
        id: userId,
        role: newRole,
        isActive: userStatus,
      });

      if (response) {
        refetch();
        setEditingId(null);
      }
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  const filteredUsers = users?.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleIcon = (role) => {
    switch(role) {
      case 'admin':
        return <UserGroupIcon className="h-5 w-5 text-purple-500" />;
      case 'teacher':
        return <AcademicCapIcon className="h-5 w-5 text-blue-500" />;
      case 'student':
        return <UserIcon className="h-5 w-5 text-green-500" />;
      default:
        return <UserIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white mb-4 md:mb-0">User Management</h2>
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search users..."
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
      </div>

      <div className="overflow-x-auto bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
        <table className="min-w-full divide-y divide-white/10">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            <AnimatePresence>
              {filteredUsers?.map((user) => (
                <motion.tr 
                  key={user._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white">{user.name}</div>
                        <div className="text-sm text-white/60">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">{user.contactNumber || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.role === "admin" || editingId !== user._id ? (
                      <div className="flex items-center">
                        {getRoleIcon(user.role)}
                        <span className="ml-2 text-sm text-white capitalize">{user.role}</span>
                      </div>
                    ) : (
                      <select
                        className="bg-white/10 border border-white/20 rounded px-3 py-1 text-sm text-white focus:outline-none focus:ring-2 focus:ring-accent/50"
                        value={user.role}
                        onChange={(e) => handleStatusChange(user._id, e.target.value, user.isActive)}
                      >
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                      </select>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.role === "admin" || editingId !== user._id ? (
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
                    ) : (
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleStatusChange(user._id, user.role, true)}
                          className={`p-1 rounded ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
                        >
                          <CheckCircleIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleStatusChange(user._id, user.role, false)}
                          className={`p-1 rounded ${!user.isActive ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}
                        >
                          <XCircleIcon className="h-5 w-5" />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {user.role !== "admin" && (
                      <button
                        onClick={() => setEditingId(editingId === user._id ? null : user._id)}
                        className="text-accent hover:text-white transition-colors"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                    )}
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnhancedUserTable; 