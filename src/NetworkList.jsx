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

        const references = levelResponse.data.references;
        const formattedLevels = {};

        Object.keys(references).forEach((level, index) => {
          formattedLevels[level] = [];

          references[level].forEach((sponsor) => {
            sponsor.children?.forEach((child) => {
              formattedLevels[level].push({
                ...child,
                sponsorID: sponsor.customerID,
                sponsorName: sponsor.name,
                sponsorMobile: sponsor.mobile || "N/A",
              });
            });
          });
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
                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full border border-gray-300">
                      <thead className="bg-gray-100">
                        <tr className="text-left">
                          <th className="border px-4 py-2">S/No</th>
                          <th className="border px-4 py-2">ID</th>
                          <th className="border px-4 py-2">Name</th>
                          <th className="border px-4 py-2">Mobile</th>
                          <th className="border px-4 py-2">Sponsor ID</th>
                          <th className="border px-4 py-2">Sponsor Name</th>
                          <th className="border px-4 py-2">Sponsor Contact</th>
                        </tr>
                      </thead>
                      <tbody>
                        {levels[level].map((person, i) => (
                          <tr key={i} className="border hover:bg-gray-50">
                            <td className="border px-4 py-2">{i + 1}</td>
                            <td className="border px-4 py-2">{person.customerID}</td>
                            <td className="border px-4 py-2">{person.name}</td>
                            <td className="border px-4 py-2">{person.mobile}</td>
                            <td className="border px-4 py-2">{person.sponsorID}</td>
                            <td className="border px-4 py-2">{person.sponsorName}</td>
                            <td className="border px-4 py-2">{person.sponsorMobile}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

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