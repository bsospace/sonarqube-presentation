import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { navItems } from '../../utils/constants';

const MobileNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="md:hidden fixed bottom-0 w-full bg-white shadow-lg z-10">
      <div className="flex justify-around py-2">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center p-2 rounded-lg
              ${location.pathname === item.path 
                ? 'text-pink-600' 
                : 'text-gray-600'}`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileNavigation;