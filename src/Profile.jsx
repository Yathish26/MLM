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
                <div className="bg-white shadow-lg rounded-lg p-4 w-full max-w-md">
                    <div className='w-full h-fit flex justify-end'>
                        <button onClick={handleLogout} className='w-fit h-fit flex gap-2 justify-center items-center bg-green-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-1'>
                            Logout
                            <svg width="16" height="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.16667 1.80543C7.90008 1.76891 7.62737 1.75 7.35 1.75C4.25721 1.75 1.75 4.10051 1.75 7C1.75 9.89952 4.25721 12.25 7.35 12.25C7.62737 12.25 7.90008 12.2311 8.16667 12.1946" stroke="white" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M10.7915 5.54175L12.2498 7.00008L10.7915 8.45841M6.4165 7.00008H11.8947" stroke="white" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex my-4 justify-center mb-4">
                        <svg width="82" height="81" viewBox="0 0 82 81" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M41.0002 10.8154C24.4034 10.8154 10.949 24.1056 10.949 40.5C10.949 56.8944 24.4034 70.1848 41.0002 70.1848C57.597 70.1848 71.0515 56.8944 71.0515 40.5C71.0515 24.1056 57.597 10.8154 41.0002 10.8154ZM4.271 40.5C4.271 20.4624 20.7152 4.21875 41.0002 4.21875C61.2853 4.21875 77.7293 20.4624 77.7293 40.5C77.7293 60.5377 61.2853 76.7812 41.0002 76.7812C20.7152 76.7812 4.271 60.5377 4.271 40.5Z" fill="black" />
                            <path d="M29.0415 32.0625C29.0415 25.5386 34.3954 20.25 40.9998 20.25C47.6043 20.25 52.9582 25.5386 52.9582 32.0625C52.9582 38.5864 47.6043 43.875 40.9998 43.875C34.3954 43.875 29.0415 38.5864 29.0415 32.0625Z" fill="black" />
                            <path d="M18.4799 59.5593C21.9777 53.5126 28.4872 49.7812 35.5372 49.7812H46.4596C53.5095 49.7812 60.0193 53.5126 63.5169 59.5593L66.9989 66.1257C60.35 72.7083 51.1558 76.7809 40.9987 76.7809C30.8413 76.7809 21.647 72.708 14.998 66.1257L18.4799 59.5593Z" fill="black" />
                        </svg>

                    </div>
                    <h2 className="text-center text-3xl font-semibold text-gray-800 mb-4">
                        {profile.name}
                    </h2>
                    <div className="flex items-center justify-center space-x-2 mb-4">
                        <span className="font-medium text-gray-700">ID:</span>
                        <span className="text-gray-600">{profile.customerID}</span>
                    </div>
                    <div className="my-3 text-center">
                        <button onClick={handleRefferal} className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600">
                            Copy Referral Link
                        </button>
                    </div>
                    
                    <div className=" flex flex-col items-center gap-2">
                        <div className="flex gap-2">
                            <span className="font-medium text-gray-700">Phone:</span>
                            <span className="text-gray-600">{profile.mobile}</span>
                        </div>
                        <div className="flex gap-2">
                            <span className="font-medium text-gray-700">Place:</span>
                            <span className="text-gray-600">{profile.place}</span>
                        </div>
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
                    <Link to="/profile/network/list">
                        <div className="mt-6 text-center">
                            <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600">
                                My Network List
                            </button>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}


