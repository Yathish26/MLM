import React from 'react';
import { Link } from 'react-router-dom';


export default function Register() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Register</h1>
            <form className="bg-white p-6 rounded shadow-md w-80">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                        placeholder="Enter your full name"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                        placeholder="Enter your email"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                        placeholder="Enter your phone number"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Refferal ID
                    </label>
                    <input
                        type="text"
                        id="refid"
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                        placeholder="Reference ID"
                    />
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
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-300"
                >
                    Register
                </button>
            </form>
            <Link to={'/login'}>
                <div className='text-green-600 mt-4 cursor-pointer'>
                    Already have an account? <span className='underline'>Login</span>
                </div>
            </Link>
        </div>
    );
}

