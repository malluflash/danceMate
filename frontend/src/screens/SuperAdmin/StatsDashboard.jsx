import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeftIcon, ChartBarIcon, UserGroupIcon, BuildingOfficeIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

const StatsDashboardPage = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSchools: 0,
    totalTeachers: 0,
    totalStudents: 0,
    activeSchools: 0,
    inactiveSchools: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch users
      const usersRes = await axios.get('/api/admin/userlist');
      const users = usersRes.data;
      
      // Fetch schools
      const schoolsRes = await axios.get('/api/schools');
      const schools = schoolsRes.data;

      setStats({
        totalUsers: users.length,
        totalSchools: schools.length,
        totalTeachers: users.filter(u => u.role === 'teacher').length,
        totalStudents: users.filter(u => u.role === 'student').length,
        activeSchools: schools.filter(s => s.isActive).length,
        inactiveSchools: schools.filter(s => !s.isActive).length
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setLoading(false);
    }
  };

  const statCards = [
    { label: 'Total Users', value: stats.totalUsers, icon: UserGroupIcon, color: 'blue' },
    { label: 'Total Schools', value: stats.totalSchools, icon: BuildingOfficeIcon, color: 'green' },
    { label: 'Teachers', value: stats.totalTeachers, icon: AcademicCapIcon, color: 'purple' },
    { label: 'Students', value: stats.totalStudents, icon: UserGroupIcon, color: 'orange' },
    { label: 'Active Schools', value: stats.activeSchools, icon: BuildingOfficeIcon, color: 'green' },
    { label: 'Inactive Schools', value: stats.inactiveSchools, icon: BuildingOfficeIcon, color: 'red' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4 sm:px-6 lg:px-8 pb-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center">
          <Link
            to="/superadminhome"
            className="mr-4 p-2 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Statistics Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statCards.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <stat.icon className={`h-12 w-12 text-${stat.color}-500`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsDashboardPage;

