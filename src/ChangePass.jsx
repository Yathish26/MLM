import React, { useEffect, useState } from 'react';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ChangePass() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [profile, setProfile] = useState(null);

    const navigate = useNavigate();

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
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();

    }, [])

    const customerID = profile ? profile.customerID : null;

    const handleOldPasswordChange = (e) => {
        setOldPassword(e.target.value);
        setError('');
        setSuccess(false);
    };

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
        setError('');
        setSuccess(false);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setError('');
        setSuccess(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setError('New passwords do not match!');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            const token = localStorage.getItem('customertoken');
            const response = await fetch(`${import.meta.env.VITE_API_URL}/change-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ customerID, oldPassword, newPassword }),
            });

            const result = await response.json();

            if (response.ok) {
                setSuccess(true);
                setOldPassword('');
                setNewPassword('');
                setConfirmPassword('');
                setTimeout(() => {
                    navigate('/profile');
                }, 1000);
            } else {
                setError(result.message || 'Failed to change password. Please try again.');
            }
        } catch (err) {
            setError('An error occurred while changing the password.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-1 flex items-center justify-center bg-green-100">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">Change Password</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-1" htmlFor="oldPassword">
                                Old Password
                            </label>
                            <input
                                type="password"
                                id="oldPassword"
                                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-green-300"
                                placeholder="Enter your old password"
                                value={oldPassword}
                                onChange={handleOldPasswordChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1" htmlFor="newPassword">
                                New Password
                            </label>
                            <input
                                type="password"
                                id="newPassword"
                                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-green-300"
                                placeholder="Enter your new password"
                                value={newPassword}
                                onChange={handleNewPasswordChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1" htmlFor="confirmPassword">
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-green-300"
                                placeholder="Re-enter your new password"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                required
                            />
                        </div>
                        {error && <p className="text-red-600 text-sm">{error}</p>}
                        {success && (
                            <p className="text-green-600 text-sm">
                                Password changed successfully!
                            </p>
                        )}
                        <button
                            type="submit"
                            className={`w-full py-2 px-4 rounded text-white font-bold ${oldPassword && newPassword && confirmPassword && newPassword === confirmPassword
                                ? 'bg-green-600 hover:bg-green-700 focus:ring-green-300'
                                : 'bg-gray-400 cursor-not-allowed'
                                }`}
                            disabled={!oldPassword || !newPassword || !confirmPassword || newPassword !== confirmPassword || loading}
                        >
                            {loading ? 'Changing...' : 'Change Password'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
