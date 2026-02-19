// src/pages/Events.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

const Events = () => {
  const location = useLocation();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchTerm, setSearchTerm] = useState('');

  const API_BASE_URL = 'http://localhost:5050/api';

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const filter = queryParams.get('filter');

    if (filter === 'ended') setActiveTab('ended');
    else setActiveTab('upcoming');

    setSearchTerm('');
  }, [location.search]);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);

      let endpoint = '';
      if (activeTab === 'upcoming') endpoint = `${API_BASE_URL}/events/filter/upcoming`;
      else if (activeTab === 'ended') endpoint = `${API_BASE_URL}/events/filter/ended`;
      else {
        setError('Invalid event category selected.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(endpoint, { withCredentials: true });
        setEvents(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        const errorMessage =
          err.response?.data?.error || err.message || 'Please check your network or try again.';
        setError(`Failed to load ${activeTab} events. ${errorMessage}`);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [activeTab]);

  const filteredEvents = useMemo(() => {
    if (!searchTerm) return events;

    const lower = searchTerm.toLowerCase();

    return events.filter((event) => {
      const nameMatches = (event.name || '').toLowerCase().includes(lower);

      // organizer could be populated object OR just string id
      const organizerName =
        typeof event.organizer === 'object' ? (event.organizer?.name || '') : '';
      const organizerMatches = organizerName.toLowerCase().includes(lower);

      const venueOrLocation = (event.venue || event.location || '');
      const locationMatches = venueOrLocation.toLowerCase().includes(lower);

      return nameMatches || organizerMatches || locationMatches;
    });
  }, [events, searchTerm]);

  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased pt-16">
      <section className="py-10 px-8 sm:px-16 lg:px-24">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">All Events</h1>

        <div className="flex flex-col sm:flex-row justify-center items-center mb-8 space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex space-x-4">
            <button
              onClick={() => {
                setActiveTab('upcoming');
                setSearchTerm('');
              }}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                activeTab === 'upcoming'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Upcoming Events
            </button>

            <button
              onClick={() => {
                setActiveTab('ended');
                setSearchTerm('');
              }}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                activeTab === 'ended'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Ended Events
            </button>
          </div>

          <div className="relative w-full max-w-md sm:ml-auto">
            <input
              type="text"
              placeholder="Search events by name, organizer, or location..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        {loading ? (
          <p className="text-center text-gray-700 text-lg">Loading events...</p>
        ) : error ? (
          <p className="text-center text-red-600 text-lg">{error}</p>
        ) : filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredEvents.map((event) => {
              const image =
                event.banner_image ||
                event.imageUrl ||
                'https://via.placeholder.com/400x200?text=Event+Image';

              const venue = event.venue || event.location || 'Location TBA';
              const dt = event.date_time || event.date;

              const organizerName =
                typeof event.organizer === 'object' ? event.organizer?.name : null;

              return (
                <Link
                  to={`/event-detail/${event._id}`}
                  key={event._id}
                  className="block bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden group"
                >
                  <div className="h-48 w-full overflow-hidden">
                    <img
                      src={image}
                      alt={event.name || 'Event Image'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-5">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors duration-200">
                      {event.name || 'Untitled Event'}
                    </h3>

                    {organizerName && (
                      <p className="text-gray-700 text-sm mb-1">
                        <span className="font-semibold">Organized by: {organizerName}</span>
                      </p>
                    )}

                    <p className="text-gray-700 text-sm mb-1">
                      <span className="font-semibold">📍 {venue}</span>
                    </p>

                    <p className="text-gray-600 text-sm">
                      <span className="font-semibold">
                        🗓️ {dt ? new Date(dt).toLocaleDateString() : 'Date TBA'}
                      </span>
                    </p>

                    <button className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200">
                      Learn More{' '}
                      <span className="ml-1 text-lg group-hover:translate-x-1 transition-transform duration-200">
                        &rarr;
                      </span>
                    </button>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg py-4">
            No events match your search or filter criteria.
          </p>
        )}
      </section>
    </div>
  );
};

export default Events;
