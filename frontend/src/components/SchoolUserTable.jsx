import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  PencilIcon, 
  UserIcon, 
  AcademicCapIcon,
  EnvelopeIcon,
  PhoneIcon,
  XMarkIcon,
  CheckIcon
} from '@heroicons/react/24/outline';

const SchoolUserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [email, setEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState('student');
  const [showAddUser, setShowAddUser] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/schooladmin/school');
      const schoolId = response.data._id;
      
      const usersResponse = await axios.get(`/api/schools/${schoolId}/users`);
      setUsers(usersResponse.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error(error?.response?.data?.message || 'Failed to load users');
      setLoading(false);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post('/api/schooladmin/users', {
        email,
        role: selectedRole
      });
      
      toast.success(`User added as ${selectedRole}`);
      setEmail('');
      setShowAddUser(false);
      fetchUsers();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to add user');
    }
  };

  const handleEditClick = (user) => {
    setEditingUser({
      _id: user._id,
      name: user.name,
      email: user.email,
      contactNumber: user.contactNumber || '',
      role: user.role,
      isActive: user.isActive
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
      await axios.put(`/api/schooladmin/users/${editingUser._id}`, {
        name: editingUser.name,
        email: editingUser.email,
        contactNumber: editingUser.contactNumber,
        role: editingUser.role,
        isActive: editingUser.isActive
      });
      
      toast.success('User updated successfully');
      setEditingUser(null);
      setEditingId(null);
      fetchUsers();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to update user');
    }
  };

  const handleStatusChange = async (userId, newRole, userStatus) => {
    try {
      await axios.put(`/api/schooladmin/users/${userId}`, {
        role: newRole,
        isActive: userStatus
      });
      
      toast.success('User updated successfully');
      setEditingId(null);
      fetchUsers();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to update user');
    }
  };

  const filteredUsers = users?.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleIcon = (role) => {
    switch(role) {
      case 'teacher':
        return <AcademicCapIcon className="h-5 w-5 text-blue-500" />;
      case 'student':
        return <UserIcon className="h-5 w-5 text-green-500" />;
      default:
        return <UserIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white mb-4 md:mb-0">School Users</h2>
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
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
          <button
            onClick={() => setShowAddUser(!showAddUser)}
            className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/80 transition-colors"
          >
            {showAddUser ? 'Cancel' : 'Add User'}
          </button>
        </div>
      </div>

      {showAddUser && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-6 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10"
        >
          <h3 className="text-lg font-medium text-white mb-4">Add User to School</h3>
          <form onSubmit={handleAddUser} className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <label htmlFor="email" className="sr-only">Email</label>
              <div className="relative">
                <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
                <input
                  id="email"
                  type="email"
                  placeholder="User email address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
              </div>
            </div>
            <div>
              <label htmlFor="role" className="sr-only">Role</label>
              <select
                id="role"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent/50"
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/80 transition-colors"
            >
              Add User
            </button>
          </form>
        </motion.div>
      )}

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
                  {editingId === user._id ? (
                    <>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                            {editingUser.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="ml-4 flex-1">
                            <input
                              type="text"
                              value={editingUser.name}
                              onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                              className="w-full px-2 py-1 bg-white/10 border border-white/20 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                            />
                            <input
                              type="email"
                              value={editingUser.email}
                              onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                              className="w-full mt-1 px-2 py-1 bg-white/10 border border-white/20 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="text"
                          value={editingUser.contactNumber}
                          onChange={(e) => setEditingUser({...editingUser, contactNumber: e.target.value})}
                          className="w-full px-2 py-1 bg-white/10 border border-white/20 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                          placeholder="Contact number"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={editingUser.role}
                          onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}
                          className="bg-white/10 border border-white/20 rounded px-3 py-1 text-sm text-white focus:outline-none focus:ring-2 focus:ring-accent/50"
                        >
                          <option value="student">Student</option>
                          <option value="teacher">Teacher</option>
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={handleSaveEdit}
                            className="text-green-400 hover:text-green-300 transition-colors"
                            title="Save"
                          >
                            <CheckIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="text-red-400 hover:text-red-300 transition-colors"
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
                        <div className="flex items-center text-sm text-white">
                          <PhoneIcon className="h-4 w-4 mr-2 text-white/60" />
                          {user.contactNumber || 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getRoleIcon(user.role)}
                          <span className="ml-2 text-sm text-white capitalize">{user.role}</span>
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                        <button
                          onClick={() => handleEditClick(user)}
                          className="text-accent hover:text-white transition-colors"
                          title="Edit user"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
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

export default SchoolUserTable; 