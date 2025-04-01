import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Addusers() {
    const [name, setName] = useState('');
    const [referenceId, setReferenceId] = useState('');
    const [referenceCustomer, setReferenceCustomer] = useState('');
    const [referenceError, setReferenceError] = useState('');
    const [place, setPlace] = useState('');
    const [mobile, setMobile] = useState('');
    const [buttonText, setButtonText] = useState('Add Customer');
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [submitDisabled, setSubmitDisabled] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/admin');
        }
    }, [navigate]);

    const validateReferenceId = async (id) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/validate-reference/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            const data = await response.json();

            if (response.ok) {
                setReferenceCustomer(data.name);
                setReferenceError('');
                setSubmitDisabled(false);
            } else if (data.message === 'Invalid or expired token') {
                localStorage.removeItem('token');
                navigate('/admin');
            } else {
                setReferenceCustomer('');
                setReferenceError('No User Found');
                setSubmitDisabled(true);
            }

        } catch (error) {
            console.error('Error validating Reference ID:', error);
            setReferenceCustomer('');
            setReferenceError('Error validating Reference ID');
            setSubmitDisabled(true);
        }
    };

    const handleReferenceIdBlur = (e) => {
        const id = e.target.value.trim();
        setReferenceId(id);

        if (id === '') {
            setReferenceCustomer('');
            setReferenceError('');
            setSubmitDisabled(true);
            return;
        }

        validateReferenceId(id);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            name,
            referenceId,
            referenceCustomer,
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
                    setReferenceCustomer('');
                    setSubmitDisabled(true);
                }, 1000);
            } else if (data.message === 'Invalid or expired token') {
                localStorage.removeItem('token');
                navigate('/admin');
                return;
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
                <div className="flex items-center justify-center bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01m-6.938 4h13.856c1.054 0 1.582 1.28.832 2.02l-6.929 7.07a1.25 1.25 0 01-1.796 0l-6.93-7.07c-.75-.74-.222-2.02.832-2.02z"></path>
                    </svg>
                    <span className="font-bold">Alert:</span>
                    <span className="ml-2">Currently Disabled</span>
                </div>
                {/* <form className="space-y-4" onSubmit={handleSubmit}>
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
                            onBlur={handleReferenceIdBlur}
                            required
                        />
                        {referenceCustomer && (
                            <p className="mt-2 text-sm text-green-500">Reference Name: {referenceCustomer}</p>
                        )}
                        {referenceError && (
                            <p className="mt-2 text-sm text-red-500">{referenceError}</p>
                        )}
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
                        className={`w-full px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 ${submitDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={buttonDisabled || submitDisabled}
                    >
                        {buttonText}
                    </button>
                    {errorMessage && (
                        <p className="mt-2 text-sm text-red-500">{errorMessage}</p>
                    )}
                </form> */}
            </div>
            <Link to={'/admin/sheet'}>
                <button className="w-52 px-4 py-2 mt-4 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400">
                    Data Sheet
                </button>
            </Link>
        </div>
    );
}
