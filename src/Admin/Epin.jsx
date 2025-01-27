import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from '../smallcomponents/Loading';

export default function Epin() {
    const [pins, setPins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Add error handling

    const navigate = useNavigate();

    useEffect(() => {
        const adminToken = localStorage.getItem('token');

        if (!adminToken) {
            navigate('/admin');
        }
    }, [navigate]);

    useEffect(() => {
        const fetchPins = async () => {
            try {
                setLoading(true);
                setError(null); 

                await axios.post(`${import.meta.env.VITE_API_URL}/generate-pins`);

                const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/epins`);
                setPins(response.data);
            } catch (error) {
                console.error('Error fetching pins:', error);
                setError('Failed to load pins. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchPins();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loading />
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen p-6">
            <h1 className="text-xl font-bold text-green-700 mb-4">Available Pins</h1>
            {error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <ul className="list-disc list-inside space-y-2 text-green-800">
                    {pins.length > 0 ? (
                        pins.map((pin, index) => (
                            <li key={index} className="p-2">
                                {pin.pinNumber}
                            </li>
                        ))
                    ) : (
                        <p className="text-red-500">No pins available.</p>
                    )}
                </ul>
            )}
        </div>
    );
}
