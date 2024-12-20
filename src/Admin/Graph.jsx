import React, { useState, useEffect } from 'react';
import Tree from 'react-d3-tree';
import Loading from '../smallcomponents/Loading';
import { useNavigate } from 'react-router-dom';

export default function Graph() {
    const [treeData, setTreeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');


    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/admin');
    };

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            handleLogout();
        }

        const fetchData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/sheet`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status === 401 || response.status === 403) {
                    handleLogout(); // Handle expired or invalid token
                    return;
                }

                const result = await response.json();

                if (response.ok) {
                    const transformedData = transformDataToTree(result.customers);
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

    const transformDataToTree = (data) => {
        const idToNodeMap = {};
        const rootNodes = [];

        // Create a map of all nodes
        data.forEach((user) => {
            idToNodeMap[user.customerID] = {
                name: user.name,
                children: [],
            };
        });

        // Build the tree
        data.forEach((user) => {
            if (user.referenceId && idToNodeMap[user.referenceId]) {
                idToNodeMap[user.referenceId].children.push(idToNodeMap[user.customerID]);
            } else {
                rootNodes.push(idToNodeMap[user.customerID]);
            }
        });

        return rootNodes.length === 1 ? rootNodes[0] : { name: 'Root', children: rootNodes };
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
        <div style={{ height: '100vh', width: '100%' }} className="bg-gray-100">
            <h2 className="text-center text-2xl font-bold mb-4 text-blue-600">
                Hope Community Welfare Network
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
    );
}
