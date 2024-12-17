import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Addusers() {
    const [name, setName] = useState('');
    const [referenceId, setReferenceId] = useState('');
    const [place, setPlace] = useState('');
    const [mobile, setMobile] = useState('');
    const [buttonText, setButtonText] = useState('Add Customer');
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
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
            referenceId,
            place,
            mobile,
        };

        setButtonText('Adding...');
        setButtonDisabled(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/adduser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (response.ok) {
                setButtonText('Added');
                setErrorMessage('');
                setTimeout(() => {
                    setButtonText('Add Customer');
                    setName('');
                    setReferenceId('');
                    setPlace('');
                    setMobile('');
                }, 1000);
            } else {
                setButtonText('Error');
                setErrorMessage(data.message || 'Error adding customer');
                setTimeout(() => setButtonText('Add Customer'), 1000);
            }
        } catch (error) {
            console.error('Error:', error);
            setButtonText('Error');
            setErrorMessage('Something went wrong!');
            setTimeout(() => setButtonText('Add Customer'), 1000);
        } finally {
            setButtonDisabled(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-lg p-8 space-y-6 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold text-center text-gray-700">Add Customer</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-600">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                            placeholder="Enter customer name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="referenceId" className="block text-sm font-medium text-gray-600">Reference ID</label>
                        <input
                            type="text"
                            id="referenceId"
                            name="referenceId"
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                            placeholder="Enter reference ID"
                            value={referenceId}
                            onChange={(e) => setReferenceId(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="place" className="block text-sm font-medium text-gray-600">Place</label>
                        <input
                            type="text"
                            id="place"
                            name="place"
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                            placeholder="Enter place"
                            value={place}
                            onChange={(e) => setPlace(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="mobile" className="block text-sm font-medium text-gray-600">Mobile Number</label>
                        <input
                            type="tel"
                            id="mobile"
                            name="mobile"
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                            placeholder="Enter mobile number"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                        disabled={buttonDisabled}
                    >
                        {buttonText}
                    </button>
                    {errorMessage && (
                        <p className="mt-2 text-sm text-red-500">{errorMessage}</p>
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
