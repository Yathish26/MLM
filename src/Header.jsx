import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <nav className="bg-green-600 text-white p-4 shadow-md flex mo:flex-col items-center justify-between flex-wrap">
            <div className="flex items-center mo:flex-col space-x-6">
                <Link to="/">
                    <div className="w-16 h-16 flex justify-center items-center">
                        <img src="/favicon/icon.png" alt="Logo" className="object-contain shadow-lg rounded-full" />
                    </div>
                </Link>

                <Link to="/">
                    <h1 className="text-2xl font-bold tracking-wide text-center text-green-50">
                        Hope Community Welfare Foundation
                    </h1>
                </Link>
            </div>

            {/* Navigation Links */}
            <ul className="flex gap-4 my-4">
                <li><Link to="/" className="text-lg hover:text-green-200 text-green-50 transition-all">Home</Link></li>
                <li><Link to="/about" className="text-lg hover:text-green-200 text-green-50 transition-all">About</Link></li>
                <li><Link to="/profile" className="text-lg hover:text-green-200 text-green-50 transition-all">Profile</Link></li>
                <li><Link to="/tasks" className="text-lg hover:text-green-200 text-green-50 transition-all">Task</Link></li>
                {/* <li><Link to="/admin" className="text-lg hover:text-green-200 text-green-50 transition-all">Admin</Link></li> */}
                
            </ul>
        </nav>
    );
}
