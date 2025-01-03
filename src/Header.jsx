import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <nav className="bg-green-600 text-white p-4">
            <ul className="flex justify-around">
                <li><Link to="/" className="text-lg hover:underline">Home</Link></li>
                <li><Link to="/about" className="text-lg hover:underline">About</Link></li>
                <li><Link to="/profile" className="text-lg hover:underline">Profile</Link></li>
                <li><Link to="/admin" className="text-lg hover:underline">Admin</Link></li>
            </ul>
        </nav>
    )
}
