import React, { useState, useEffect } from 'react';
import Tree from 'react-d3-tree';
import Loading from './smallcomponents/Loading';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

export default function Network() {
  const [treeData, setTreeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('customertoken');
    navigate('/login');
  };

  useEffect(() => {
    const customertoken = localStorage.getItem('customertoken');

    if (!customertoken) {
      handleLogout();
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/sheet`, {
          headers: {
            Authorization: `Bearer ${customertoken}`,
          },
        });

        if (response.status === 401 || response.status === 403) {
          handleLogout();
          return;
        }

        const result = await response.json();

        if (response.ok) {
          const loggedInUserId = extractUserIdFromToken(customertoken); // Extract user ID from the token
          const transformedData = transformDataToSubtree(result.customers, loggedInUserId);
          setTreeData(transformedData);
        } else {
          setError('Failed to fetch user data');
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  // Extract logged-in user ID from the token (this assumes the token has a customerID field in its payload)
  const extractUserIdFromToken = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.customerID;
    } catch (err) {
      console.error('Error parsing token:', err);
      return null;
    }
  };

  // Transform the data into a subtree starting from the logged-in user
  const transformDataToSubtree = (data, loggedInUserId) => {
    const idToNodeMap = {};
    const userNode = data.find((user) => user.customerID === loggedInUserId);

    if (!userNode) {
      return null; // No matching user found
    }

    // Create a map of all nodes
    data.forEach((user) => {
      idToNodeMap[user.customerID] = {
        name: user.name,
        children: [],
      };
    });

    // Build the tree starting from the logged-in user
    const buildSubtree = (nodeId) => {
      const node = idToNodeMap[nodeId];
      data.forEach((user) => {
        if (user.referenceId === nodeId && idToNodeMap[user.customerID]) {
          node.children.push(buildSubtree(user.customerID));
        }
      });
      return node;
    };

    return buildSubtree(loggedInUserId);
  };

  if (loading)
    return (
      <div className="flex w-full justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-600">
        <div className="text-lg font-semibold">Error: {error}</div>
      </div>
    );

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />
      <div style={{ height: '100vh', width: '100%' }} className="bg-gray-100">
        <h2 className="text-center text-2xl font-bold mb-4 text-blue-600">
          My Network
        </h2>
        <div
          style={{
            height: '85vh',
            width: '90%',
            margin: '0 auto',
            border: '2px solid #2563EB',
            borderRadius: '8px',
            padding: '10px',
            backgroundColor: 'white',
            overflow: 'auto',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Tree
            data={treeData}
            orientation="vertical"
            translate={{ x: 400, y: 50 }}
            pathFunc="elbow"
            nodeSize={{ x: 200, y: 150 }}
            separation={{ siblings: 1, nonSiblings: 2 }}
          />
        </div>
      </div>
    </div>
  );
}