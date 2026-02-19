// src/pages/RegistrationForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const API_BASE_URL = 'http://localhost:5050/api';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setIsError(false);

    try {
      const response = await axios.post(`${API_BASE_URL}/registrations`, formData);
      setMessage('Registration successful!');
      setIsError(false);
      console.log('Registration successful:', response.data);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        address: '',
      });
      setTimeout(() => {
        navigate('/events');
      }, 2000);
    } catch (err) {
      setIsError(true);
      if (err.response && err.response.data && err.response.data.error) {
        setMessage(`Registration failed: ${err.response.data.error}`);
        console.error('Registration error:', err.response.data.error);
      } else {
        setMessage('Registration failed. Please try again later.');
        console.error('Registration error:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-gray-300 p-8 rounded-lg shadow-lg w-full max-w-xl">
        <h2 className="text-2xl font-bold text-center mb-6">Register for Society Events</h2>
        {message && (
          <div className={`mb-4 p-3 rounded-md text-center ${isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="fullName" className="sr-only">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="sr-only">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Phone Number (Optional)"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="address" className="sr-only">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Address (Optional)"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="md:col-span-2 flex justify-center mt-6">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-md focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register Now'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
