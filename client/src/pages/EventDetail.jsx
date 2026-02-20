// src/pages/EventDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../config/api';

const EventDetail = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEventDetail = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`${API_BASE_URL}/events/${id}`);
                setEvent(response.data);
            } catch (err) {
                console.error('Error fetching event details:', err);
                setError('Failed to load event details. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchEventDetail();
    }, [id]);

    if (loading) {
        return <div className="text-center py-20">Loading event details...</div>;
    }

    if (error) {
        return <div className="text-center py-20 text-red-600">{error}</div>;
    }

    if (!event) {
        return <div className="text-center py-20">Event not found.</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 font-sans antialiased pt-16">
            <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg my-10">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{event.name}</h1>
                <p className="text-lg text-gray-700 mb-2">
                    <span className="font-semibold">Organized by:</span> {event.organizer?.name || 'N/A'}
                </p>
                <p className="text-lg text-gray-700 mb-2">
                    <span className="font-semibold">Date:</span> {new Date(event.date).toLocaleDateString()}
                </p>
                <p className="text-lg text-gray-700 mb-4">
                    <span className="font-semibold">Location:</span> {event.location || 'Online'}
                </p>
                {event.imageUrl && (
                    <img
                        src={event.imageUrl}
                        alt={event.name}
                        className="w-full h-80 object-cover rounded-lg mb-6 shadow-md"
                    />
                )}
                <p className="text-gray-800 leading-relaxed mb-6">
                    {event.description || 'No description available.'}
                </p>
                <div className="mt-8 text-center">
                    <Link
                        to={`/registration-form?eventId=${event._id}&eventName=${encodeURIComponent(event.name)}`}
                        className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-xl hover:bg-blue-700 transition-colors duration-300 shadow-lg transform hover:scale-105"
                    >
                        Register for this Event
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default EventDetail;
