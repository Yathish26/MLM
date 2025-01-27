import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import Loading from './smallcomponents/Loading';

export default function Task() {
    const [tasks, setTasks] = useState([]);
    const [cID, setCID] = useState(null);
    const [childs, setChilds] = useState(null);
    const [level2, setLevel2] = useState(false);
    const [payee, setPayee] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    // Fetch Customer Details
    useEffect(() => {
        const fetchCustomerDetails = async () => {
            try {
                const token = localStorage.getItem("customertoken");
                if (!token) {
                    navigate("/login");
                    return;
                }
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCID(response.data.profile?.customerID || null);
            } catch (error) {
                console.error("Error fetching customer details:", error);
            }
        };

        fetchCustomerDetails();
    }, [navigate]);

    // Fetch Tasks
    useEffect(() => {
        const fetchTasks = async () => {
            if (!cID) return;

            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/tasks?customerID=${cID}`);
                setTasks(response.data.parentProfile || []);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, [cID]);

    // Fetch Child References
    useEffect(() => {
        const fetchChilds = async () => {
            if (!cID) return;

            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/level-check?customerID=${cID}`);
                setChilds(response.data || null);
            } catch (error) {
                console.error("Error fetching childs:", error);
            }
        };

        fetchChilds();
    }, [cID]);

    // Determine if Level 2 Exists
    useEffect(() => {
        setLevel2(childs?.references?.hasOwnProperty("level2") || false);
    }, [childs]);

    // Fetch Upgrade Details
    useEffect(() => {
        const fetchUpgrade = async () => {
            if (!cID) return;

            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/upgrade/all?customerID=${cID}`);
                setPayee(response.data || null);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching upgrade details:", error);
            }
        };

        fetchUpgrade();
    }, [cID]);


    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center min-h-screen bg-green-50">
                <Loading/>
            </div>
        )
    }



    return (
        <div className="flex-1 min-h-screen bg-green-50">
            <Header />
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold text-green-700 text-center mb-8">Your Tasks</h1>
                <div className="flex flex-col gap-6 w-full items-center">
                    <div className="bg-white shadow-lg rounded-lg p-6 w-full lg:w-1/2">
                        <h2 className="text-2xl font-semibold text-green-700 mb-4 border-b pb-2">Task 1</h2>
                        <ul>
                            <li className="mb-6 bg-green-50 rounded-lg p-4 shadow-md">
                                <h3 className="text-lg font-bold text-green-800 mb-2">Send Payment</h3>
                                <p className="text-gray-700 mb-1">Make a payment to <span className="font-semibold">{tasks.name || 'Hope Community Trust'}</span></p>
                                <p className="text-gray-700 mb-1">Mobile Number: <span className="font-semibold">{tasks.mobile || '9740609159'}</span></p>
                                <p className="text-gray-700">Google Pay Number: <span className="font-semibold">{tasks.mobile || '9740609159'}</span></p>
                                <div className="flex items-center my-2 gap-2">
                                    <p className="text-green-500 font-bold text-4xl">₹300 INR</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" className="injected-svg" data-src="https://cdn.hugeicons.com/icons/arrow-up-right-03-stroke-sharp.svg" xmlnsXlink="http://www.w3.org/1999/xlink" role="img" color="#22c55e">
                                        <path d="M17.5 6.5L6 18" stroke="#22c55e" strokeWidth="2" strokeLinecap="square"></path>
                                        <path d="M8 6H18V16" stroke="#22c55e" strokeWidth="2" strokeLinecap="square"></path>
                                    </svg>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-6 w-full lg:w-1/2">
                        <h2 className="text-2xl font-semibold text-green-700 mb-4 border-b pb-2">Task 2</h2>
                        <ul>
                            {level2 &&
                                <li className="mb-6 bg-green-50 rounded-lg p-4 shadow-md">
                                    <h3 className="text-lg font-bold text-green-800 mb-2">Receive Payment</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        {/* Check for the first array */}
                                        {childs?.references?.level2?.[0]?.children?.length > 0 ? (
                                            childs.references.level2[0].children.map((child, index) => (
                                                <div key={index} className="border p-4 bg-white rounded-xl">
                                                    <p className="text-green-500 font-bold text-2xl">₹300 INR</p>
                                                    <p className="text-gray-700 mb-1">Receive Payment from <span className="font-semibold">{child.name || 'Unknown'}</span></p>
                                                    <p className="text-gray-700 mb-1">Contact Number: <span className="font-semibold">{child.mobile || 'N/A'}</span></p>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-gray-700 italic mb-1">Reach Level 2 to Unlock Tasks</p>
                                        )}

                                        {/* Check for the second array */}
                                        {childs?.references?.level2?.[1]?.children?.length > 0 && (
                                            childs.references.level2[1].children.map((child, index) => (
                                                <div key={index} className="border p-4 bg-white rounded-xl">
                                                    <p className="text-green-500 font-bold text-2xl">₹300 INR</p>
                                                    <p className="text-gray-700 mb-1">
                                                        Receive Payment from <span className="font-semibold">{child.name || 'Unknown'}</span>
                                                    </p>
                                                    <p className="text-gray-700 mb-1">
                                                        Contact Number: <span className="font-semibold">{child.mobile || 'N/A'}</span>
                                                    </p>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </li>
                            }
                        </ul>
                        {childs?.references?.level2?.[0]?.children?.length > 0 && (
                            <div>
                                <p className='italic text-gray-700'>You will receive a total of ₹1200 from 4 people above as ₹300 each.</p>
                                <p className='italic text-gray-700'>After receiving a total of ₹1200,then only you need to proceed to Task 3.</p>
                                <h1 className="text-xl font-medium text-green-800 mt-4">Receiving Total Payment of</h1>
                                <div className="flex items-center my-2 gap-2">
                                    <span className="text-green-500 font-bold text-4xl">₹1200 INR</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" className="injected-svg" data-src="https://cdn.hugeicons.com/icons/arrow-down-left-01-solid-standard.svg" xmlnsXlink="http://www.w3.org/1999/xlink" role="img" color="#22c55e">
                                        <path d="M18.7091 6.70515C19.0996 6.31463 19.0996 5.68146 18.709 5.29094C18.3185 4.90042 17.6854 4.90042 17.2948 5.29094L7 15.5858V11C7 10.4477 6.55228 10 6 10C5.44772 10 5 10.4477 5 11L5 17.9996C5 17.9995 5 17.9998 5 17.9996C5 18.2648 5.10536 18.5197 5.2929 18.7072C5.31822 18.7325 5.34477 18.7564 5.37239 18.7786C5.50181 18.8832 5.65124 18.9507 5.80651 18.9812C5.86979 18.9937 5.93457 19.0001 6.00001 19.0001L13 19C13.5523 19 14 18.5523 14 18C14 17.4477 13.5523 17 13 17L8.41415 17.0001L18.7091 6.70515Z" fill="#22c55e"></path>
                                    </svg>
                                </div>
                            </div>
                        )}
                    </div>
                    {childs?.references?.level2?.[0]?.children?.length > 0 &&
                        <div className="flex flex-col items-center gap-6 w-full">
                            <div className="bg-white shadow-lg rounded-lg p-6 w-full lg:w-1/2">
                                <h2 className="text-2xl font-semibold text-green-700 mb-4 border-b pb-2">Task 3</h2>
                                <ul>
                                    <li className=" bg-green-50 rounded-lg p-4 shadow-md">
                                        <h3 className="text-lg font-bold text-green-800">Receiving Your First Payment</h3>
                                        <div className="flex items-center gap-2">
                                            <p className="text-green-500 font-bold text-4xl my-4">₹600 INR</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={36} height={36} color={"#22c55e"} fill={"none"}>
                                                <path d="M3 8.5H15C17.8284 8.5 19.2426 8.5 20.1213 9.37868C21 10.2574 21 11.6716 21 14.5V15.5C21 18.3284 21 19.7426 20.1213 20.6213C19.2426 21.5 17.8284 21.5 15 21.5H9C6.17157 21.5 4.75736 21.5 3.87868 20.6213C3 19.7426 3 18.3284 3 15.5V8.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round" />
                                                <path d="M15 8.49833V4.1103C15 3.22096 14.279 2.5 13.3897 2.5C13.1336 2.5 12.8812 2.56108 12.6534 2.67818L3.7623 7.24927C3.29424 7.48991 3 7.97203 3 8.49833" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <p className="text-gray-700 italic mb-1">Total Received ₹1200 INR. In that ₹600 is your first payment and another ₹600 to update your upline network.</p>
                                        <h4 className="text-md font-bold text-green-700 mt-4 mb-2">Send Payment</h4>
                                        <p className="text-gray-700 mb-1">To Name: <span className="font-semibold">{payee?.profiles[1]?.name || 'Hope Community Trust'}</span></p>
                                        <p className="text-gray-700 mb-1">Contact Number: <span className="font-semibold">{payee?.profiles[1]?.mobile || '9740609159'}</span></p>
                                        <p className="text-gray-700">Google Pay Number: <span className="font-semibold">{payee?.profiles[1]?.mobile || '9740609159'}</span></p>
                                        <div className="flex items-center gap-2 my-2">
                                            <p className="text-green-500 font-bold text-3xl">₹600 INR</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" className="injected-svg" data-src="https://cdn.hugeicons.com/icons/arrow-up-right-03-stroke-sharp.svg" xmlnsXlink="http://www.w3.org/1999/xlink" role="img" color="#22c55e">
                                                <path d="M17.5 6.5L6 18" stroke="#22c55e" strokeWidth="2" strokeLinecap="square"></path>
                                                <path d="M8 6H18V16" stroke="#22c55e" strokeWidth="2" strokeLinecap="square"></path>
                                            </svg>
                                        </div>
                                    </li>

                                </ul>
                            </div>
                            <div className="bg-white shadow-lg rounded-lg p-6 w-full lg:w-1/2">
                                <h2 className="text-2xl font-semibold text-green-700 mb-4 border-b pb-2">Task 4</h2>
                                <ul>
                                    <li className=" bg-green-50 rounded-lg p-4 shadow-md">
                                        <h3 className="text-lg font-bold text-green-800">Receiving Your Second Payment</h3>
                                        <div className="flex items-center gap-2">
                                            <p className="text-green-500 font-bold text-4xl my-4">₹2800 INR</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={36} height={36} color={"#22c55e"} fill={"none"}>
                                                <path d="M3 8.5H15C17.8284 8.5 19.2426 8.5 20.1213 9.37868C21 10.2574 21 11.6716 21 14.5V15.5C21 18.3284 21 19.7426 20.1213 20.6213C19.2426 21.5 17.8284 21.5 15 21.5H9C6.17157 21.5 4.75736 21.5 3.87868 20.6213C3 19.7426 3 18.3284 3 15.5V8.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round" />
                                                <path d="M15 8.49833V4.1103C15 3.22096 14.279 2.5 13.3897 2.5C13.1336 2.5 12.8812 2.56108 12.6534 2.67818L3.7623 7.24927C3.29424 7.48991 3 7.97203 3 8.49833" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <p className="text-gray-700 italic mb-1">Total Received ₹4800 INR. In that ₹2800 is your second payment and ₹2000 to update your upline network.</p>
                                        <h4 className="text-md font-bold text-green-700 mt-4 mb-2">Send Payment</h4>
                                        <p className="text-gray-700 mb-1">To Name: <span className="font-semibold">{payee?.profiles[2]?.name || 'Hope Community Trust'}</span></p>
                                        <p className="text-gray-700 mb-1">Contact Number: <span className="font-semibold">{payee?.profiles[2]?.mobile || '9740609159'}</span></p>
                                        <p className="text-gray-700">Google Pay Number: <span className="font-semibold">{payee?.profiles[2]?.mobile || '9740609159'}</span></p>
                                        <div className="flex items-center gap-2 my-2">
                                            <p className="text-green-500 font-bold text-3xl">₹2000 INR</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" className="injected-svg" data-src="https://cdn.hugeicons.com/icons/arrow-up-right-03-stroke-sharp.svg" xmlnsXlink="http://www.w3.org/1999/xlink" role="img" color="#22c55e">
                                                <path d="M17.5 6.5L6 18" stroke="#22c55e" strokeWidth="2" strokeLinecap="square"></path>
                                                <path d="M8 6H18V16" stroke="#22c55e" strokeWidth="2" strokeLinecap="square"></path>
                                            </svg>
                                        </div>
                                    </li>

                                </ul>
                            </div>
                            <div className="bg-white shadow-lg rounded-lg p-6 w-full lg:w-1/2">
                                <h2 className="text-2xl font-semibold text-green-700 mb-4 border-b pb-2">Task 5</h2>
                                <ul>
                                    <li className=" bg-green-50 rounded-lg p-4 shadow-md">
                                        <h3 className="text-lg font-bold text-green-800">Receiving Your Third Payment</h3>
                                        <div className="flex items-center gap-2">
                                            <p className="text-green-500 font-bold text-4xl my-4">₹28000 INR</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={36} height={36} color={"#22c55e"} fill={"none"}>
                                                <path d="M3 8.5H15C17.8284 8.5 19.2426 8.5 20.1213 9.37868C21 10.2574 21 11.6716 21 14.5V15.5C21 18.3284 21 19.7426 20.1213 20.6213C19.2426 21.5 17.8284 21.5 15 21.5H9C6.17157 21.5 4.75736 21.5 3.87868 20.6213C3 19.7426 3 18.3284 3 15.5V8.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round" />
                                                <path d="M15 8.49833V4.1103C15 3.22096 14.279 2.5 13.3897 2.5C13.1336 2.5 12.8812 2.56108 12.6534 2.67818L3.7623 7.24927C3.29424 7.48991 3 7.97203 3 8.49833" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <p className="text-gray-700 italic mb-1">Total Received ₹32000 INR. In that ₹28000 is your third payment and ₹4000 to update your upline network.</p>
                                        <h4 className="text-md font-bold text-green-700 mt-4 mb-2">Send Payment</h4>
                                        <p className="text-gray-700 mb-1">To Name: <span className="font-semibold">{payee?.profiles[3]?.name || 'Hope Community Trust'}</span></p>
                                        <p className="text-gray-700 mb-1">Contact Number: <span className="font-semibold">{payee?.profiles[3]?.mobile || '9740609159'}</span></p>
                                        <p className="text-gray-700">Google Pay Number: <span className="font-semibold">{payee?.profiles[3]?.mobile || '9740609159'}</span></p>
                                        <div className="flex items-center gap-2 my-2">
                                            <p className="text-green-500 font-bold text-3xl">₹4000 INR</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" className="injected-svg" data-src="https://cdn.hugeicons.com/icons/arrow-up-right-03-stroke-sharp.svg" xmlnsXlink="http://www.w3.org/1999/xlink" role="img" color="#22c55e">
                                                <path d="M17.5 6.5L6 18" stroke="#22c55e" strokeWidth="2" strokeLinecap="square"></path>
                                                <path d="M8 6H18V16" stroke="#22c55e" strokeWidth="2" strokeLinecap="square"></path>
                                            </svg>
                                        </div>
                                    </li>

                                </ul>
                            </div>
                            <div className="bg-white shadow-lg rounded-lg p-6 w-full lg:w-1/2">
                                <h2 className="text-2xl font-semibold text-green-700 mb-4 border-b pb-2">Task 6</h2>
                                <ul>
                                    <li className=" bg-green-50 rounded-lg p-4 shadow-md">
                                        <h3 className="text-lg font-bold text-green-800">Receiving Your Fourth Payment</h3>
                                        <div className="flex items-center gap-2">
                                            <p className="text-green-500 font-bold text-4xl my-4">₹120000 INR</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={36} height={36} color={"#22c55e"} fill={"none"}>
                                                <path d="M3 8.5H15C17.8284 8.5 19.2426 8.5 20.1213 9.37868C21 10.2574 21 11.6716 21 14.5V15.5C21 18.3284 21 19.7426 20.1213 20.6213C19.2426 21.5 17.8284 21.5 15 21.5H9C6.17157 21.5 4.75736 21.5 3.87868 20.6213C3 19.7426 3 18.3284 3 15.5V8.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round" />
                                                <path d="M15 8.49833V4.1103C15 3.22096 14.279 2.5 13.3897 2.5C13.1336 2.5 12.8812 2.56108 12.6534 2.67818L3.7623 7.24927C3.29424 7.48991 3 7.97203 3 8.49833" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <p className="text-gray-700 italic mb-1">Total Received ₹128000 INR. In that ₹120000 is your fourth payment and ₹8000 to update your upline network.</p>
                                        <h4 className="text-md font-bold text-green-700 mt-4 mb-2">Send Payment</h4>
                                        <p className="text-gray-700 mb-1">To Name: <span className="font-semibold">{payee?.profiles[4]?.name || 'Hope Community Trust'}</span></p>
                                        <p className="text-gray-700 mb-1">Contact Number: <span className="font-semibold">{payee?.profiles[4]?.mobile || '9740609159'}</span></p>
                                        <p className="text-gray-700">Google Pay Number: <span className="font-semibold">{payee?.profiles[4]?.mobile || '9740609159'}</span></p>
                                        <div className="flex items-center gap-2 my-2">
                                            <p className="text-green-500 font-bold text-3xl">₹8000 INR</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" className="injected-svg" data-src="https://cdn.hugeicons.com/icons/arrow-up-right-03-stroke-sharp.svg" xmlnsXlink="http://www.w3.org/1999/xlink" role="img" color="#22c55e">
                                                <path d="M17.5 6.5L6 18" stroke="#22c55e" strokeWidth="2" strokeLinecap="square"></path>
                                                <path d="M8 6H18V16" stroke="#22c55e" strokeWidth="2" strokeLinecap="square"></path>
                                            </svg>
                                        </div>
                                    </li>

                                </ul>
                            </div>
                            <div className="bg-white shadow-lg rounded-lg p-6 w-full lg:w-1/2">
                                <h2 className="text-2xl font-semibold text-green-700 mb-4 border-b pb-2">Task 7</h2>
                                <ul>
                                    <li className=" bg-green-50 rounded-lg p-4 shadow-md">
                                        <h3 className="text-lg font-bold text-green-800">Receiving Your Fifth Payment</h3>
                                        <div className="flex items-center gap-2">
                                            <p className="text-green-500 font-bold text-4xl my-4">₹496000 INR</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={36} height={36} color={"#22c55e"} fill={"none"}>
                                                <path d="M3 8.5H15C17.8284 8.5 19.2426 8.5 20.1213 9.37868C21 10.2574 21 11.6716 21 14.5V15.5C21 18.3284 21 19.7426 20.1213 20.6213C19.2426 21.5 17.8284 21.5 15 21.5H9C6.17157 21.5 4.75736 21.5 3.87868 20.6213C3 19.7426 3 18.3284 3 15.5V8.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round" />
                                                <path d="M15 8.49833V4.1103C15 3.22096 14.279 2.5 13.3897 2.5C13.1336 2.5 12.8812 2.56108 12.6534 2.67818L3.7623 7.24927C3.29424 7.48991 3 7.97203 3 8.49833" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <p className="text-gray-700 italic mb-1">Total Received ₹512000 INR. In that ₹496000 is your fifth and final payment and ₹16000 to update your upline network.</p>
                                        <h4 className="text-md font-bold text-green-700 mt-4 mb-2">Send Payment</h4>
                                        <p className="text-gray-700 mb-1">To Name: <span className="font-semibold">{payee?.profiles[5]?.name || 'Hope Community Trust'}</span></p>
                                        <p className="text-gray-700 mb-1">Contact Number: <span className="font-semibold">{payee?.profiles[5]?.mobile || '9740609159'}</span></p>
                                        <p className="text-gray-700">Google Pay Number: <span className="font-semibold">{payee?.profiles[5]?.mobile || '9740609159'}</span></p>
                                        <div className="flex items-center gap-2 my-2">
                                            <p className="text-green-500 font-bold text-3xl">₹16000 INR</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" className="injected-svg" data-src="https://cdn.hugeicons.com/icons/arrow-up-right-03-stroke-sharp.svg" xmlnsXlink="http://www.w3.org/1999/xlink" role="img" color="#22c55e">
                                                <path d="M17.5 6.5L6 18" stroke="#22c55e" strokeWidth="2" strokeLinecap="square"></path>
                                                <path d="M8 6H18V16" stroke="#22c55e" strokeWidth="2" strokeLinecap="square"></path>
                                            </svg>
                                        </div>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}
