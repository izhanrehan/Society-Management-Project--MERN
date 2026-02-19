// src/components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom'; // Assuming you're using react-router-dom

const Sidebar = () => {
  return (
    <div className="w-64 bg-white shadow-md h-screen fixed top-0 left-0 flex flex-col justify-between py-6">
      <div>
        <div className="text-2xl font-bold text-gray-800 px-6 mb-8">LOGO</div> {/*  */}
        <nav className="space-y-4">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `flex items-center px-6 py-2 text-gray-700 hover:bg-gray-100 ${isActive ? 'bg-gray-100 font-semibold' : ''}`
            }
          >
            Dashboard {/*  */}
          </NavLink>
          <NavLink
            to="/admin/Manage-Events"
            className={({ isActive }) =>
              `flex items-center px-6 py-2 text-gray-700 hover:bg-gray-100 ${isActive ? 'bg-gray-100 font-semibold' : ''}`
            }
          >
            Events {/*  */}
          </NavLink>
          <NavLink
            to="/admin/track-attendees"
            className={({ isActive }) =>
              `flex items-center px-6 py-2 text-gray-700 hover:bg-gray-100 ${isActive ? 'bg-gray-100 font-semibold' : ''}`
            }
          >
            Attendees {/*  */}
          </NavLink>
          {/* Add link for Society Profile */}
          <NavLink
            to="/admin/profile"
            className={({ isActive }) =>
              `flex items-center px-6 py-2 text-gray-700 hover:bg-gray-100 ${isActive ? 'bg-gray-100 font-semibold' : ''}`
            }
          >
            Society Profile {/* Based on Society Profile Page in Figma  */}
          </NavLink>
        </nav>
      </div>
      <div className="px-6 text-sm text-gray-500">
        Society Name {/*  */}
      </div>
    </div>
  );
};

export default Sidebar;