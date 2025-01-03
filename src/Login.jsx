import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';

export default function Login() {
    const [formData, setFormData] = useState({
        id: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
        setErrorMessage(''); // Clear error message on input change
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage('');

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, formData);
            const { customertoken } = response.data;

            if (customertoken) {
                localStorage.setItem('customertoken', customertoken);
            }
            navigate('/profile');
        } catch (err) {
            console.error(err);
            setErrorMessage(
                err.response?.data?.message || 'Login failed. Please check your credentials.'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className="min-h-screen flex flex-col">
                <Header />
                <div className="flex-1 bg-gray-100 flex flex-col justify-center items-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Login</h1>
                    <form className="bg-white p-6 rounded shadow-md w-80" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id">
                                ID
                            </label>
                            <input
                                type="text"
                                id="id"
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                                placeholder="Enter your ID"
                                value={formData.id}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {errorMessage && (
                            <p className="text-red-600 text-sm mb-4">{errorMessage}</p>
                        )}
                        <button
                            type="submit"
                            className={`w-full ${isSubmitting ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
                                } text-white py-2 px-4 rounded focus:outline-none focus:ring`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Logging in...' : 'Login'}
                        </button>
                    </form>

                    <Link to={'/register'}>
                        <div className="text-green-600 mt-4 cursor-pointer">
                            New User? Sign Up
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
}
