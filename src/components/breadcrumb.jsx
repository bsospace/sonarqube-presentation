import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { navItems } from '../../utils/constants';

const Breadcrumb = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = navItems.find(item => item.path === location.pathname);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li>
            <button 
              onClick={() => navigate('/')}
              className="text-gray-600 hover:text-pink-500"
            >
              Home
            </button>
          </li>
          {currentPage && (
            <li>
              <div className="flex items-center">
                <span className="text-gray-400 mx-2">/</span>
                <span className="text-pink-600">
                  {currentPage.label}
                </span>
              </div>
            </li>
          )}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;