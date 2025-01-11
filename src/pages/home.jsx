import React from 'react';
import { useNavigate } from 'react-router-dom';
import { cardItems } from '../../utils/constants';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl leading-tight md:text-5xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-4">
          SonarQube The tool for code quality and security.
        </h1>
        <p className="text-lg leading-relaxed text-gray-600 max-w-2xl mx-auto">
          SonarQube เครื่องมือสำหรับตรวจสอบคุณภาพและความปลอดภัยของโค้ด
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {cardItems.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group cursor-pointer"
            onClick={() => navigate(card.path)}
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">{card.icon}</span>
                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-pink-500 transition-colors duration-200">
                  {card.title}
                </h3>
              </div>
              <p className="text-gray-600">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;