import { Link } from 'react-router-dom';
import { PlusCircleIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import SchoolsListComponent from '../../components/SchoolsList';

const SchoolsListPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4 sm:px-6 lg:px-8 pb-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <Link
              to="/superadminhome"
              className="mr-4 p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">All Schools</h1>
          </div>
          <Link
            to="/schools/create"
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <PlusCircleIcon className="h-5 w-5 mr-2" />
            Create New School
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <SchoolsListComponent />
        </div>
      </div>
    </div>
  );
};

export default SchoolsListPage;

