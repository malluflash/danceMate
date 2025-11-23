import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, DocumentTextIcon, PlusCircleIcon } from '@heroicons/react/24/outline';

const SEOPagesPage = () => {
  const [pages] = useState([]);

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
            <h1 className="text-2xl font-bold text-gray-900">SEO Pages</h1>
          </div>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <PlusCircleIcon className="h-5 w-5 mr-2" />
            Create SEO Page
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {pages.length === 0 ? (
            <div className="text-center py-12">
              <DocumentTextIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No SEO pages created yet.</p>
              <p className="text-sm text-gray-500 mt-2">
                Create SEO-optimized pages to improve search engine visibility.
              </p>
            </div>
          ) : (
            <div>
              {/* SEO pages list will go here */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SEOPagesPage;

