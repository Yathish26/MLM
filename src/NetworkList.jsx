import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from './smallcomponents/Loading';
import axios from 'axios';
import Header from './Header';

export default function FamilyNetwork() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ssid, setSSID] = useState('');
  const [error, setError] = useState('');
  const [levels, setLevels] = useState({});
  const [expandedLevels, setExpandedLevels] = useState({});
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

        const levelResponse = await axios.get(`${import.meta.env.VITE_API_URL}/level-check?customerID=${profileResponse.data.profile.customerID}`, {
          headers: {
            Authorization: `Bearer ${customertoken}`,
            'Content-Type': 'application/json',
          },
        });

        const formattedLevels = {};
        Object.keys(levelResponse.data.references).forEach(level => {
          formattedLevels[level] = levelResponse.data.references[level].flatMap(person => person.children || []);
        });
        setLevels(formattedLevels);
      } catch (err) {
        setError('An error occurred while fetching data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const toggleLevel = (level) => {
    setExpandedLevels(prev => ({ ...prev, [level]: !prev[level] }));
  };

  if (loading) {
    return (
      <div className="flex w-full justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
  }

  if (error) return <div>{error}</div>;

  return (
    <>
      <Header />
      <div className="flex-1 bg-gray-50 p-6">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">
          {ssid ? `${ssid.name}'s Network` : 'Loading...'}
        </h2>
        <div className="bg-white shadow-lg rounded-lg p-6">
          {Object.keys(levels).map((level, index) => (
            levels[level].length > 0 && (
              <div key={index} className="mb-4">
                <div
                  className="cursor-pointer font-semibold text-lg text-blue-600 hover:underline"
                  onClick={() => toggleLevel(level)}
                >
                  {level.toUpperCase()} - {levels[level].length} Members
                </div>
                {expandedLevels[level] && (
                  <div className="pl-4 mt-2 space-y-2">
                    {levels[level].map((person, i) => (
                      <div key={i} className="border-b py-2">
                        <div className="font-semibold">{person.name}</div>
                        <div className="text-sm text-gray-600">Mobile: {person.mobile}</div>
                        <div className="text-sm text-gray-600">Place: {person.place}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          ))}
        </div>
      </div>
    </>
  );
}