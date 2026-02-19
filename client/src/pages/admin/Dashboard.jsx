import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = 'http://localhost:5050/api';

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/events`, { withCredentials: true });
        setEvents(res.data);
      } catch (err) {
        setError('Failed to fetch events.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="flex w-full overflow-x-hidden">
      <Sidebar />
      <div className="flex-1 ml-64 w-full max-w-[90%]">
        <Header pageTitle="Dashboard" />
        <main className="p-8 bg-gray-50 min-h-[calc(100vh-64px)] w-full max-w-[90%]">

          {/* Hero Banner */}
          <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl overflow-hidden shadow-lg mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
              <div className="p-8 md:p-12">
                <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
                  Discover Upcoming Events <br /> At a Glance.
                </h1>
                <p className="text-lg text-blue-100 mb-6">
                  Stay informed and engaged with all the exciting events happening around you.
                </p>
                <button className="bg-white text-blue-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
                  Explore Events
                </button>
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Upcoming Events</h3>
            {loading ? (
              <div className="text-center text-gray-600 py-8">Loading events...</div>
            ) : error ? (
              <div className="text-center text-red-600 py-8">{error}</div>
            ) : events.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {events.map(event => (
                  <div
                    key={event._id}
                    className="bg-gray-100 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
                  >
                    <img
                      src={event.imageUrl || 'https://via.placeholder.com/300x180?text=Event+Image'}
                      alt={event.name}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">{event.name}</h4>
                      <p className="text-sm text-gray-600 mb-1">
                        Date: {event.date ? new Date(event.date).toLocaleDateString() : 'TBA'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {event.location || 'Location TBA'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-600 py-8">No upcoming events found.</div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
