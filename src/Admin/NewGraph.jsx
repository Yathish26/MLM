import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MLMTree = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openNodes, setOpenNodes] = useState({});
  const [isAllOpen, setIsAllOpen] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/admin");
    }
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/sheet`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setData(data.customers);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleNode = (id) => {
    setOpenNodes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleAllNodes = () => {
    const newState = !isAllOpen;
    const updatedNodes = {};

    data.forEach((person) => {
      updatedNodes[person.customerID] = newState;
    });

    setOpenNodes(updatedNodes);
    setIsAllOpen(newState);
  };

  const buildTree = (data, parentId = "SS0000000001") => {
    const children = data.filter((person) => person.referenceId === parentId);
    if (!children.length) return null;

    return (
      <ul>
        {children.map((person) => (
          <li key={person.customerID}>
            <div className="node" onClick={() => toggleNode(person.customerID)}>
              {person.name}
            </div>
            {openNodes[person.customerID] && buildTree(data, person.customerID)}
          </li>
        ))}
      </ul>
    );
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>MLM Structure</h1>
      <button
        onClick={toggleAllNodes}
        className="mb-4 px-4 py-2 bg-black text-white rounded shadow-md hover:bg-blue-600"
      >
        {isAllOpen ? "Close All" : "Open All"}
      </button>
      {buildTree(data)}

      <style>
        {`
          body {
            font-family: Arial, sans-serif;
          }
          ul {
            list-style-type: none;
            padding-left: 20px;
            position: relative;
          }
          ul ul {
            margin-left: 20px;
          }
          li {
            position: relative;
            margin-left: 20px;
          }
          li::before {
            content: '';
            position: absolute;
            top: 0;
            left: -10px;
            width: 10px;
            height: 1px;
            background-color: #000;
          }
          li::after {
            content: '';
            position: absolute;
            top: 0;
            left: -10px;
            width: 1px;
            height: 100%;
            background-color: #000;
          }
          li:last-child::after {
            height: 50%;
          }
          .node {
            cursor: pointer;
            padding: 5px;
            background-color: #f0f0f0;
            border-radius: 4px;
            display: inline-block;
            margin-bottom: 10px;
          }
          button {
            display: block;
            margin-bottom: 10px;
          }
        `}
      </style>
    </div>
  );
};

export default MLMTree;
