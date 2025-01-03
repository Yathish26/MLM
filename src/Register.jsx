import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import RegisterDone from './RegisterDone';
import Header from './Header';

export default function Register() {
    const { id } = useParams(); // Get the referenceID from the URL parameter
    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        place: '',
        refId: id || '', // Initialize refId with the value from the URL
        referenceCustomer: '',
        password: '',
    });
    const [referenceName, setReferenceName] = useState('');
    const [isReferenceValid, setIsReferenceValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        // Automatically validate the refId if it's provided in the URL
        if (id) {
            validateReference();
        }
    }, [id]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });

        // Clear reference validation if refId changes
        if (id === 'refId') {
            setReferenceName('');
            setIsReferenceValid(false);
            setErrorMessage('');
        }
    };

    const validateReference = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/validateRef/${formData.refId}`);
            setReferenceName(response.data.name);
            setIsReferenceValid(true);
            setErrorMessage('');
        } catch (err) {
            setIsReferenceValid(false);
            setErrorMessage(
                err.response?.data?.message || 'Failed to validate reference ID.'
            );
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isReferenceValid) return;

        setIsSubmitting(true);
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/register`, formData);
            setSuccessMessage(response.data.customerID);
        } catch (err) {
            console.error(err);
            setErrorMessage(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    formData.referenceCustomer = referenceName;

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            {!successMessage && (
                <div className="flex-1 bg-gray-100 flex flex-col justify-center items-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Register</h1>
                    <form className="bg-white p-6 rounded shadow-md w-80" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                                placeholder="Enter your phone number"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="place">
                                Place
                            </label>
                            <input
                                type="text"
                                id="place"
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                                placeholder="Enter your place"
                                value={formData.place}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="refId">
                                Referral ID
                            </label>
                            <input
                                type="text"
                                id="refId"
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                                placeholder="Reference ID"
                                value={formData.refId}
                                onChange={handleChange}
                                onBlur={validateReference}
                                required
                            />
                            {isReferenceValid && (
                                <p className="text-green-600 text-sm mt-1">Reference Name: {referenceName}</p>
                            )}
                            {errorMessage && (
                                <p className="text-red-600 text-sm mt-1">{errorMessage}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                                placeholder="Create a password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className={`w-full ${isReferenceValid ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400'
                                } text-white py-2 px-4 rounded focus:outline-none focus:ring`}
                            disabled={!isReferenceValid || isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Register'}
                        </button>
                        {errorMessage && (
                            <p className="text-red-600 text-sm mt-4">{errorMessage}</p>
                        )}
                    </form>
                    <Link to={'/login'}>
                        <div className="text-green-600 mt-4 cursor-pointer">
                            Already have an account? <span className="underline">Login</span>
                        </div>
                    </Link>
                </div>
            )}
            {successMessage && <RegisterDone id={successMessage} />}
        </div>
    );
}
