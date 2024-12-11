import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header/>
      <main className="flex-grow flex flex-col justify-center items-center text-center p-8">
        <h1 className="text-5xl font-extrabold text-gray-800">Welcome to Hope Community Welfare Foundation</h1>
        <p className="text-xl text-gray-700 mt-4 max-w-prose">
          We are dedicated to enriching lives and creating a positive impact through our community-driven initiatives. Join us in making a difference.
        </p>
      </main>
      <footer className="bg-gray-800 text-white text-center p-4">
        <p>&copy; {new Date().getFullYear()} Hope Community Welfare Foundation. All rights reserved.</p>
      </footer>
    </div>
  );
}

