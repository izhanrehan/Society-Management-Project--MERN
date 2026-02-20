// src/pages/Landing.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios for API calls

const Landing = () => {
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [pastEvents, setPastEvents] = useState([]);
    const [societies, setSocieties] = useState([]);

    const [loadingUpcoming, setLoadingUpcoming] = useState(true);
    const [loadingPast, setLoadingPast] = useState(true);
    const [loadingSocieties, setLoadingSocieties] = useState(true);

    const [errorUpcoming, setErrorUpcoming] = useState(null);
    const [errorPast, setErrorPast] = useState(null);
    const [errorSocieties, setErrorSocieties] = useState(null);

    // Base URL for your API, ensure this matches your backend setup
    const API_BASE_URL = 'http://localhost:5050/api';

    // --- Fetch Upcoming Events ---
    useEffect(() => {
        const fetchUpcomingEvents = async () => {
            try {
                setLoadingUpcoming(true);
                const response = await axios.get(`${API_BASE_URL}/events/filter/upcoming`);
                // Get the first 4 upcoming events to display on landing page
                setUpcomingEvents(response.data.slice(0, 4));
                setErrorUpcoming(null);
            } catch (err) {
                console.error('Error fetching upcoming events for landing:', err);
                setErrorUpcoming('Failed to load upcoming events.');
                setUpcomingEvents([]);
            } finally {
                setLoadingUpcoming(false);
            }
        };
        fetchUpcomingEvents();
    }, [API_BASE_URL]);

    // --- Fetch Ended Events ---
    useEffect(() => {
        const fetchPastEvents = async () => {
            try {
                setLoadingPast(true);
                const response = await axios.get(`${API_BASE_URL}/events/filter/ended`);
                // Get the first 3 past events to display on landing page
                setPastEvents(response.data.slice(0, 3));
                setErrorPast(null);
            } catch (err) {
                console.error('Error fetching past events for landing:', err);
                setErrorPast('Failed to load past events.');
                setPastEvents([]);
            } finally {
                setLoadingPast(false);
            }
        };
        fetchPastEvents();
    }, [API_BASE_URL]);

    // --- Fetch Societies for Logos ---
    useEffect(() => {
        const fetchSocieties = async () => {
            try {
                setLoadingSocieties(true);
                const response = await axios.get(`${API_BASE_URL}/societies`);
                // Use a subset or filter for societies with actual logos if needed
                setSocieties(response.data.slice(0, 6)); // Display first 6 societies
                setErrorSocieties(null);
            } catch (err) {
                console.error('Error fetching societies for landing:', err);
                setErrorSocieties('Failed to load society logos.');
                setSocieties([]);
            } finally {
                setLoadingSocieties(false);
            }
        };
        fetchSocieties();
    }, [API_BASE_URL]);


    return (
        <div className="min-h-screen bg-gray-100 font-sans antialiased">
            {/* Navigation Bar */}
            <nav className="bg-white shadow-md p-4 flex justify-between items-center fixed w-full z-20 top-0">
                <div className="text-3xl font-extrabold text-blue-700 tracking-wider">
                    <Link to="/" className="hover:text-blue-800 transition-colors duration-200">SociNexus</Link>
                </div>
                <div className="space-x-6 flex items-center">
                    <Link to="/events" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">Events</Link>
                    <Link to="/societies" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">Societies</Link> {/* Link to Societies page */}
                    {/* Updated Link to pass filter parameter for "Past Events" */}
                    <Link to="/events?filter=ended" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">Past Events</Link>
                    <Link to="/registration-form" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 text-base font-medium">Register Society</Link>
                    <Link to="/login" className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-md">Admin Login</Link>
                </div>
            </nav>

            <main className="pt-16"> {/* Adjust padding-top to account for fixed nav */}

                {/* Hero Section - Enhanced */}
                <section className="relative bg-gradient-to-br from-blue-700 to-indigo-800 text-white py-20 px-8 sm:px-16 lg:px-24 flex flex-col lg:flex-row items-center justify-between overflow-hidden">
                    {/* Background Overlay for texture/pattern */}
                    <div className="absolute inset-0 opacity-10 bg-repeat-grid-2" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M9.8 8.6L7.8 6.6 6.4 8 8.4 10H10V8.6zM2 6.4L0 8.4V10h1.4L3.4 8l-1.4-1.6zm0-2.8L0 1.6V0h1.4L3.4 2l-1.4 1.6zM9.8 1.4L7.8 3.4 6.4 2 8.4 0H10v1.4z'/%3E%3C/g%3E%3C/svg%3E")`}}></div>

                    <div className="relative z-10 lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0">
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 drop-shadow-md">
                            Connect, Collaborate, Conquer.
                        </h1>
                        <p className="text-xl sm:text-2xl mb-10 opacity-90 leading-relaxed">
                            Empowering societies to thrive by connecting members, streamlining events, and fostering vibrant communities.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6">
                            <Link to="/registration-form" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-blue-700 transition-all duration-300 shadow-xl transform hover:scale-105">
                                Register Your Society
                            </Link>
                        </div>
                    </div>
                    <div className="relative z-10 lg:w-1/2 flex justify-center items-center">
                        <img
                            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTIyMDF8MHwxfHNlYXJjaHw0OXx8Y29tbXVuniwY29tbXVuaXR5JTIwZXZlbnRzfGVufDB8fHx8MTcwODU2MzI5M3ww&ixlib=rb-4.0.3&q=80&w=700"
                            alt="People connecting at an event"
                            className="w-full max-w-xl h-auto rounded-xl shadow-2xl border-4 border-blue-400 transform hover:scale-102 transition-transform duration-300"
                        />
                    </div>
                </section>

                {/* Benefits / Value Proposition Section */}
                <section className="py-20 px-8 sm:px-16 lg:px-24 bg-white text-gray-800">
                    <h2 className="text-4xl font-bold text-center mb-12">Why Choose SociNexus?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                            <div className="text-5xl text-blue-600 mb-4">💡</div>
                            <h3 className="text-2xl font-semibold mb-3">Seamless Event Management</h3>
                            <p className="text-gray-700 leading-relaxed">Organize, promote, and manage all your society events with ease, from registration to attendance tracking.</p>
                        </div>
                        <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                            <div className="text-5xl text-green-600 mb-4">🤝</div>
                            <h3 className="text-2xl font-semibold mb-3">Engage Your Members</h3>
                            <p className="text-gray-700 leading-relaxed">Foster stronger connections and facilitate vibrant interactions among your society members with dedicated tools.</p>
                        </div>
                        <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                            <div className="text-5xl text-purple-600 mb-4">📈</div>
                            <h3 className="text-2xl font-semibold mb-3">Grow Your Reach</h3>
                            <p className="text-gray-700 leading-relaxed">Attract new members and expand your society's influence through a centralized platform visible to many.</p>
                        </div>
                    </div>
                </section>

                {/* Upcoming Events Section - Fetched from API */}
                <section className="py-20 px-8 sm:px-16 lg:px-24 bg-gray-100">
                    <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
                        Discover Our Upcoming Events
                    </h2>
                    {loadingUpcoming ? (
                        <p className="text-center text-gray-700 text-lg">Loading upcoming events...</p>
                    ) : errorUpcoming ? (
                        <p className="text-center text-red-600 text-lg">{errorUpcoming}</p>
                    ) : upcomingEvents.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
                            {upcomingEvents.map(event => {
                                const imageSrc = event.banner_image || event.imageUrl || (event.images && event.images[0]) || 'https://via.placeholder.com/400x200?text=Event+Image';
                                const venue = event.venue || event.location || 'Location TBA';
                                const dt = event.date_time || event.date;
                                const organizerName = typeof event.organizer === 'object' ? event.organizer?.name : null;
                                return (
                                <Link to={`/event-detail/${event._id}`} key={event._id} className="block bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden group">
                                    <div className="h-48 w-full overflow-hidden">
                                        <img
                                            src={imageSrc}
                                            alt={event.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-5">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors duration-200">{event.name}</h3>
                                        {organizerName && (
                                            <p className="text-gray-700 text-sm mb-1">
                                                <span className="font-semibold">Organized by: {organizerName}</span>
                                            </p>
                                        )}
                                        <p className="text-gray-700 text-sm mb-1">
                                            <span className="font-semibold">📍 {venue}</span>
                                        </p>
                                        <p className="text-gray-600 text-sm">
                                            <span className="font-semibold">🗓️ {dt ? new Date(dt).toLocaleDateString() : 'Date TBA'}</span>
                                        </p>
                                        <button className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200">
                                            Learn More <span className="ml-1 text-lg group-hover:translate-x-1 transition-transform duration-200">&rarr;</span>
                                        </button>
                                    </div>
                                </Link>
                            );})}
                        </div>
                    ) : (
                        <p className="text-center text-gray-600 text-lg py-4">No upcoming events to display.</p>
                    )}
                    <div className="text-center">
                        <Link to="/events" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-10 rounded-full text-lg shadow-lg transition duration-300 transform hover:scale-105">
                            Explore All Events
                        </Link>
                    </div>
                </section>

                {/* Logos of All Societies Section - Fetched from API */}
                <section className="py-20 px-8 sm:px-16 lg:px-24 bg-gray-900 text-white">
                    <h2 className="text-4xl font-bold text-center mb-12">
                        Trusted by Leading Societies
                    </h2>
                    <p className="text-center text-xl mb-12 opacity-80 max-w-3xl mx-auto">
                        We partner with a diverse range of academic, professional, and recreational societies to empower their communities.
                    </p>
                    {loadingSocieties ? (
                        <p className="text-center text-gray-400 text-lg">Loading society logos...</p>
                    ) : errorSocieties ? (
                        <p className="text-center text-red-400 text-lg">{errorSocieties}</p>
                    ) : societies.length > 0 ? (
                        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
                            {societies.map((society, i) => {
                                const logoSrc = society.logo || society.logoUrl || `https://via.placeholder.com/150x150?text=${society.name ? society.name.charAt(0).toUpperCase() : 'S'}`;
                                return (
                                <Link to={`/society-detail/${society._id}`} key={society._id} className="block">
                                    <img
                                        src={logoSrc}
                                        alt={`${society.name || 'Society'} Logo`}
                                        className="h-20 sm:h-24 object-contain bg-white rounded-lg p-3 shadow-xl transform hover:scale-105 transition-transform duration-300 cursor-pointer"
                                    />
                                </Link>
                            );})}
                        </div>
                    ) : (
                        <p className="text-center text-gray-400 text-lg py-4">No societies to display.</p>
                    )}
                    <div className="text-center mt-12">
                        <Link to="/societies" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-10 rounded-full text-lg shadow-lg transition duration-300 transform hover:scale-105">
                            View All Societies
                        </Link>
                    </div>
                </section>

                {/* Ended Events Section - Updated Link to point to /events with filter */}
                <section className="py-20 px-8 sm:px-16 lg:px-24 bg-white">
                    <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
                        Relive Our Ended Events
                    </h2>
                    {loadingPast ? (
                        <p className="text-center text-gray-700 text-lg">Loading ended events...</p>
                    ) : errorPast ? (
                        <p className="text-center text-red-600 text-lg">{errorPast}</p>
                    ) : pastEvents.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
                            {pastEvents.map(event => {
                                const imageSrc = event.banner_image || event.imageUrl || (event.images && event.images[0]) || 'https://via.placeholder.com/400x200?text=Past+Event+Image';
                                const venue = event.venue || event.location || 'Location TBA';
                                const dt = event.date_time || event.date;
                                const organizerName = typeof event.organizer === 'object' ? event.organizer?.name : null;
                                return (
                                <Link to={`/event-detail/${event._id}`} key={event._id} className="block bg-gray-50 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 overflow-hidden group">
                                    <div className="h-40 w-full overflow-hidden">
                                        <img
                                            src={imageSrc}
                                            alt={event.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors duration-200">{event.name}</h3>
                                        {organizerName && (
                                            <p className="text-gray-700 text-sm mb-1">
                                                <span className="font-semibold">Organized by: {organizerName}</span>
                                            </p>
                                        )}
                                        <p className="text-gray-700 text-sm mb-1">
                                            <span className="font-semibold">📍 {venue}</span>
                                        </p>
                                        <p className="text-gray-600 text-xs">
                                            <span className="font-semibold">🗓️ {dt ? new Date(dt).toLocaleDateString() : 'Date TBA'}</span>
                                        </p>
                                        <button className="mt-3 inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-semibold transition-colors duration-200">
                                            View Details <span className="ml-1 text-base group-hover:translate-x-1 transition-transform duration-200">&rarr;</span>
                                        </button>
                                    </div>
                                </Link>
                            );})}
                        </div>
                    ) : (
                        <p className="text-center text-gray-600 text-lg py-4">No ended events to display.</p>
                    )}
                    <div className="text-center mt-10">
                        {/* Changed the 'to' prop to include a query parameter */}
                        <Link to="/events?filter=ended" className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-10 rounded-full text-lg shadow-lg transition duration-300 transform hover:scale-105">
                            View All Ended Events
                        </Link>
                    </div>
                </section>
            </main>

            {/* Footer Section */}
            <footer className="bg-gray-900 text-white py-10 px-8 sm:px-16 lg:px-24 text-center">
                <div className="mb-6">
                    <p className="text-lg font-semibold mb-2">SociNexus</p>
                    <p className="text-sm text-gray-400">Connecting societies, empowering communities.</p>
                </div>
                <div className="flex justify-center space-x-6 mb-6">
                    <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors duration-200">Privacy Policy</Link>
                    <Link to="/terms" className="text-gray-400 hover:text-white transition-colors duration-200">Terms of Service</Link>
                    <Link to="/faq" className="text-gray-400 hover:text-white transition-colors duration-200">FAQ</Link>
                </div>
                <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} SociNexus. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Landing;