import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Addusers() {
    const [name, setName] = useState('');
    const [refId, setRefId] = useState('');
    const [place, setPlace] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [buttonText, setButtonText] = useState('Add Customer');
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [customerID, setCustomerID] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/admin');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            name,
            phoneNumber,
            refId,
            referenceCustomer: 'o',
            place,
            password: '123456',
        };

        setButtonText('Adding...');
        setButtonDisabled(true);
        setResponseMessage('');
        setCustomerID('');

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/addtonetworknoepin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (response.ok) {
                setResponseMessage(data.message);
                setCustomerID(data.customerID);
                setButtonText('Added');
            } else {
                setResponseMessage(data.message || 'Error adding customer');
                setButtonText('Error');
            }

        } catch (error) {
            console.error('Error:', error);
            setResponseMessage('Something went wrong!');
            setButtonText('Error');
        } finally {
            setButtonDisabled(false);
            setTimeout(() => setButtonText('Add Customer'), 1000);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-lg p-8 space-y-6 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold text-center text-gray-700">Add Customer</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Name</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                            placeholder="Enter customer name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Phone Number</label>
                        <input
                            type="tel"
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                            placeholder="Enter phone number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Reference ID</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                            placeholder="Enter reference ID"
                            value={refId}
                            onChange={(e) => setRefId(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Place</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                            placeholder="Enter place"
                            value={place}
                            onChange={(e) => setPlace(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 ${buttonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={buttonDisabled}
                    >
                        {buttonText}
                    </button>

                    {responseMessage && (
                        <div className="p-4 mt-4 text-sm text-green-700 bg-green-100 rounded-lg">
                            <p>{responseMessage}</p>
                            {customerID && <p><strong>Customer ID:</strong> {customerID}</p>}
                        </div>
                    )}
                </form>
            </div>

            <Link to={'/admin/sheet'}>
                <button className="w-52 px-4 py-2 mt-4 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400">
                    Data Sheet
                </button>
            </Link>
        </div>
    );
}
