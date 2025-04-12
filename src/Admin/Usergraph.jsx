import React, { useEffect, useState } from 'react';
import Tree from 'react-d3-tree';
import Loading from '../smallcomponents/Loading';
import Header from '../Header';
import { useNavigate } from 'react-router-dom';

export default function NetworkByCustomerID() {
    const [customerIDInput, setCustomerIDInput] = useState('');
    const [treeData, setTreeData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/admin');
        }
    }, [navigate]);


    const handleSearch = async () => {
        if (!customerIDInput.trim()) return;

        setLoading(true);
        setError('');
        setTreeData(null);

        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/sheet`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                if (response.status === 401 || response.status === 403) {
                    setError('Session expired. Please login again.');
                } else {
                    setError('Failed to fetch data.');
                }
                return;
            }

            const result = await response.json();
            const transformedData = transformDataToSubtree(result.customers, customerIDInput);

            if (!transformedData) {
                setError('Customer not found or has no children.');
            } else {
                setTreeData(transformedData);
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred while fetching data.');
        } finally {
            setLoading(false);
        }
    };

    const transformDataToSubtree = (data, rootCustomerID) => {
        const idToNodeMap = {};
        const userNode = data.find((user) => user.customerID === rootCustomerID);

        if (!userNode) return null;

        data.forEach((user) => {
            idToNodeMap[user.customerID] = {
                name: user.name,
                children: [],
            };
        });

        const buildSubtree = (nodeId) => {
            const node = idToNodeMap[nodeId];
            data.forEach((user) => {
                if (user.referenceId === nodeId && idToNodeMap[user.customerID]) {
                    node.children.push(buildSubtree(user.customerID));
                }
            });
            return node;
        };

        return buildSubtree(rootCustomerID);
    };

    return (
        <div className="w-full min-h-screen flex flex-col bg-gray-100">
            <Header />
            <div className="flex flex-col items-center mt-6 px-4">
                <h2 className="text-2xl font-bold text-blue-600 mb-4">Search Network by Customer ID</h2>
                <div className="flex gap-4 mb-6">
                    <input
                        type="text"
                        value={customerIDInput}
                        onChange={(e) => setCustomerIDInput(e.target.value)}
                        placeholder="Enter Customer ID"
                        className="border border-blue-500 px-4 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Show Network
                    </button>
                </div>

                {loading && (
                    <div className="flex justify-center items-center h-40">
                        <Loading />
                    </div>
                )}

                {error && (
                    <div className="text-red-600 font-semibold">{error}</div>
                )}

                {treeData && (
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
                )}
            </div>
        </div>
    );
}
