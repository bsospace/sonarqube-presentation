import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { navItems } from '../../utils/constants';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="bg-white shadow-lg fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                SonarQube
              </span>
            </div>
            
            {/* Navigation Items */}
            <div className="hidden md:ml-6 md:flex md:space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`inline-flex items-center px-3 py-2 text-sm font-medium transition-colors duration-200
                    ${location.pathname === item.path 
                      ? 'text-pink-600 border-b-2 border-pink-500' 
                      : 'text-gray-600 hover:text-pink-500'}`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;