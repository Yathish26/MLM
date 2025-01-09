import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from './smallcomponents/Loading';
import axios from 'axios';

export default function FamilyNetwork() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ssid, setSSID] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const customertoken = localStorage.getItem('customertoken');

    if (!customertoken) {
      navigate('/login');
      return;
    }

    const fetchUserData = async () => {
      try {
        const profileResponse = await axios.get(`${import.meta.env.VITE_API_URL}/profile`, {
          headers: { Authorization: `Bearer ${customertoken}` },
        });
        setSSID(profileResponse.data.profile);

        const dataResponse = await axios.get('http://localhost:5000/admin/sheet', {
          headers: {
            'Authorization': `Bearer ${customertoken}`,
            'Content-Type': 'application/json',
          },
        });

        const data = dataResponse.data.customers;

        const loggedInUser = data.find(user => user.customerID === profileResponse.data.profile.customerID);

        if (loggedInUser) {
          const family = getFamilyMembers(loggedInUser, data, new Set());
          setUserData(family);
        } else {
          setError('User not found.');
        }
      } catch (err) {
        setError('An error occurred while fetching data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  // Get all family members, without duplicates
  const getFamilyMembers = (user, allUsers, seenUsers) => {
    if (seenUsers.has(user.customerID)) return [];
    seenUsers.add(user.customerID);

    // Start with the user and find all their descendants (children, grandchildren, etc.)
    const familyMembers = [user];

    const children = allUsers.filter(u => u.referenceId === user.customerID);
    children.forEach(child => {
      familyMembers.push(...getFamilyMembers(child, allUsers, seenUsers));
    });

    return familyMembers;
  };

  const renderFamilyList = (family) => {
    return family.map((person, index) => (
      <div key={index} className="border-b py-4">
        <div className="font-semibold">{person.name}</div>
        <div className="text-sm text-gray-600">Mobile: {person.mobile}</div>
        <div className="text-sm text-gray-600">Place: {person.place}</div>
      </div>
    ));
  };

  if (loading)
    return (
      <div className="flex w-full justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
    
  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">{ssid ? `${ssid.name}'s Network` : 'Loading...'}</h2>
      <div className="bg-white shadow-lg rounded-lg p-6">
        {userData.length === 0 ? (
          <div className="text-center text-gray-600">No family members found.</div>
        ) : (
          <div className="space-y-4">
            {renderFamilyList(userData)}
          </div>
        )}
      </div>
    </div>
  );
}
