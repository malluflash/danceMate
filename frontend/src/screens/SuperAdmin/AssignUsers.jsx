import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import SuperAdminUserTable from '../../components/SuperAdminUserTable';

const AssignUsersPage = () => {
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
          <h1 className="text-2xl font-bold text-gray-900">Add Users to Schools</h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-gray-600 mb-4">
            Edit users below to assign them to schools. Click the edit icon on any user to change their school assignment.
          </p>
          <SuperAdminUserTable />
        </div>
      </div>
    </div>
  );
};

export default AssignUsersPage;

