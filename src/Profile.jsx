import React, { useEffect, useState } from 'react';
import Header from './Header';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Loading from './smallcomponents/Loading';

export default function Profile() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    const FailedProfile = () => {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
                <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-lg">
                    <h1 className="text-2xl font-bold text-gray-700 text-center mb-6">
                        Oops! Unable to Fetch Profile
                    </h1>
                    <p className="text-gray-600 text-center mb-6">
                        We encountered an issue while fetching your profile. Please check your connection or try logging in again.
                    </p>
                    <div className="flex justify-center">
                        <button
                            onClick={() => navigate('/login')}
                            className="bg-green-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-1"
                        >
                            Go to Login
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    useEffect(() => {
        const customertoken = localStorage.getItem('customertoken');

        if (!customertoken) {
            navigate('/login');
        }
        const fetchProfile = async () => {
            try {

                const response = await axios.get(`${import.meta.env.VITE_API_URL}/profile`, {
                    headers: {
                        Authorization: `Bearer ${customertoken}`
                    }
                });
                setProfile(response.data.profile);
            } catch (err) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('customertoken');
        navigate('/login');
    }

    const handleRefferal = () => {
        const link = `${window.location.origin}/register/${profile.customerID}`
        navigator.clipboard.writeText(link);
    }

    if (loading) {
        return (
            <div className='flex min-h-screen justify-center items-center'>
                <Loading />
            </div>
        )
    }

    if (error) {
        return <FailedProfile />;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Header />
            <div className='flex flex-1 justify-center items-center'>
                <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                    <div className="flex justify-center mb-4">
                        <svg className='w-32 h-32' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path d="M14.5 8.5C14.5 9.88071 13.3807 11 12 11C10.6193 11 9.5 9.88071 9.5 8.5C9.5 7.11929 10.6193 6 12 6C13.3807 6 14.5 7.11929 14.5 8.5Z" fill="#000000"></path>
                                <path d="M15.5812 16H8.50626C8.09309 16 7.87415 15.5411 8.15916 15.242C9.00598 14.3533 10.5593 13 12.1667 13C13.7899 13 15.2046 14.3801 15.947 15.2681C16.2011 15.5721 15.9774 16 15.5812 16Z" fill="#000000" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                <circle cx="12" cy="12" r="10" stroke="#000000" strokeWidth="2"></circle>
                            </g>
                        </svg>
                    </div>
                    <h2 className="text-center text-3xl font-semibold text-gray-800 mb-4">
                        {profile.name}
                    </h2>
                    <div className="flex items-center justify-center space-x-2 mb-4">
                        <span className="font-medium text-gray-700">ID:</span>
                        <span className="text-gray-600">{profile.customerID}</span>
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <span className="font-medium text-gray-700">Phone:</span>
                            <span className="text-gray-600">{profile.mobile}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-gray-700">Place:</span>
                            <span className="text-gray-600">{profile.place}</span>
                        </div>
                    </div>
                    <div className="mt-6 text-center">
                        <button onClick={handleLogout} className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600">
                            Logout
                        </button>
                    </div>
                    <div className="mt-6 text-center">
                        <button onClick={handleRefferal} className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600">
                            Copy Referral Link
                        </button>
                    </div>
                    <Link to="/profile/password">
                        <div className="mt-6 text-center">
                            <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600">
                                Change Password
                            </button>
                        </div>
                    </Link>
                    <Link to="/profile/network">
                        <div className="mt-6 text-center">
                            <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600">
                                My Network
                            </button>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}


