import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';

export default function Home() {

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-500 via-teal-400 to-indigo-500 flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col justify-center items-center text-center p-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 drop-shadow-md">
          Welcome to Hope Community Welfare Foundation
        </h1>
        <p className="text-xl text-gray-800 mb-6 max-w-3xl mx-auto">
          We are dedicated to enriching lives and creating a positive impact through our community-driven initiatives. Join us in making a difference.
        </p>
        <div className="mt-6">
          <Link to="/login">
            <button className="bg-teal-500 text-gray-800 py-2 px-6 rounded-lg cursor-pointer text-lg font-semibold hover:bg-teal-400 transition-all">
              Join Us
            </button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
