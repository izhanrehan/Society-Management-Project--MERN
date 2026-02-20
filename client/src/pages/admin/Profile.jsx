// src/pages/admin/Profile.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import API_BASE_URL from '../../config/api';

const Profile = () => {
    const loggedInSocietyId = '684d8d423127bff09b6e9f14';

    const [profile, setProfile] = useState(null);
    const [loadingProfile, setLoadingProfile] = useState(true);
    const [errorProfile, setErrorProfile] = useState(null);

    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [pastEvents, setPastEvents] = useState([]);
    const [loadingEvents, setLoadingEvents] = useState(true);
    const [errorEvents, setErrorEvents] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!loggedInSocietyId) {
                setLoadingProfile(false);
                setErrorProfile("No logged-in society ID found. Please log in.");
                return;
            }

            try {
                setLoadingProfile(true);
                const response = await axios.get(`${API_BASE_URL}/societies/${loggedInSocietyId}`);
                setProfile(response.data);
                setErrorProfile(null);
            } catch (err) {
                setErrorProfile('Failed to load profile. Please try again later.');
                setProfile(null);
            } finally {
                setLoadingProfile(false);
            }
        };

        fetchProfile();
    }, [loggedInSocietyId]);

    useEffect(() => {
        const fetchProfileEvents = async () => {
            if (!loggedInSocietyId) {
                setLoadingEvents(false);
                return;
            }

            try {
                setLoadingEvents(true);
                const upcomingResponse = await axios.get(`${API_BASE_URL}/events/society/${loggedInSocietyId}/upcoming`);
                setUpcomingEvents(upcomingResponse.data);

                const pastResponse = await axios.get(`${API_BASE_URL}/events/society/${loggedInSocietyId}/ended`);
                setPastEvents(pastResponse.data);

                setErrorEvents(null);
            } catch (err) {
                setErrorEvents('Failed to load events for this profile.');
                setUpcomingEvents([]);
                setPastEvents([]);
            } finally {
                setLoadingEvents(false);
            }
        };

        fetchProfileEvents();
    }, [loggedInSocietyId]);

    if (loadingProfile) {
        return (
            <div className="flex">
                <Sidebar />
                <div className="flex-1 ml-64">
                    <Header pageTitle="My Society Profile" />
                    <main className="p-8 bg-gray-50 min-h-[calc(100vh-64px)]">
                        <p className="text-xl text-gray-700 text-center py-10">Loading profile...</p>
                    </main>
                </div>
            </div>
        );
    }

    if (errorProfile) {
        return (
            <div className="flex">
                <Sidebar />
                <div className="flex-1 ml-64">
                    <Header pageTitle="My Society Profile" />
                    <main className="p-8 bg-gray-50 min-h-[calc(100vh-64px)]">
                        <p className="text-xl text-red-600 text-center py-10">{errorProfile}</p>
                    </main>
                </div>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="flex">
                <Sidebar />
                <div className="flex-1 ml-64">
                    <Header pageTitle="My Society Profile" />
                    <main className="p-8 bg-gray-50 min-h-[calc(100vh-64px)]">
                        <p className="text-xl text-gray-700 text-center py-10">Profile not found.</p>
                        <p className="text-center text-gray-600">Ensure you are logged in as a society administrator.</p>
                    </main>
                </div>
            </div>
        );
    }

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 ml-64">
                <Header pageTitle="My Society Profile" />
                <main className="p-8 bg-gray-50 min-h-[calc(100vh-64px)]">
                    <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 md:p-10 mb-12 text-center relative overflow-hidden">
                        <div className="absolute inset-0 opacity-5 bg-repeat-grid-2" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M9.8 8.6L7.8 6.6 6.4 8 8.4 10H10V8.6zM2 6.4L0 8.4V10h1.4L3.4 8l-1.4-1.6zm0-2.8L0 1.6V0h1.4L3.4 2l-1.4 1.6zM9.8 1.4L7.8 3.4 6.4 2 8.4 0H10v1.4z'/%3E%3C/g%3E%3C/svg%3E")` }}></div>
                        <div className="relative z-10 flex flex-col items-center">
                            <img
                                src={profile.image || `https://via.placeholder.com/200x200?text=${(profile.name || 'P').charAt(0).toUpperCase()}`}
                                alt={`${profile.name || 'Profile'} Logo`}
                                className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-blue-400 shadow-lg mb-6 transform transition-transform duration-300 hover:scale-105"
                            />
                            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-3">
                                {profile.name}
                            </h1>
                            <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto leading-relaxed">
                                {profile.description || 'No description provided for this profile.'}
                            </p>
                            <div className="flex flex-wrap justify-center gap-4 text-gray-600 text-sm md:text-base">
                                {profile.email && <span className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-blue-500" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>{profile.email}</span>}
                                {profile.contactNumber && <span className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-blue-500" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.774a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>{profile.contactNumber}</span>}
                                {profile.contactPerson && <span className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-blue-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/></svg>{profile.contactPerson}</span>}
                            </div>
                        </div>
                    </div>

                    <section className="bg-white rounded-lg shadow-xl p-6 sm:p-8 md:p-10">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Events by {profile.name}</h2>

                        {loadingEvents ? (
                            <p className="text-center text-gray-700 text-lg">Loading events organized by {profile.name}...</p>
                        ) : errorEvents ? (
                            <p className="text-center text-red-600 text-lg">{errorEvents}</p>
                        ) : (
                            <>
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
                                    <p className="text-center text-gray-600 text-base mb-10">No upcoming events found for {profile.name}.</p>
                                )}

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
                                    <p className="text-center text-gray-600 text-base">No past events found for {profile.name}.</p>
                                )}
                            </>
                        )}
                    </section>
                </main>

                <footer className="bg-gray-950 text-gray-300 py-8 px-8 sm:px-16 lg:px-24 text-center text-sm mt-12">
                    <p>&copy; {new Date().getFullYear()} SociNexus. All rights reserved.</p>
                    <div className="flex justify-center space-x-6 mt-4">
                        <Link to="/privacy" className="hover:text-white transition-colors duration-200">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-white transition-colors duration-200">Terms of Service</Link>
                        <Link to="/contact" className="hover:text-white transition-colors duration-200">Contact Us</Link>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Profile;
