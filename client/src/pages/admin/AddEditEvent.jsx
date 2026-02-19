// src/pages/admin/AddEditEvent.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

const API_BASE_URL = 'http://localhost:5050/api';

const AddEditEvent = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        date_time: '',
        venue: '',
        organizer: '',
        status: 'upcoming',
    });

    const [societies, setSocieties] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const pageTitle = isEditing ? 'Edit Event' : 'Add New Event';

    useEffect(() => {
        const fetchSocieties = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/societies`);
                setSocieties(response.data);
            } catch (err) {
                console.error("Error fetching societies:", err);
                setMessage('Failed to load societies. Please refresh.');
                setIsError(true);
            }
        };
        fetchSocieties();
    }, []);

    useEffect(() => {
        if (id) {
            setIsEditing(true);
            setLoading(true);
            const fetchEvent = async () => {
                try {
                    const response = await axios.get(`${API_BASE_URL}/events/${id}`);
                    const eventData = response.data;
                    setFormData({
                        name: eventData.name || '',
                        description: eventData.description || '',
                        date_time: eventData.date_time
                            ? new Date(eventData.date_time).toISOString().split('T')[0]
                            : '',
                        venue: eventData.venue || '',
                        organizer: eventData.organizer?._id || eventData.organizer || '',
                        status: eventData.status || 'upcoming',
                    });
                } catch (err) {
                    console.error("Error fetching event:", err);
                    setMessage('Failed to load event data.');
                    setIsError(true);
                } finally {
                    setLoading(false);
                }
            };
            fetchEvent();
        } else {
            setFormData({
                name: '', description: '', date_time: '', venue: '', organizer: '', status: 'upcoming',
            });
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setIsError(false);

        try {
            let response;
            if (isEditing) {
                response = await axios.put(`${API_BASE_URL}/events/${id}`, formData);
                setMessage('Event updated successfully!');
            } else {
                response = await axios.post(`${API_BASE_URL}/events/`, formData);
                setMessage('Event created successfully!');
                setFormData({
                    name: '', description: '', date_time: '', venue: '', organizer: '', status: 'upcoming',
                });
            }

            setTimeout(() => {
                navigate('/admin/manage-events');
            }, 2000);
        } catch (err) {
            const errorMsg = err.response?.data?.error || err.message || 'Something went wrong.';
            setMessage(`Operation failed: ${errorMsg}`);
            setIsError(true);
        } finally {
            setLoading(false);
        }
    };

    if (loading && isEditing) {
        return (
            <div className="flex">
                <Sidebar />
                <div className="flex-1 ml-64">
                    <Header pageTitle={pageTitle} />
                    <main className="p-8 bg-gray-50 min-h-[calc(100vh-64px)]">
                        <p className="text-center text-gray-600">Loading event data...</p>
                    </main>
                </div>
            </div>
        );
    }

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 ml-64">
                <Header pageTitle={pageTitle} />
                <main className="p-8 bg-gray-50 min-h-[calc(100vh-64px)]">
                    <div className="bg-white p-8 rounded shadow border border-gray-200">
                        <h2 className="text-2xl font-bold mb-6">{pageTitle}</h2>

                        {message && (
                            <div className={`mb-4 p-3 text-center rounded ${isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                {message}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block font-bold text-gray-700 mb-1">Event Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full border rounded px-3 py-2"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="description" className="block font-bold text-gray-700 mb-1">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="4"
                                    className="w-full border rounded px-3 py-2"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="date_time" className="block font-bold text-gray-700 mb-1">Event Date</label>
                                <input
                                    type="date"
                                    name="date_time"
                                    value={formData.date_time}
                                    onChange={handleChange}
                                    className="w-full border rounded px-3 py-2"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="venue" className="block font-bold text-gray-700 mb-1">Venue</label>
                                <input
                                    type="text"
                                    name="venue"
                                    value={formData.venue}
                                    onChange={handleChange}
                                    className="w-full border rounded px-3 py-2"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="organizer" className="block font-bold text-gray-700 mb-1">Organizer Society</label>
                                <select
                                    name="organizer"
                                    value={formData.organizer}
                                    onChange={handleChange}
                                    className="w-full border rounded px-3 py-2"
                                    required
                                >
                                    <option value="">Select a society</option>
                                    {societies.map((society) => (
                                        <option key={society._id} value={society._id}>
                                            {society.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="status" className="block font-bold text-gray-700 mb-1">Status</label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="w-full border rounded px-3 py-2"
                                    required
                                >
                                    <option value="upcoming">Upcoming</option>
                                    <option value="active">Active</option>
                                    <option value="completed">Completed</option>
                                    <option value="ended">Ended</option>
                                    <option value="archived">Archived</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </div>

                            <div className="flex justify-between">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {loading ? 'Saving...' : isEditing ? 'Update Event' : 'Create Event'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => navigate('/admin/manage-events')}
                                    className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AddEditEvent;
