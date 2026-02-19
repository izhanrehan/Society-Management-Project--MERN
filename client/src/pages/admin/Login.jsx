// src/pages/admin/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For redirection

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false); // Keep this state if you intend to use it for remember me functionality (e.g., persistent token)
    const [error, setError] = useState(null); // State for login errors
    const [loading, setLoading] = useState(false); // State for loading indicator

    const navigate = useNavigate(); // Hook for navigation

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        // Dummy admin credentials
        const dummyAdmin = {
            email: 'admin@gmail.com',
            password: 'admin123',
            role: 'admin',
            id: '1',
        };

        // Simulate API delay
        setTimeout(() => {
            if (email === dummyAdmin.email && password === dummyAdmin.password) {
                // Store fake token and user info
                localStorage.setItem('token', 'dummy-token-123');
                localStorage.setItem('userRole', dummyAdmin.role);
                localStorage.setItem('userId', dummyAdmin.id);
                navigate('/admin/dashboard');
            } else {
                setError('Invalid email or password.');
                localStorage.removeItem('token');
                localStorage.removeItem('userRole');
                localStorage.removeItem('userId');
            }
            setLoading(false);
        }, 800); // Simulate network delay
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Welcome Back (Admin)</h2>
                <p className="text-center text-gray-600 mb-8">Please log in to your admin account</p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <div className="flex items-center justify-between">
                            <label className="flex items-center text-gray-700 text-sm">
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-4 w-4 text-blue-600"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />
                                <span className="ml-2">Remember me</span>
                            </label>
                            {/* For a real app, replace href="#" with a proper routing link or modal */}
                            <a href="#" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                                Forgot Password?
                            </a>
                        </div>
                    </div>
                    {error && (
                        <p className="text-red-500 text-xs italic mb-4 text-center">{error}</p>
                    )}
                    <div className="flex items-center justify-center">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                            disabled={loading}
                        >
                            {loading ? 'Logging In...' : 'Log In'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;