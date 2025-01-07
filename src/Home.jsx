import React from 'react';
import Header from './Header';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-teal-400 to-indigo-500 flex flex-col">
      <Header/>
      <main className="flex-grow flex flex-col justify-center items-center text-center p-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 drop-shadow-md">
          Welcome to Hope Community Welfare Foundation
        </h1>
        <p className="text-xl text-gray-800 mb-6 max-w-3xl mx-auto">
          We are dedicated to enriching lives and creating a positive impact through our community-driven initiatives. Join us in making a difference.
        </p>
        <div className="mt-6">
          <a href="#join-us" className="bg-teal-500 text-gray-800 py-2 px-6 rounded-lg text-lg font-semibold hover:bg-teal-400 transition-all">
            Join Us
          </a>
        </div>
      </main>
      <footer className="bg-gray-800 text-white text-center py-6">
        <div className="container mx-auto px-4">
          <p className="text-sm md:text-base">&copy; {new Date().getFullYear()} Hope Community Welfare Foundation. All rights reserved.</p>
          <p className="text-xs md:text-sm mt-2">Follow us on social media for the latest updates!</p>
        </div>
      </footer>
    </div>
  );
}
