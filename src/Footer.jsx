import React from 'react'

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white text-center py-6">
            <div className="container mx-auto px-4">
                <p className="text-sm md:text-base">&copy; {new Date().getFullYear()} Hope Community Welfare Foundation. All rights reserved.</p>
            </div>
        </footer>
    )
}
