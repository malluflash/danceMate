import { Link } from 'react-router-dom';
import {
  BuildingOfficeIcon,
  UserGroupIcon,
  ChartBarIcon,
  HeartIcon,
  DocumentTextIcon,
  FunnelIcon,
  PlusCircleIcon,
  PencilIcon,
  UserPlusIcon
} from '@heroicons/react/24/outline';

const SuperAdminHome = () => {
  const menuItems = [
    {
      title: 'Schools Management',
      icon: BuildingOfficeIcon,
      items: [
        { label: 'List All Schools', path: '/superadmin/schools', icon: BuildingOfficeIcon },
        { label: 'Create New School', path: '/schools/create', icon: PlusCircleIcon },
      ]
    },
    {
      title: 'Users Management',
      icon: UserGroupIcon,
      items: [
        { label: 'All Users', path: '/usertable', icon: UserGroupIcon },
        { label: 'Add Users to Schools', path: '/superadmin/users/assign', icon: UserPlusIcon },
      ]
    },
    {
      title: 'Interests & Analytics',
      icon: HeartIcon,
      items: [
        { label: 'Student Interests', path: '/superadmin/interests/students', icon: HeartIcon },
        { label: 'School Interests', path: '/superadmin/interests/schools', icon: BuildingOfficeIcon },
      ]
    },
    {
      title: 'Content & Marketing',
      icon: DocumentTextIcon,
      items: [
        { label: 'SEO Pages', path: '/superadmin/seo', icon: DocumentTextIcon },
        { label: 'Marketing Funnels', path: '/superadmin/marketing', icon: FunnelIcon },
      ]
    },
    {
      title: 'Analytics',
      icon: ChartBarIcon,
      items: [
        { label: 'Statistics Dashboard', path: '/superadmin/stats', icon: ChartBarIcon },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4 sm:px-6 lg:px-8 pb-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Super Admin Dashboard</h1>
          <p className="text-gray-600">Manage your entire dance platform</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((section, sectionIndex) => (
            <div key={sectionIndex} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <section.icon className="h-6 w-6 text-blue-600 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">{section.title}</h2>
              </div>
              
              <div className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <Link
                    key={itemIndex}
                    to={item.path}
                    className="flex items-center p-3 rounded-md hover:bg-blue-50 transition-colors border border-gray-200 hover:border-blue-300"
                  >
                    <item.icon className="h-5 w-5 text-blue-600 mr-3" />
                    <span className="text-gray-700 font-medium">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuperAdminHome;
