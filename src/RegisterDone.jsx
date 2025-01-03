import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

export default function RegisterDone({ id }) {
    const [copied, setCopied] = useState(false);
    const userId = id;

    const handleCopy = () => {
        navigator.clipboard.writeText(userId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
    };

    return (
            <div className="flex flex-col items-center justify-center h-screen bg-green-50">
                <div className="bg-white shadow-md rounded-lg p-6 text-center max-w-sm w-full">
                    <h2 className="text-2xl font-bold text-green-600 mb-4">Account Registered Successfully!</h2>
                    <p className="text-gray-700 mb-4">Your ID is <span className="font-mono text-green-700">{userId}</span></p>
                    <div className='flex flex-col gap-4'>
                        <button
                            onClick={handleCopy}
                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                        >
                            {copied ? 'Copied!' : 'Copy ID'}
                        </button>
                        <Link to="/login">
                            <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2">
                                Login
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
    );
}
