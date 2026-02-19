import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; 
const Societies = () => {
    const [societies, setSocieties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const API_BASE_URL = 'http://localhost:5050/api';

    useEffect(() => {
        const fetchSocieties = async () => {
            try {
                setLoading(true); 
                const response = await axios.get(`${API_BASE_URL}/societies`);
                setSocieties(response.data); 
                setError(null); 
            } catch (err) {
                console.error('Error fetching societies:', err);
                setError('Failed to load societies. Please try again later.');
                setSocieties([]); 
            } finally {
                setLoading(false); 
            }
        };

        fetchSocieties(); 
    }, []); 

    const filteredSocieties = societies.filter(society => {
        return society.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-xl text-gray-700">Loading societies...</p>
            </div>
        );
    }
    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-xl text-red-600">{error}</p>
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-gray-50 font-sans antialiased text-gray-800">
            <nav className="bg-white shadow-md p-4 flex justify-between items-center fixed w-full z-20 top-0">
                <Link to="/" className="text-2xl font-bold text-blue-700 hover:text-blue-800">SocietyConnect</Link>
                <div className="space-x-6 flex items-center">
                    <Link to="/events" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 text-base font-medium">Events</Link>
                    <Link to="/societies" className="text-blue-600 font-bold transition-colors duration-200 text-base font-medium">Societies</Link> {/* Highlight current page */}
                    <Link to="/registration-form" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 text-base font-medium">Register Society</Link>
                    <Link to="/login" className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg text-base font-medium">Admin Login</Link>
                </div>
            </nav>
            <main className="pt-20 pb-12 px-8 sm:px-16 lg:px-24">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-2">
                    Our Societies
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                    Discover the diverse range of societies that are part of our community.
                </p>

                <div className="flex justify-end mb-8">
                    <input
                        type="text"
                        placeholder="Search societies by name..."
                        className="p-2 border border-gray-300 rounded-full focus:ring-blue-500 focus:border-blue-500 w-full sm:w-80"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {filteredSocieties.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredSocieties.map(society => (
                            <Link to={`/society-detail/${society._id}`} key={society._id} className="block bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl group">
                                {/* You might have an imageUrl for society logos */}
                                <div className="p-4 flex items-center justify-center h-48 bg-gray-100">
                                    <img
                                        src={society.logoUrl || `https://via.placeholder.com/150x150?text=${society.name.charAt(0).toUpperCase()}`}
                                        alt={`${society.name} Logo`}
                                        className="max-w-full max-h-full object-contain rounded-full border-2 border-gray-200 group-hover:border-blue-400 transition-colors duration-200"
                                    />
                                </div>
                                <div className="p-5 text-center">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors duration-200">{society.name}</h3>
                                    <p className="text-gray-600 text-sm mb-3">{society.description || 'No description available.'}</p>
                                    <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                                        Members: {society.memberCount || 'N/A'} {/* Assuming a memberCount field */}
                                    </span>
                                    <div className="mt-4">
                                        <button className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm">
                                            View Profile
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-600 text-lg py-12">No societies found.</p>
                )}
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

export default Societies; 