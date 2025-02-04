import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';

export default function Home() {

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-500 via-teal-400 to-indigo-500 flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col justify-center items-center text-center p-10">
        <img className="w-32 h-32 mb-6" src="/favicon/icon.png" alt="Logo" />
        <h1 className="text-4xl font-bold text-gray-800 mb-6 drop-shadow-md">
          Welcome to Hope Community Welfare Foundation
        </h1>
        <p className="text-xl text-gray-800 mb-6 max-w-3xl mx-auto">
        A unique charitable welfare initiative focused on supporting the underprivileged while empowering individuals to grow financially through a sustainable team-based model.
        </p>
        <div className="mt-6">
          <Link to="/profile">
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
