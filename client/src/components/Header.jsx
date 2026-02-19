// src/components/Header.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ pageTitle = 'Dashboard' }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/'); // Redirect to main route (Landing page)
  };

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white shadow-sm border-b border-gray-200">
      <h1 className="text-xl font-semibold text-gray-800">
        Society Name - {pageTitle} {/*  */}
      </h1>
      <button className="text-blue-500 hover:text-blue-700 text-sm font-semibold" onClick={handleLogout}>
        Logout {/*  */}
      </button>
    </header>
  );
};

export default Header;