import React from 'react'

export default function Disabled() {
    return (
        <div className="flex items-center justify-center bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01m-6.938 4h13.856c1.054 0 1.582 1.28.832 2.02l-6.929 7.07a1.25 1.25 0 01-1.796 0l-6.93-7.07c-.75-.74-.222-2.02.832-2.02z"></path>
            </svg>
            <span className="font-bold">Alert:</span>
            <span className="ml-2">Currently Disabled</span>
        </div>
    )
}
