import { useSelector } from "react-redux";
import SuperAdminUserTable from "../../components/SuperAdminUserTable";
import EnhancedUserTable from "../../components/EnhancedUserTable";

const UserTable = () => {
  const { userInfo } = useSelector((state) => state.auth);

  // Super admin gets the full-featured table with all editing capabilities
  if (userInfo?.role === 'superadmin') {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">All Users</h1>
            <p className="text-gray-600 mt-1">Manage all users in the platform</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <SuperAdminUserTable />
          </div>
        </div>
      </div>
    );
  }

  // Legacy admin (or other roles) get the enhanced table
  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4 sm:px-6 lg:px-8 pb-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">All Users</h1>
          <p className="text-gray-600 mt-1">Manage all users in the platform</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <EnhancedUserTable />
        </div>
      </div>
    </div>
  );
};

export default UserTable;
