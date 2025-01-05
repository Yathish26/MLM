import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../smallcomponents/Loading';

export default function Sheet() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [control, setControl] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [searchQuery, setSearchQuery] = useState(''); // New state for search query

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('control');
    navigate('/admin');
  };

  const handleDelete = async (customerId) => {
    const token = localStorage.getItem('token');
    if (!token) return handleLogout();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/deleteuser/${customerId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      setUsers(users.filter(user => user.customerID !== customerId));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEdit = (user) => {
    setEditRow(user.customerID);
    setEditedData(user);
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    if (!token) return handleLogout();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/updateuser/${editRow}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editedData),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      const updatedUser = await response.json();
      setUsers(users.map(user => (user.customerID === editRow ? updatedUser.customer : user)));
      setEditRow(null);
      setEditedData({});
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const adminControl = localStorage.getItem('control');

    if (adminControl === 'yes') {
      setControl(true);
    }

    if (!token) {
      handleLogout();
    } else {
      setLoading(true);
      fetch(`${import.meta.env.VITE_API_URL}/admin/sheet`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
              handleLogout();
            }
            throw new Error('Failed to fetch data');
          }
          return response.json();
        })
        .then((data) => {
          if (data.customers) {
            setUsers(data.customers);
          } else {
            console.error('Error fetching data:', data.message);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [navigate]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter users based on the search query
  const filteredUsers = users.filter((user) => {
    const lowercasedQuery = searchQuery.toLowerCase();
    return (
      user.name.toLowerCase().includes(lowercasedQuery) ||
      user.customerID.toLowerCase().includes(lowercasedQuery)
    );
  });

  if (loading) {
    return (
      <div className='w-full min-h-screen flex flex-col items-center justify-center'>
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className='text-xl font-bold text-gray-700 text-center py-4'>Users List Sheet</h2>



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
        <div className="w-full">
          <div className=" w-fit bg-white border m-8 border-gray-300 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Total Users</h2>
            <p className="text-4xl font-bold text-green-500">{users.length}</p>
          </div>
        </div>

        {/* Search Input */}
        <div className="flex p-4 items-center w-full">
          <input
            type="text"
            placeholder="Search by Name or ID"
            value={searchQuery}
            onChange={handleSearch}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
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
                {control && <th className="py-3 px-6 text-left">Child 1</th>}
                {control && <th className="py-3 px-6 text-left">Child 2</th>}
                {control && <th className="py-3 px-6 text-left">Password</th>}
                {control && <th className="py-3 px-6 text-left">Actions</th>}
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {filteredUsers.map((user, index) => (
                <tr
                  key={index}
                  className={`border-b border-gray-200 hover:bg-gray-100 ${index % 2 === 0 ? "bg-gray-50" : ""
                    }`}
                >
                  <td className="py-3 px-6 text-left">
                    {editRow === user.customerID ? (
                      <input
                        type="text"
                        value={editedData.name}
                        onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                        className="border p-2 rounded w-full"
                      />
                    ) : (
                      user.name
                    )}
                  </td>
                  <td className="py-3 px-6 text-left">{user.customerID}</td>
                  <td className="py-3 px-6 text-left">
                    {editRow === user.customerID ? (
                      <input
                        type="text"
                        value={editedData.referenceId}
                        onChange={(e) => setEditedData({ ...editedData, referenceId: e.target.value })}
                        className="border p-2 rounded w-full"
                      />
                    ) : (
                      user.referenceId
                    )}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {editRow === user.customerID ? (
                      <input
                        type="text"
                        value={editedData.referenceCustomer}
                        onChange={(e) =>
                          setEditedData({ ...editedData, referenceCustomer: e.target.value })
                        }
                        className="border p-2 rounded w-full"
                      />
                    ) : (
                      user.referenceCustomer
                    )}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {editRow === user.customerID ? (
                      <input
                        type="text"
                        value={editedData.place}
                        onChange={(e) => setEditedData({ ...editedData, place: e.target.value })}
                        className="border p-2 rounded w-full"
                      />
                    ) : (
                      user.place
                    )}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {editRow === user.customerID ? (
                      <input
                        type="text"
                        value={editedData.mobile}
                        onChange={(e) => setEditedData({ ...editedData, mobile: e.target.value })}
                        className="border p-2 rounded w-full"
                      />
                    ) : (
                      user.mobile
                    )}
                  </td>
                  {control && (
                    <td className="py-3 px-6 text-left">
                      {user.child1 ? user.child1 : "N/A"}</td>
                  )}
                  {control && (
                    <td className="py-3 px-6 text-left">
                      {user.child2 ? user.child2 : "N/A"}</td>
                  )}
                  {control && (
                    <td className="py-3 px-6 text-left">
                      {editRow === user.customerID ? (
                        <input
                          type="text"
                          value={editedData.password}
                          onChange={(e) => setEditedData({ ...editedData, password: e.target.value })}
                          className="border p-2 rounded w-full"
                        />
                      ) : (
                        user.password
                      )}
                    </td>
                  )}
                  {control && (
                    <td className="py-3 px-6 text-left flex gap-2">
                      {editRow === user.customerID ? (
                        <>
                          <button
                            onClick={handleSave}
                            className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditRow(null)}
                            className="bg-gray-500 text-white py-1 px-3 rounded hover:bg-gray-600"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEdit(user)}
                            className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(user.customerID)}
                            className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
