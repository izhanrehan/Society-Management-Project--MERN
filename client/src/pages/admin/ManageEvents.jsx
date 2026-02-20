// src/pages/admin/ManageEvents.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import API_BASE_URL from '../../config/api';

const getCurrentSocietyId = () => {
    return '684d8d423127bff09b6e9f14'; // replace with actual dynamic society ID if needed
};

const ManageEvents = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('upcoming');
    const [searchTerm, setSearchTerm] = useState('');
    const [eventTypeFilter, setEventTypeFilter] = useState('');
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const societyId = getCurrentSocietyId();

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            setError(null);

            try {
                if (!societyId) {
                    setError("Society ID is missing.");
                    return;
                }

                let endpoint = '';
                if (activeTab === 'upcoming') {
                    endpoint = `${API_BASE_URL}/events/society/${societyId}/upcoming`;
                } else if (activeTab === 'completed') {
                    endpoint = `${API_BASE_URL}/events/society/${societyId}/ended`;
                } else {
                    endpoint = `${API_BASE_URL}/events/society/${societyId}`;
                }

                const response = await axios.get(endpoint);
                let fetchedEvents = response.data;

                // Filter archived manually if on archived tab
                if (activeTab === 'archived') {
                    fetchedEvents = fetchedEvents.filter(event => event.status?.toLowerCase() === 'archived');
                }

                setEvents(fetchedEvents);
            } catch (err) {
                const message = err.response?.data?.error || err.message;
                setError(`Failed to load events. ${message}`);
                setEvents([]);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [activeTab, societyId]);

    const filteredEvents = events.filter(event => {
        const nameMatch = (event.name || '').toLowerCase().includes(searchTerm.toLowerCase());
        const typeMatch = !eventTypeFilter || (event.type || '').toLowerCase() === eventTypeFilter.toLowerCase();
        return nameMatch && typeMatch;
    });

    const handleEditEvent = (eventId) => {
        navigate(`/admin/add-edit-event/${eventId}`);
    };

    const handleDeleteEvent = async (eventId) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            try {
                setLoading(true);
                await axios.delete(`${API_BASE_URL}/events/${eventId}`);
                setEvents(prev => prev.filter(e => e._id !== eventId));
            } catch (err) {
                setError(err.response?.data?.message || 'Delete failed.');
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 ml-64">
                <Header pageTitle="Manage Events" />
                <main className="p-8 bg-gray-50 min-h-[calc(100vh-64px)]">
                    {/* Tabs */}
                    <div className="mb-6 border-b border-gray-200">
                        <nav className="flex space-x-8">
                            {['upcoming', 'completed', 'archived'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`py-2 px-4 text-sm font-medium ${
                                        activeTab === tab ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Filters */}
                    <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                        <div className="flex items-center gap-4 flex-wrap">
                            <select
                                value={eventTypeFilter}
                                onChange={(e) => setEventTypeFilter(e.target.value)}
                                className="border rounded px-4 py-2"
                            >
                                <option value="">Event Type</option>
                                <option value="physical">Physical</option>
                                <option value="preparation">Preparation</option>
                            </select>
                            <input
                                type="text"
                                placeholder="Search by name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="border rounded px-4 py-2 flex-grow"
                            />
                        </div>
                        <button
                            onClick={() => navigate('/admin/add-edit-event')}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Add New Event
                        </button>
                    </div>

                    {/* Table */}
                    {loading && <p className="text-center text-gray-600 py-8">Loading events...</p>}
                    {error && <p className="text-center text-red-600 py-8">{error}</p>}
                    {!loading && !error && (
                        <div className="bg-white shadow rounded overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600">Venue</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredEvents.length > 0 ? (
                                        filteredEvents.map(event => (
                                            <tr key={event._id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{event.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                    {event.date_time ? new Date(event.date_time).toLocaleDateString('en-US') : 'N/A'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                    {event.venue || 'N/A'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                                                        event.status === 'upcoming' ? 'bg-blue-100 text-blue-700' :
                                                        event.status === 'active' ? 'bg-green-100 text-green-700' :
                                                        event.status === 'archived' ? 'bg-yellow-100 text-yellow-700' :
                                                        event.status === 'cancelled' ? 'bg-red-100 text-red-600' :
                                                        'bg-gray-100 text-gray-700'
                                                    }`}>
                                                        {event.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <button onClick={() => navigate(`/event-detail/${event._id}`)} className="text-blue-600 mr-4 hover:underline">View</button>
                                                    <button onClick={() => handleEditEvent(event._id)} className="text-indigo-600 mr-4 hover:underline">Edit</button>
                                                    <button onClick={() => handleDeleteEvent(event._id)} className="text-red-600 hover:underline">Delete</button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-4 text-center text-gray-500">No events found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default ManageEvents;
