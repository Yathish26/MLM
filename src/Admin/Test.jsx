import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AddCustomer() {
    const [name, setName] = useState('');
    const [place, setPlace] = useState('');
    const [mobile, setMobile] = useState('');
    const [buttonText, setButtonText] = useState('Add Customer');
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = { name, place, mobile };

        setButtonText('Adding...');
        setButtonDisabled(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/test/adduser`, {
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
        <div className="flex flex-col items-center justify-center min-h-screen bg-orange-50">
            <div className="w-full max-w-md p-6 space-y-4 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-orange-600">Add Customer</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                            placeholder="Enter customer name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="place" className="block text-sm font-medium text-gray-700">
                            Place
                        </label>
                        <input
                            type="text"
                            id="place"
                            name="place"
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                            placeholder="Enter place"
                            value={place}
                            onChange={(e) => setPlace(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                            Mobile Number
                        </label>
                        <input
                            type="tel"
                            id="mobile"
                            name="mobile"
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                            placeholder="Enter mobile number"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full px-4 py-2 text-white bg-orange-500 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 ${buttonDisabled ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        disabled={buttonDisabled}
                    >
                        {buttonText}
                    </button>
                    {errorMessage && <p className="mt-2 text-sm text-red-500">{errorMessage}</p>}
                </form>
            </div>
            <Link to="/admin/sheet">
                <button className="w-40 px-4 py-2 mt-4 text-white bg-orange-500 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400">
                    Data Sheet
                </button>
            </Link>
        </div>
    );
}
