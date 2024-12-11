import React from 'react';
import Header from './Header';

export default function Profile() {
    return (

        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Header />
            <div className='flex flex-1 justify-center items-center'>
                <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                    <div className="flex justify-center mb-4">
                        <svg className='w-32 h-32' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14.5 8.5C14.5 9.88071 13.3807 11 12 11C10.6193 11 9.5 9.88071 9.5 8.5C9.5 7.11929 10.6193 6 12 6C13.3807 6 14.5 7.11929 14.5 8.5Z" fill="#000000"></path> <path d="M15.5812 16H8.50626C8.09309 16 7.87415 15.5411 8.15916 15.242C9.00598 14.3533 10.5593 13 12.1667 13C13.7899 13 15.2046 14.3801 15.947 15.2681C16.2011 15.5721 15.9774 16 15.5812 16Z" fill="#000000" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <circle cx="12" cy="12" r="10" stroke="#000000" strokeWidth="2"></circle> </g></svg>
                    </div>
                    <h2 className="text-center text-3xl font-semibold text-gray-800 mb-4">John Doe</h2>
                    <div className="flex items-center justify-center space-x-2 mb-4">
                        <span className="font-medium text-gray-700">ID:</span>
                        <span className="text-gray-600">HCWF0001</span>
                        <button className="bg-gray-200 rounded px-2 py-1 hover:bg-gray-300 transition duration-150">
                            <svg className='w-6 h-6' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19.53 8L14 2.47C13.8595 2.32931 13.6688 2.25018 13.47 2.25H11C10.2707 2.25 9.57118 2.53973 9.05546 3.05546C8.53973 3.57118 8.25 4.27065 8.25 5V6.25H7C6.27065 6.25 5.57118 6.53973 5.05546 7.05546C4.53973 7.57118 4.25 8.27065 4.25 9V19C4.25 19.7293 4.53973 20.4288 5.05546 20.9445C5.57118 21.4603 6.27065 21.75 7 21.75H14C14.7293 21.75 15.4288 21.4603 15.9445 20.9445C16.4603 20.4288 16.75 19.7293 16.75 19V17.75H17C17.7293 17.75 18.4288 17.4603 18.9445 16.9445C19.4603 16.4288 19.75 15.7293 19.75 15V8.5C19.7421 8.3116 19.6636 8.13309 19.53 8ZM14.25 4.81L17.19 7.75H14.25V4.81ZM15.25 19C15.25 19.3315 15.1183 19.6495 14.8839 19.8839C14.6495 20.1183 14.3315 20.25 14 20.25H7C6.66848 20.25 6.35054 20.1183 6.11612 19.8839C5.8817 19.6495 5.75 19.3315 5.75 19V9C5.75 8.66848 5.8817 8.35054 6.11612 8.11612C6.35054 7.8817 6.66848 7.75 7 7.75H8.25V15C8.25 15.7293 8.53973 16.4288 9.05546 16.9445C9.57118 17.4603 10.2707 17.75 11 17.75H15.25V19ZM17 16.25H11C10.6685 16.25 10.3505 16.1183 10.1161 15.8839C9.8817 15.6495 9.75 15.3315 9.75 15V5C9.75 4.66848 9.8817 4.35054 10.1161 4.11612C10.3505 3.8817 10.6685 3.75 11 3.75H12.75V8.5C12.7526 8.69811 12.8324 8.88737 12.9725 9.02747C13.1126 9.16756 13.3019 9.24741 13.5 9.25H18.25V15C18.25 15.3315 18.1183 15.6495 17.8839 15.8839C17.6495 16.1183 17.3315 16.25 17 16.25Z" fill="#2dd100"></path> </g></svg>
                        </button>
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <span className="font-medium text-gray-700">Email:</span>
                            <span className="text-gray-600">johndoe@example.com</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-gray-700">Phone:</span>
                            <span className="text-gray-600">+1 (555) 123-4567</span>
                        </div>
                    </div>
                    <div className="mt-6 text-center">
                        <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600">
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
