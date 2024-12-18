import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../smallcomponents/Loading';

export default function Sheet() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/admin');
    } else {
      setLoading(true);
      fetch(`${import.meta.env.VITE_API_URL}/admin/sheet`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(data => {
          if (data.customers) {
            setUsers(data.customers);
            setLoading(false);
          } else {
            console.error('Error fetching data:', data.message);
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');

    navigate('/admin');
  };

  if (loading) {
    return (
      <div className='w-full min-h-screen flex flex-col items-center justify-center'>
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className='text-xl font-bold text-gray-700 text-center py-4'>User List Sheet</h2>
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg">
        <div className='flex p-4 w-full justify-between items-center'>
          <Link to="/admin/addusers">
            <button className='bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600'>
              <img className='w-6 h-6' src="/svg/add.svg" alt="Add" />
            </button>
          </Link>

          <div className='flex gap-2'>
            <Link to="/admin/network">
              <button className='bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600'>
                <img className='w-6 h-6' src="/svg/network.svg" alt="Network" />
              </button>
            </Link>
            <button onClick={handleLogout} className='bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600'>
              <img className='w-6 h-6' src="/svg/logout.svg" alt="Logout" />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Customer ID</th>
                <th className="py-3 px-6 text-left">Reference ID</th>
                <th className="py-3 px-6 text-left">Reference Customer</th>
                <th className="py-3 px-6 text-left">Place</th>
                <th className="py-3 px-6 text-left">Mobile Number</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {users.map((user, index) => (
                <tr
                  key={index}
                  className={`border-b border-gray-200 hover:bg-gray-100 ${index % 2 === 0 ? "bg-gray-50" : ""
                    }`}
                >
                  <td className="py-3 px-6 text-left">{user.name}</td>
                  <td className="py-3 px-6 text-left">{user.customerID}</td>
                  <td className="py-3 px-6 text-left">{user.referenceId}</td>
                  <td className="py-3 px-6 text-left">{user.referenceCustomer}</td>
                  <td className="py-3 px-6 text-left">{user.place}</td>
                  <td className="py-3 px-6 text-left">{user.mobile}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
