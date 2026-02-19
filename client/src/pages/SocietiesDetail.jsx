// src/pages/SocietiesDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // Import useParams to get ID from URL
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5050/api';

const SocietiesDetail = () => {
    const { id } = useParams(); // Get the 'id' parameter from the URL
    const [society, setSociety] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State for events organized by this society
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [pastEvents, setPastEvents] = useState([]);
    const [loadingEvents, setLoadingEvents] = useState(true);
    const [errorEvents, setErrorEvents] = useState(null);

    // Effect to fetch society details
    useEffect(() => {
        const fetchSocietyDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${API_BASE_URL}/societies/${id}`);
                setSociety(response.data);
                setError(null);
            } catch (err) {
                console.error(`Error fetching society with ID ${id}:`, err);
                if (err.response && err.response.status === 404) {
                    setError('Society not found.');
                } else {
                    setError('Failed to load society details. Please try again later.');
                }
                setSociety(null);
            } finally {
                setLoading(false);
            }
        };

        if (id) { // Only fetch if ID is available
            fetchSocietyDetails();
        } else {
            setLoading(false);
            setError("No society ID provided in the URL.");
        }
    }, [id]); // Re-run when the 'id' parameter changes

    // Effect to fetch events organized by this society
    useEffect(() => {
        const fetchSocietyEvents = async () => {
            if (!id) {
                setLoadingEvents(false);
                return;
            }

            try {
                setLoadingEvents(true);
                // Assuming you have API endpoints like /api/events/society/:id/upcoming
                const upcomingResponse = await axios.get(`${API_BASE_URL}/events/society/${id}/upcoming`);
                setUpcomingEvents(upcomingResponse.data);

                // Assuming you have API endpoints like /api/events/society/:id/ended
                const pastResponse = await axios.get(`${API_BASE_URL}/events/society/${id}/ended`);
                setPastEvents(pastResponse.data);

                setErrorEvents(null);
            } catch (err) {
                console.error(`Error fetching events for society ${id}:`, err);
                setErrorEvents('Failed to load events for this society.');
                setUpcomingEvents([]);
                setPastEvents([]);
            } finally {
                setLoadingEvents(false);
            }
        };

        if (id) {
            fetchSocietyEvents();
        } else {
            setLoadingEvents(false);
        }
    }, [id]); // Re-run when the 'id' parameter changes

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
                <p className="text-xl text-gray-700">Loading society profile...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
                <p className="text-xl text-red-600">{error}</p>
                <Link to="/societies" className="mt-4 text-blue-600 hover:underline">Back to Societies</Link>
            </div>
        );
    }

    if (!society) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
                <p className="text-xl text-gray-700">Society not found.</p>
                <Link to="/societies" className="mt-4 text-blue-600 hover:underline">Back to Societies</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans antialiased text-gray-800">
            <nav className="bg-white shadow-md p-4 flex justify-between items-center fixed w-full z-20 top-0">
                <Link to="/" className="text-2xl font-bold text-blue-700 hover:text-blue-800">SocietyConnect</Link>
                <div className="space-x-6 flex items-center">
                    <Link to="/events" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 text-base font-medium">Events</Link>
                    <Link to="/societies" className="text-blue-600 font-bold transition-colors duration-200 text-base font-medium">Societies</Link>
                    <Link to="/registration-form" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 text-base font-medium">Register Society</Link>
                    <Link to="/login" className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg text-base font-medium">Admin Login</Link>
                </div>
            </nav>

            <main className="pt-20 pb-12 px-8 sm:px-16 lg:px-24">
                {/* Society Header Section */}
                <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 md:p-10 mb-12 text-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-5 bg-repeat-grid-2" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M9.8 8.6L7.8 6.6 6.4 8 8.4 10H10V8.6zM2 6.4L0 8.4V10h1.4L3.4 8l-1.4-1.6zm0-2.8L0 1.6V0h1.4L3.4 2l-1.4 1.6zM9.8 1.4L7.8 3.4 6.4 2 8.4 0H10v1.4z'/%3E%3C/g%3E%3C/svg%3E")` }}></div>
                    <div className="relative z-10 flex flex-col items-center">
                        <img
                            src={society.logoUrl || `https://via.placeholder.com/200x200?text=${(society.name || 'S').charAt(0).toUpperCase()}`}
                            alt={`${society.name || 'Society'} Logo`}
                            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-blue-400 shadow-lg mb-6 transform transition-transform duration-300 hover:scale-105"
                        />
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-3">
                            {society.name}
                        </h1>
                        <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto leading-relaxed">
                            {society.description || 'No description provided for this society.'}
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 text-gray-600 text-sm md:text-base">
                            {society.email && <span className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-blue-500" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>{society.email}</span>}
                            {society.contactNumber && <span className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-blue-500" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.774a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>{society.contactNumber}</span>}
                            {society.contactPerson && <span className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-blue-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/></svg>{society.contactPerson}</span>}
                            <span className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-blue-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>Members: {society.memberCount !== undefined ? society.memberCount : 'N/A'}</span>
                        </div>
                    </div>
                </div>

                {/* Society Events Section */}
                <section className="bg-white rounded-lg shadow-xl p-6 sm:p-8 md:p-10">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Events by {society.name}</h2>

                    {loadingEvents ? (
                        <p className="text-center text-gray-700 text-lg">Loading events organized by {society.name}...</p>
                    ) : errorEvents ? (
                        <p className="text-center text-red-600 text-lg">{errorEvents}</p>
                    ) : (
                        <>
                            {/* Upcoming Events by Society */}
                            <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">Upcoming Events</h3>
                            {upcomingEvents.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                                    {upcomingEvents.map(event => (
                                        <Link to={`/event-detail/${event._id}`} key={event._id} className="block bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden group">
                                            <img
                                                src={event.image || 'https://via.placeholder.com/300x150?text=Event+Image'}
                                                alt={event.name}
                                                className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            <div className="p-4">
                                                <h4 className="text-lg font-semibold text-gray-900 mb-1">{event.name}</h4>
                                                <p className="text-sm text-gray-600 mb-1">{event.location || 'Location TBA'}</p>
                                                <p className="text-xs text-gray-500">Date: {new Date(event.date).toLocaleDateString()}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-gray-600 text-base mb-10">No upcoming events found for {society.name}.</p>
                            )}

                            {/* Past Events by Society */}
                            <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2 mt-8">Past Events</h3>
                            {pastEvents.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {pastEvents.map(event => (
                                        <Link to={`/event-detail/${event._id}`} key={event._id} className="block bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden group">
                                            <img
                                                src={event.image || 'https://via.placeholder.com/300x150?text=Event+Image'}
                                                alt={event.name}
                                                className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            <div className="p-4">
                                                <h4 className="text-lg font-semibold text-gray-900 mb-1">{event.name}</h4>
                                                <p className="text-sm text-gray-600 mb-1">{event.location || 'Location TBA'}</p>
                                                <p className="text-xs text-gray-500">Date: {new Date(event.date).toLocaleDateString()}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-gray-600 text-base">No past events found for {society.name}.</p>
                            )}
                        </>
                    )}
                </section>
            </main>

            <footer className="bg-gray-950 text-gray-300 py-8 px-8 sm:px-16 lg:px-24 text-center text-sm mt-12">
                <p>&copy; {new Date().getFullYear()} SocietyConnect. All rights reserved.</p>
                <div className="flex justify-center space-x-6 mt-4">
                    <a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a>
                    <a href="#" className="hover:text-white transition-colors duration-200">Contact Us</a>
                </div>
            </footer>
        </div>
    );
};

export default SocietiesDetail;