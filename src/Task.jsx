import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import Loading from './smallcomponents/Loading';

export default function Task() {
    const [tasks, setTasks] = useState([]);
    const [cID, setCID] = useState(null);
    const [childs, setChilds] = useState(null);
    const [payee, setPayee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [paid, setPaid] = useState(false);
    const [paid2, setPaid2] = useState(false);
    const [paid3, setPaid3] = useState(false);
    const [paid4, setPaid4] = useState(false);
    const [paid5, setPaid5] = useState(false);
    const [paid6, setPaid6] = useState(false);

    const [paidStatus, setPaidStatus] = useState('Pending');
    const [paidStatus2, setPaidStatus2] = useState('Pending');
    const [paidStatus3, setPaidStatus3] = useState('Pending');
    const [paidStatus4, setPaidStatus4] = useState('Pending');
    const [paidStatus5, setPaidStatus5] = useState('Pending');
    const [paidStatus6, setPaidStatus6] = useState('Pending');
    const [profile, setProfile] = useState([]);

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
                setProfile(response.data.profile || []);
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


    const fetchPaid = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/get-paid?customerID=${cID}&amount=300`);

            if (response.data.message === "No result") {
                setPaid(false);
                return;
            }

            const status = response.data[0].isPaid;

            if (status === "Paid") {
                setPaid(true);
                setPaidStatus("Paid");
            } else if (status === "Pending") {
                setPaid(true);
                setPaidStatus("Pending");
            } else {
                setPaid(false);
            }
        } catch (error) {
            console.error("Error fetching upgrade details:", error);
        }
    };
    const fetchPaid2 = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/get-paid?customerID=${cID}&amount=600`);

            if (response.data.message === "No result") {
                setPaid2(false);
                return;
            }

            const status = response.data[0].isPaid2;

            if (status === "Paid") {
                setPaid2(true);
                setPaidStatus2("Paid");
            } else if (status === "Pending") {
                setPaid2(true);
                setPaidStatus2("Pending");
            } else {
                setPaid2(false);
            }
        } catch (error) {
            console.error("Error fetching upgrade details:", error);
        }
    };
    const fetchPaid3 = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/get-paid?customerID=${cID}&amount=2000`);

            if (response.data.message === "No result") {
                setPaid3(false);
                return;
            }

            const status = response.data[0].isPaid3;

            if (status === "Paid") {
                setPaid3(true);
                setPaidStatus3("Paid");
            } else if (status === "Pending") {
                setPaid3(true);
                setPaidStatus3("Pending");
            } else {
                setPaid3(false);
            }
        } catch (error) {
            console.error("Error fetching upgrade details:", error);
        }
    };
    const fetchPaid4 = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/get-paid?customerID=${cID}&amount=4000`);

            if (response.data.message === "No result") {
                setPaid4(false);
                return;
            }

            const status = response.data[0].isPaid4;

            if (status === "Paid") {
                setPaid4(true);
                setPaidStatus4("Paid");
            } else if (status === "Pending") {
                setPaid4(true);
                setPaidStatus4("Pending");
            } else {
                setPaid4(false);
            }
        } catch (error) {
            console.error("Error fetching upgrade details:", error);
        }
    };
    const fetchPaid5 = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/get-paid?customerID=${cID}&amount=8000`);

            if (response.data.message === "No result") {
                setPaid5(false);
                return;
            }

            const status = response.data[0].isPaid5;

            if (status === "Paid") {
                setPaid5(true);
                setPaidStatus5("Paid");
            } else if (status === "Pending") {
                setPaid5(true);
                setPaidStatus5("Pending");
            } else {
                setPaid5(false);
            }
        } catch (error) {
            console.error("Error fetching upgrade details:", error);
        }
    };
    const fetchPaid6 = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/get-paid?customerID=${cID}&amount=16000`);

            if (response.data.message === "No result") {
                setPaid6(false);
                return;
            }

            const status = response.data[0].isPaid6;

            if (status === "Paid") {
                setPaid6(true);
                setPaidStatus6("Paid");
            } else if (status === "Pending") {
                setPaid6(true);
                setPaidStatus6("Pending");
            } else {
                setPaid6(false);
            }
        } catch (error) {
            console.error("Error fetching upgrade details:", error);
        }
    };



    useEffect(() => {
        fetchPaid();
        fetchPaid2();
        fetchPaid3();
        fetchPaid4();
        fetchPaid5();
        fetchPaid6();
    }, [cID]);

    const handlepaid = async (amount) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/add-paid`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: profile?.name || 'NA',
                    mobile: profile?.mobile || 'NA',
                    customerID: profile?.customerID || 'NA',
                    referenceCustomer: tasks?.name || 'Hope Community Trust',
                    referenceId: tasks?.customerID || 'SS0000000001',
                    referenceCustomerMobile: tasks?.mobile || '9740609159',
                    amount: amount,
                    isPaid: "Pending"
                })
            });

            const data = await response.json();
            if (response.ok) {
                setPaid?.(true);
            } else {
                console.error('Error:', data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handlepaid2 = async (amount) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/add-paid`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: profile?.name || 'NA',
                    mobile: profile?.mobile || 'NA',
                    customerID: profile?.customerID || 'NA',
                    referenceCustomer: tasks?.name || 'Hope Community Trust',
                    referenceId: tasks?.customerID || 'SS0000000001',
                    referenceCustomerMobile: tasks?.mobile || '9740609159',
                    amount: amount,
                    isPaid2: "Pending"
                })
            });

            const data = await response.json();
            if (response.ok) {
                setPaid2?.(true);
            } else {
                console.error('Error:', data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const handlepaid3 = async (amount) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/add-paid`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: profile?.name || 'NA',
                    mobile: profile?.mobile || 'NA',
                    customerID: profile?.customerID || 'NA',
                    referenceCustomer: tasks?.name || 'Hope Community Trust',
                    referenceId: tasks?.customerID || 'SS0000000001',
                    referenceCustomerMobile: tasks?.mobile || '9740609159',
                    amount: amount,
                    isPaid3: "Pending"
                })
            });

            const data = await response.json();
            if (response.ok) {
                setPaid3?.(true);
            } else {
                console.error('Error:', data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const handlepaid4 = async (amount) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/add-paid`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: profile?.name || 'NA',
                    mobile: profile?.mobile || 'NA',
                    customerID: profile?.customerID || 'NA',
                    referenceCustomer: tasks?.name || 'Hope Community Trust',
                    referenceId: tasks?.customerID || 'SS0000000001',
                    referenceCustomerMobile: tasks?.mobile || '9740609159',
                    amount: amount,
                    isPaid4: "Pending"
                })
            });

            const data = await response.json();
            if (response.ok) {
                setPaid4?.(true);
            } else {
                console.error('Error:', data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const handlepaid5 = async (amount) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/add-paid`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: profile?.name || 'NA',
                    mobile: profile?.mobile || 'NA',
                    customerID: profile?.customerID || 'NA',
                    referenceCustomer: tasks?.name || 'Hope Community Trust',
                    referenceId: tasks?.customerID || 'SS0000000001',
                    referenceCustomerMobile: tasks?.mobile || '9740609159',
                    amount: amount,
                    isPaid5: "Pending"
                })
            });

            const data = await response.json();
            if (response.ok) {
                setPaid5?.(true);
            } else {
                console.error('Error:', data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const handlepaid6 = async (amount) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/add-paid`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: profile?.name || 'NA',
                    mobile: profile?.mobile || 'NA',
                    customerID: profile?.customerID || 'NA',
                    referenceCustomer: tasks?.name || 'Hope Community Trust',
                    referenceId: tasks?.customerID || 'SS0000000001',
                    referenceCustomerMobile: tasks?.mobile || '9740609159',
                    amount: amount,
                    isPaid6: "Pending"
                })
            });

            const data = await response.json();
            if (response.ok) {
                setPaid6?.(true);
            } else {
                console.error('Error:', data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };



    const Paymentstatus = ({ x }) => {
        return (
            <div className='flex flex-col gap-2'>
                <p>Thank you for making the payment !</p>
                <p className='text-sm'>Payment Status : {x}</p>
            </div>
        )
    }

    const TaskDone = ({ x }) => {
        return (
            <div className="mb-6 bg-green-100 border-l-4 border-green-500 rounded-lg p-6 shadow-lg">
                <h3 className="text-lg font-bold text-green-800 flex items-center mb-2">
                    ✅ Task {x} Completed
                </h3>
                <p className="text-green-700">Thank you for the payment!</p>
            </div>
        )
    }


    return (
        <div className="flex-1 min-h-screen bg-green-50">
            <Header />
            {loading &&
                <div className="flex-1 flex items-center justify-center min-h-screen bg-green-50">
                    <Loading />
                </div>
            }
            {!loading &&
                <div className="container mx-auto p-6">
                    <h1 className="text-3xl font-bold text-green-700 text-center mb-8">Your Tasks</h1>
                    <div className="flex flex-col gap-6 w-full items-center">
                        <div className="bg-white shadow-lg rounded-lg p-6 w-full lg:w-1/2">
                            <h2 className="text-2xl font-semibold text-green-700 mb-4 border-b pb-2">Task 1</h2>

                            {paidStatus === "Paid" ? (
                                <TaskDone x={1} />
                            ) : (
                                <div className="mb-6 bg-green-50 rounded-lg p-6 shadow-md">
                                    {/* Title */}
                                    <h3 className="text-lg font-bold text-green-800 mb-3">
                                        Send Payment (ಹಣವನ್ನು ಕಳುಹಿಸಿ)
                                    </h3>

                                    {/* Payment Details */}
                                    <p className="text-gray-700">
                                        Make a payment to <span className="font-semibold">{tasks.name || 'Hope Community Trust'}</span>
                                    </p>
                                    <p className="text-gray-700">
                                        Mobile Number: <span className="font-semibold">{tasks.mobile || '9740609159'}</span>
                                    </p>
                                    <p className="text-gray-700">
                                        Google Pay Number: <span className="font-semibold">{tasks.mobile || '9740609159'}</span>
                                    </p>

                                    {/* Amount Section */}
                                    <div className="flex items-center gap-2 my-4">
                                        <p className="text-green-500 font-bold text-3xl">₹300 INR</p>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" role="img">
                                            <path d="M17.5 6.5L6 18" stroke="#22c55e" strokeWidth="2" strokeLinecap="square"></path>
                                            <path d="M8 6H18V16" stroke="#22c55e" strokeWidth="2" strokeLinecap="square"></path>
                                        </svg>
                                    </div>

                                    {/* Payment Confirmation Box */}
                                    <div className="bg-green-100 border border-green-300 rounded-lg shadow-md">
                                        <p className="text-green-800 m-4 font-semibold">
                                            After making the payment, send the screenshot to
                                            <span className="font-bold"> 9740609159 on WhatsApp</span>
                                        </p>
                                        <p className="text-green-800 m-4 font-semibold">
                                            ಪಾವತಿ ಮಾಡಿದ ನಂತರ, ಸ್ಕ್ರೀನ್‌ಶಾಟ್ ಅನ್ನು ಈ ಸಂಖ್ಯೆಗೆ ಕಳುಹಿಸಿ
                                            <span className="font-bold"> 9740609159 WhatsApp ನಲ್ಲಿ</span>
                                        </p>


                                        <div className="mt-4 p-4 bg-green-200 shadow-inner">
                                            <div className="text-green-900 font-medium text-lg">
                                                {paid ? <Paymentstatus x={paidStatus} /> : "Payment Done?"}
                                            </div>

                                            {!paid && (
                                                <button
                                                    onClick={() => handlepaid(300)}
                                                    className="mt-3 px-5 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
                                                >
                                                    Yes
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}


                        </div>
                        <div className="bg-white shadow-lg rounded-lg p-6 w-full lg:w-1/2">
                            <h2 className="text-2xl font-semibold text-green-700 mb-4 border-b pb-2">Task 2</h2>

                            {/* Receive Payment Table */}
                            <ul>
                                    <li className="mb-6 bg-green-50 rounded-lg p-4 shadow-md">
                                        <h3 className="text-lg font-bold text-green-800 mb-2">Receive Payment</h3>
                                        <div className="overflow-x-auto">
                                            <table className="w-full border-collapse border border-gray-300">
                                                <thead className="bg-gray-100">
                                                    <tr>
                                                        <th className="border px-4 py-2">Name</th>
                                                        <th className="border px-4 py-2">Mobile</th>
                                                        <th className="border px-4 py-2">Receive</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {childs?.references?.level2?.flatMap((parent, parentIndex) =>
                                                        parent.children?.map((child, index) => (
                                                            <tr key={`${parentIndex}-${index}`} className="hover:bg-gray-50">
                                                                <td className="border px-4 py-2">{child.name || 'Unknown'}</td>
                                                                <td className="border px-4 py-2">{child.mobile || 'N/A'}</td>
                                                                <td className="border px-4 py-2 text-green-600 font-bold">₹300 INR</td>
                                                            </tr>
                                                        ))
                                                    ) || (
                                                            <tr>
                                                                <td colSpan="5" className="border px-4 py-2 text-center italic">
                                                                    Reach Level 2 to Unlock Tasks
                                                                </td>
                                                            </tr>
                                                        )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </li>
                            </ul>

                            {/* Payment Breakdown Section */}
                            {childs?.references?.level2?.[0]?.children?.length > 0 && (
                                <div className="bg-white mt-4">
                                    <h3 className="text-xl font-bold text-green-700">Payment Breakdown</h3>
                                    <p className="italic text-gray-700 mt-2">
                                        You will receive a total of <span className="font-bold">₹1200 INR</span> from 4 people (₹300 each).
                                    </p>

                                    {/* Upgrade Payment Section */}
                                    {paidStatus2 === "Paid" ? <TaskDone x={2} /> :
                                        <div>
                                            <div className="bg-red-50 rounded-lg p-4 shadow-md mt-4">
                                                <h4 className="text-lg font-bold text-red-800">Upgrade Requirement</h4>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <p className="text-red-500 font-bold text-3xl">₹600 INR</p>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" className="injected-svg" color="#ef4444">
                                                        <path d="M17.5 6.5L6 18" stroke="#ef4444" strokeWidth="2" strokeLinecap="square"></path>
                                                        <path d="M8 6H18V16" stroke="#ef4444" strokeWidth="2" strokeLinecap="square"></path>
                                                    </svg>
                                                </div>
                                                <p className="text-gray-700 mt-2">
                                                    The first <span className="font-bold">₹600 INR</span> must be sent to upgrade to the Upline Network.
                                                </p>
                                                <table className="w-full border-collapse border border-gray-300 mt-2">
                                                    <thead>
                                                        <tr className="bg-red-100">
                                                            <th className="border px-4 py-2 text-left text-red-700">Upgrade Payment To</th>
                                                            <th className="border px-4 py-2"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td className="border px-4 py-2 font-bold">Name</td>
                                                            <td className="border px-4 py-2 font-semibold">{payee?.profiles[1]?.name || 'Hope Community Trust'}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="border px-4 py-2 font-bold">Contact</td>
                                                            <td className="border px-4 py-2 font-semibold">{payee?.profiles[1]?.mobile || '9740609159'}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="border px-4 py-2 font-bold">Amount</td>
                                                            <td className="border px-4 py-2 font-bold text-red-600">₹600 INR</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                            {/* Payment Confirmation Box */}
                                            <div className="bg-green-100 border border-green-300 rounded-lg mt-4 shadow-md">
                                                <p className="text-green-800 m-4 font-semibold">
                                                    After making the payment, send the screenshot to
                                                    <span className="font-bold"> 9740609159 on WhatsApp</span>
                                                </p>
                                                <p className="text-green-800 m-4 font-semibold">
                                                    ಪಾವತಿ ಮಾಡಿದ ನಂತರ, ಸ್ಕ್ರೀನ್‌ಶಾಟ್ ಅನ್ನು ಈ ಸಂಖ್ಯೆಗೆ ಕಳುಹಿಸಿ
                                                    <span className="font-bold"> 9740609159 WhatsApp ನಲ್ಲಿ</span>
                                                </p>


                                                <div className="mt-4 p-4 bg-green-200 shadow-inner">
                                                    <div className="text-green-900 font-medium text-lg">
                                                        {paid2 ? <Paymentstatus x={paidStatus2} /> : "Payment Done?"}
                                                    </div>

                                                    {!paid2 && (
                                                        <button
                                                            onClick={() => handlepaid2(600)}
                                                            className="mt-3 px-5 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
                                                        >
                                                            Yes
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>}

                                    {/* User's Profit Section */}
                                    <div className="bg-green-50 rounded-lg p-4 shadow-md mt-4">
                                        <h4 className="text-lg font-bold text-green-600">Your Income</h4>
                                        <p className="text-gray-700">
                                            After upgrading, you will receive <span className="font-bold">₹600 INR</span> as your personal income.
                                        </p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <p className="text-green-500 font-bold text-3xl">₹600 INR</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={36} height={36} color={"#22c55e"} fill={"none"}>
                                                <path d="M3 8.5H15C17.8284 8.5 19.2426 8.5 20.1213 9.37868C21 10.2574 21 11.6716 21 14.5V15.5C21 18.3284 21 19.7426 20.1213 20.6213C19.2426 21.5 17.8284 21.5 15 21.5H9C6.17157 21.5 4.75736 21.5 3.87868 20.6213C3 19.7426 3 18.3284 3 15.5V8.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round" />
                                                <path d="M15 8.49833V4.1103C15 3.22096 14.279 2.5 13.3897 2.5C13.1336 2.5 12.8812 2.56108 12.6534 2.67818L3.7623 7.24927C3.29424 7.48991 3 7.97203 3 8.49833" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="bg-white shadow-lg rounded-lg p-6 w-full lg:w-1/2">
                            <h2 className="text-2xl font-semibold text-green-700 mb-4 border-b pb-2">Task 3</h2>

                            {/* Receive Payment Table */}
                            <ul>
                                <li className="mb-6 bg-green-50 rounded-lg p-4 shadow-md">
                                    <h3 className="text-lg font-bold text-green-800 mb-2">Receive Payment</h3>
                                    <div className="overflow-x-auto">
                                        <table className="w-full border-collapse border border-gray-300">
                                            <thead className="bg-gray-100">
                                                <tr>
                                                    <th className="border px-4 py-2">Name</th>
                                                    <th className="border px-4 py-2">Mobile</th>
                                                    <th className="border px-4 py-2">Receive</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {childs?.references?.level3?.flatMap((parent, parentIndex) =>
                                                    parent.children?.map((child, index) => (
                                                        <tr key={`${parentIndex}-${index}`} className="hover:bg-gray-50">
                                                            <td className="border px-4 py-2">{child.name || 'Unknown'}</td>
                                                            <td className="border px-4 py-2">{child.mobile || 'N/A'}</td>
                                                            <td className="border px-4 py-2 text-green-600 font-bold">₹600 INR</td>
                                                        </tr>
                                                    ))
                                                ) || (
                                                        <tr>
                                                            <td colSpan="5" className="border px-4 py-2 text-center italic">
                                                                Reach Level 3 to Unlock Tasks
                                                            </td>
                                                        </tr>
                                                    )}
                                            </tbody>
                                        </table>
                                    </div>
                                </li>
                            </ul>

                            {/* Payment Breakdown Section */}
                            {childs?.references?.level3?.[0]?.children?.length > 0 && (
                                <div className="bg-white mt-4">
                                    <h3 className="text-xl font-bold text-green-700">Payment Breakdown</h3>
                                    <p className="italic text-gray-700 mt-2">
                                        You will receive a total of <span className="font-bold">₹4800 INR</span> from 8 people (₹600 each).
                                    </p>

                                    {/* Upgrade Payment Section */}
                                    {paidStatus3 === "Paid" ? <TaskDone x={3} /> :
                                        <div>
                                            <div className="bg-red-50 rounded-lg p-4 shadow-md mt-4">
                                                <h4 className="text-lg font-bold text-red-800">Upgrade Requirement</h4>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <p className="text-red-500 font-bold text-3xl">₹2000 INR</p>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" className="injected-svg" color="#ef4444">
                                                        <path d="M17.5 6.5L6 18" stroke="#ef4444" strokeWidth="2" strokeLinecap="square"></path>
                                                        <path d="M8 6H18V16" stroke="#ef4444" strokeWidth="2" strokeLinecap="square"></path>
                                                    </svg>
                                                </div>
                                                <p className="text-gray-700 mt-2">
                                                    The first <span className="font-bold">₹2000 INR</span> must be sent to upgrade to the Upline Network.
                                                </p>
                                                <table className="w-full border-collapse border border-gray-300 mt-2">
                                                    <thead>
                                                        <tr className="bg-red-100">
                                                            <th className="border px-4 py-2 text-left text-red-700">Upgrade Payment To</th>
                                                            <th className="border px-4 py-2"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td className="border px-4 py-2 font-bold">Name</td>
                                                            <td className="border px-4 py-2 font-semibold">{payee?.profiles[2]?.name || 'Hope Community Trust'}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="border px-4 py-2 font-bold">Contact</td>
                                                            <td className="border px-4 py-2 font-semibold">{payee?.profiles[2]?.mobile || '9740609159'}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="border px-4 py-2 font-bold">Amount</td>
                                                            <td className="border px-4 py-2 font-bold text-red-600">₹2000 INR</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                            {/* Payment Confirmation Box */}
                                            <div className="bg-green-100 border border-green-300 rounded-lg mt-4 shadow-md">
                                                <p className="text-green-800 m-4 font-semibold">
                                                    After making the payment, send the screenshot to
                                                    <span className="font-bold"> 9740609159 on WhatsApp</span>
                                                </p>
                                                <p className="text-green-800 m-4 font-semibold">
                                                    ಪಾವತಿ ಮಾಡಿದ ನಂತರ, ಸ್ಕ್ರೀನ್‌ಶಾಟ್ ಅನ್ನು ಈ ಸಂಖ್ಯೆಗೆ ಕಳುಹಿಸಿ
                                                    <span className="font-bold"> 9740609159 WhatsApp ನಲ್ಲಿ</span>
                                                </p>


                                                <div className="mt-4 p-4 bg-green-200 shadow-inner">
                                                    <div className="text-green-900 font-medium text-lg">
                                                        {paid3 ? <Paymentstatus x={paidStatus3} /> : "Payment Done?"}
                                                    </div>

                                                    {!paid3 && (
                                                        <button
                                                            onClick={() => handlepaid3(2000)}
                                                            className="mt-3 px-5 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
                                                        >
                                                            Yes
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>}

                                    {/* User's Profit Section */}
                                    <div className="bg-green-50 rounded-lg p-4 shadow-md mt-4">
                                        <h4 className="text-lg font-bold text-green-600">Your Income</h4>
                                        <p className="text-gray-700">
                                            After upgrading, you will receive <span className="font-bold">₹2800 INR</span> as your personal income.
                                        </p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <p className="text-green-500 font-bold text-3xl">₹2800 INR</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={36} height={36} color={"#22c55e"} fill={"none"}>
                                                <path d="M3 8.5H15C17.8284 8.5 19.2426 8.5 20.1213 9.37868C21 10.2574 21 11.6716 21 14.5V15.5C21 18.3284 21 19.7426 20.1213 20.6213C19.2426 21.5 17.8284 21.5 15 21.5H9C6.17157 21.5 4.75736 21.5 3.87868 20.6213C3 19.7426 3 18.3284 3 15.5V8.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round" />
                                                <path d="M15 8.49833V4.1103C15 3.22096 14.279 2.5 13.3897 2.5C13.1336 2.5 12.8812 2.56108 12.6534 2.67818L3.7623 7.24927C3.29424 7.48991 3 7.97203 3 8.49833" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="bg-white shadow-lg rounded-lg p-6 w-full lg:w-1/2">
                            <h2 className="text-2xl font-semibold text-green-700 mb-4 border-b pb-2">Task 4</h2>

                            {/* Receive Payment Table */}
                            <ul>
                                <li className="mb-6 bg-green-50 rounded-lg p-4 shadow-md">
                                    <h3 className="text-lg font-bold text-green-800 mb-2">Receive Payment</h3>
                                    <div className="overflow-x-auto">
                                        <table className="w-full border-collapse border border-gray-300">
                                            <thead className="bg-gray-100">
                                                <tr>
                                                    <th className="border px-4 py-2">Name</th>
                                                    <th className="border px-4 py-2">Mobile</th>
                                                    <th className="border px-4 py-2">Receive</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {childs?.references?.level4?.flatMap((parent, parentIndex) =>
                                                    parent.children?.map((child, index) => (
                                                        <tr key={`${parentIndex}-${index}`} className="hover:bg-gray-50">
                                                            <td className="border px-4 py-2">{child.name || 'Unknown'}</td>
                                                            <td className="border px-4 py-2">{child.mobile || 'N/A'}</td>
                                                            <td className="border px-4 py-2 text-green-600 font-bold">₹2000 INR</td>
                                                        </tr>
                                                    ))
                                                ) || (
                                                        <tr>
                                                            <td colSpan="5" className="border px-4 py-2 text-center italic">
                                                                Reach Level 4 to Unlock Tasks
                                                            </td>
                                                        </tr>
                                                    )}
                                            </tbody>
                                        </table>
                                    </div>
                                </li>
                            </ul>

                            {/* Payment Breakdown Section */}
                            {childs?.references?.level4?.[0]?.children?.length > 0 && (
                                <div className="bg-white mt-4">
                                    <h3 className="text-xl font-bold text-green-700">Payment Breakdown</h3>
                                    <p className="italic text-gray-700 mt-2">
                                        You will receive a total of <span className="font-bold">₹32000 INR</span> from 16 people (₹2000 each).
                                    </p>

                                    {/* Upgrade Payment Section */}
                                    {paidStatus4 === "Paid" ? <TaskDone x={4} /> :
                                        <div>
                                            <div className="bg-red-50 rounded-lg p-4 shadow-md mt-4">
                                                <h4 className="text-lg font-bold text-red-800">Upgrade Requirement</h4>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <p className="text-red-500 font-bold text-3xl">₹4000 INR</p>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" className="injected-svg" color="#ef4444">
                                                        <path d="M17.5 6.5L6 18" stroke="#ef4444" strokeWidth="2" strokeLinecap="square"></path>
                                                        <path d="M8 6H18V16" stroke="#ef4444" strokeWidth="2" strokeLinecap="square"></path>
                                                    </svg>
                                                </div>
                                                <p className="text-gray-700 mt-2">
                                                    The first <span className="font-bold">₹4000 INR</span> must be sent to upgrade to the Upline Network.
                                                </p>
                                                <table className="w-full border-collapse border border-gray-300 mt-2">
                                                    <thead>
                                                        <tr className="bg-red-100">
                                                            <th className="border px-4 py-2 text-left text-red-700">Upgrade Payment To</th>
                                                            <th className="border px-4 py-2"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td className="border px-4 py-2 font-bold">Name</td>
                                                            <td className="border px-4 py-2 font-semibold">{payee?.profiles[3]?.name || 'Hope Community Trust'}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="border px-4 py-2 font-bold">Contact</td>
                                                            <td className="border px-4 py-2 font-semibold">{payee?.profiles[3]?.mobile || '9740609159'}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="border px-4 py-2 font-bold">Amount</td>
                                                            <td className="border px-4 py-2 font-bold text-red-600">₹2000 INR</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                            {/* Payment Confirmation Box */}
                                            <div className="bg-green-100 border border-green-300 rounded-lg mt-4 shadow-md">
                                                <p className="text-green-800 m-4 font-semibold">
                                                    After making the payment, send the screenshot to
                                                    <span className="font-bold"> 9740609159 on WhatsApp</span>
                                                </p>
                                                <p className="text-green-800 m-4 font-semibold">
                                                    ಪಾವತಿ ಮಾಡಿದ ನಂತರ, ಸ್ಕ್ರೀನ್‌ಶಾಟ್ ಅನ್ನು ಈ ಸಂಖ್ಯೆಗೆ ಕಳುಹಿಸಿ
                                                    <span className="font-bold"> 9740609159 WhatsApp ನಲ್ಲಿ</span>
                                                </p>


                                                <div className="mt-4 p-4 bg-green-200 shadow-inner">
                                                    <div className="text-green-900 font-medium text-lg">
                                                        {paid4 ? <Paymentstatus x={paidStatus4} /> : "Payment Done?"}
                                                    </div>

                                                    {!paid4 && (
                                                        <button
                                                            onClick={() => handlepaid4(4000)}
                                                            className="mt-3 px-5 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
                                                        >
                                                            Yes
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>}

                                    {/* User's Profit Section */}
                                    <div className="bg-green-50 rounded-lg p-4 shadow-md mt-4">
                                        <h4 className="text-lg font-bold text-green-600">Your Income</h4>
                                        <p className="text-gray-700">
                                            After upgrading, you will receive <span className="font-bold">₹28000 INR</span> as your personal income.
                                        </p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <p className="text-green-500 font-bold text-3xl">₹28000 INR</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={36} height={36} color={"#22c55e"} fill={"none"}>
                                                <path d="M3 8.5H15C17.8284 8.5 19.2426 8.5 20.1213 9.37868C21 10.2574 21 11.6716 21 14.5V15.5C21 18.3284 21 19.7426 20.1213 20.6213C19.2426 21.5 17.8284 21.5 15 21.5H9C6.17157 21.5 4.75736 21.5 3.87868 20.6213C3 19.7426 3 18.3284 3 15.5V8.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round" />
                                                <path d="M15 8.49833V4.1103C15 3.22096 14.279 2.5 13.3897 2.5C13.1336 2.5 12.8812 2.56108 12.6534 2.67818L3.7623 7.24927C3.29424 7.48991 3 7.97203 3 8.49833" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="bg-white shadow-lg rounded-lg p-6 w-full lg:w-1/2">
                            <h2 className="text-2xl font-semibold text-green-700 mb-4 border-b pb-2">Task 5</h2>

                            {/* Receive Payment Table */}
                            <ul>
                                    <li className="mb-6 bg-green-50 rounded-lg p-4 shadow-md">
                                        <h3 className="text-lg font-bold text-green-800 mb-2">Receive Payment</h3>
                                        <div className="overflow-x-auto">
                                            <table className="w-full border-collapse border border-gray-300">
                                                <thead className="bg-gray-100">
                                                    <tr>
                                                        <th className="border px-4 py-2">Name</th>
                                                        <th className="border px-4 py-2">Mobile</th>
                                                        <th className="border px-4 py-2">Receive</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {childs?.references?.level5?.flatMap((parent, parentIndex) =>
                                                        parent.children?.map((child, index) => (
                                                            <tr key={`${parentIndex}-${index}`} className="hover:bg-gray-50">
                                                                <td className="border px-4 py-2">{child.name || 'Unknown'}</td>
                                                                <td className="border px-4 py-2">{child.mobile || 'N/A'}</td>
                                                                <td className="border px-4 py-2 text-green-600 font-bold">₹4000 INR</td>
                                                            </tr>
                                                        ))
                                                    ) || (
                                                            <tr>
                                                                <td colSpan="5" className="border px-4 py-2 text-center italic">
                                                                    Reach Level 5 to Unlock Tasks
                                                                </td>
                                                            </tr>
                                                        )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </li>
                            </ul>

                            {/* Payment Breakdown Section */}
                            {childs?.references?.level5?.[0]?.children?.length > 0 && (
                                <div className="bg-white mt-4">
                                    <h3 className="text-xl font-bold text-green-700">Payment Breakdown</h3>
                                    <p className="italic text-gray-700 mt-2">
                                        You will receive a total of <span className="font-bold">₹32000 INR</span> from 32 people (₹4000 each).
                                    </p>

                                    {/* Upgrade Payment Section */}
                                    {paidStatus5 === 'Paid' ? <TaskDone x={5} /> :
                                        <div>
                                            <div className="bg-red-50 rounded-lg p-4 shadow-md mt-4">
                                                <h4 className="text-lg font-bold text-red-800">Upgrade Requirement</h4>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <p className="text-red-500 font-bold text-3xl">₹8000 INR</p>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" className="injected-svg" color="#ef4444">
                                                        <path d="M17.5 6.5L6 18" stroke="#ef4444" strokeWidth="2" strokeLinecap="square"></path>
                                                        <path d="M8 6H18V16" stroke="#ef4444" strokeWidth="2" strokeLinecap="square"></path>
                                                    </svg>
                                                </div>
                                                <p className="text-gray-700 mt-2">
                                                    The first <span className="font-bold">₹8000 INR</span> must be sent to upgrade to the Upline Network.
                                                </p>
                                                <table className="w-full border-collapse border border-gray-300 mt-2">
                                                    <thead>
                                                        <tr className="bg-red-100">
                                                            <th className="border px-4 py-2 text-left text-red-700">Upgrade Payment To</th>
                                                            <th className="border px-4 py-2"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td className="border px-4 py-2 font-bold">Name</td>
                                                            <td className="border px-4 py-2 font-semibold">{payee?.profiles[3]?.name || 'Hope Community Trust'}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="border px-4 py-2 font-bold">Contact</td>
                                                            <td className="border px-4 py-2 font-semibold">{payee?.profiles[3]?.mobile || '9740609159'}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="border px-4 py-2 font-bold">Amount</td>
                                                            <td className="border px-4 py-2 font-bold text-red-600">₹8000 INR</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                            {/* Payment Confirmation Box */}
                                            <div className="bg-green-100 border border-green-300 rounded-lg mt-4 shadow-md">
                                                <p className="text-green-800 m-4 font-semibold">
                                                    After making the payment, send the screenshot to
                                                    <span className="font-bold"> 9740609159 on WhatsApp</span>
                                                </p>
                                                <p className="text-green-800 m-4 font-semibold">
                                                    ಪಾವತಿ ಮಾಡಿದ ನಂತರ, ಸ್ಕ್ರೀನ್‌ಶಾಟ್ ಅನ್ನು ಈ ಸಂಖ್ಯೆಗೆ ಕಳುಹಿಸಿ
                                                    <span className="font-bold"> 9740609159 WhatsApp ನಲ್ಲಿ</span>
                                                </p>


                                                <div className="mt-4 p-4 bg-green-200 shadow-inner">
                                                    <div className="text-green-900 font-medium text-lg">
                                                        {paid5 ? <Paymentstatus x={paidStatus5} /> : "Payment Done?"}
                                                    </div>

                                                    {!paid5 && (
                                                        <button
                                                            onClick={() => handlepaid5(8000)}
                                                            className="mt-3 px-5 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
                                                        >
                                                            Yes
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>}

                                    {/* User's Profit Section */}
                                    <div className="bg-green-50 rounded-lg p-4 shadow-md mt-4">
                                        <h4 className="text-lg font-bold text-green-600">Your Income</h4>
                                        <p className="text-gray-700">
                                            After upgrading, you will receive <span className="font-bold">₹120000 INR</span> as your personal income.
                                        </p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <p className="text-green-500 font-bold text-3xl">₹120000 INR</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={36} height={36} color={"#22c55e"} fill={"none"}>
                                                <path d="M3 8.5H15C17.8284 8.5 19.2426 8.5 20.1213 9.37868C21 10.2574 21 11.6716 21 14.5V15.5C21 18.3284 21 19.7426 20.1213 20.6213C19.2426 21.5 17.8284 21.5 15 21.5H9C6.17157 21.5 4.75736 21.5 3.87868 20.6213C3 19.7426 3 18.3284 3 15.5V8.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round" />
                                                <path d="M15 8.49833V4.1103C15 3.22096 14.279 2.5 13.3897 2.5C13.1336 2.5 12.8812 2.56108 12.6534 2.67818L3.7623 7.24927C3.29424 7.48991 3 7.97203 3 8.49833" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="bg-white shadow-lg rounded-lg p-6 w-full lg:w-1/2">
                            <h2 className="text-2xl font-semibold text-green-700 mb-4 border-b pb-2">Task 6</h2>

                            {/* Receive Payment Table */}
                            <ul>
                                    <li className="mb-6 bg-green-50 rounded-lg p-4 shadow-md">
                                        <h3 className="text-lg font-bold text-green-800 mb-2">Receive Payment</h3>
                                        <div className="overflow-x-auto">
                                            <table className="w-full border-collapse border border-gray-300">
                                                <thead className="bg-gray-100">
                                                    <tr>
                                                        <th className="border px-4 py-2">Name</th>
                                                        <th className="border px-4 py-2">Mobile</th>
                                                        <th className="border px-4 py-2">Receive</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {childs?.references?.level6?.flatMap((parent, parentIndex) =>
                                                        parent.children?.map((child, index) => (
                                                            <tr key={`${parentIndex}-${index}`} className="hover:bg-gray-50">
                                                                <td className="border px-4 py-2">{child.name || 'Unknown'}</td>
                                                                <td className="border px-4 py-2">{child.mobile || 'N/A'}</td>
                                                                <td className="border px-4 py-2 text-green-600 font-bold">₹8000 INR</td>
                                                            </tr>
                                                        ))
                                                    ) || (
                                                            <tr>
                                                                <td colSpan="5" className="border px-4 py-2 text-center italic">
                                                                    Reach Level 6 to Unlock Tasks
                                                                </td>
                                                            </tr>
                                                        )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </li>
                            </ul>

                            {/* Payment Breakdown Section */}
                            {childs?.references?.level6?.[0]?.children?.length > 0 && (
                                <div className="bg-white mt-4">
                                    <h3 className="text-xl font-bold text-green-700">Payment Breakdown</h3>
                                    <p className="italic text-gray-700 mt-2">
                                        You will receive a total of <span className="font-bold">₹512000 INR</span> from 64 people (₹8000 each).
                                    </p>

                                    {/* Upgrade Payment Section */}
                                    {paidStatus6 === "Paid" ? <TaskDone x={6} /> :
                                        <div>
                                            <div className="bg-red-50 rounded-lg p-4 shadow-md mt-4">
                                                <h4 className="text-lg font-bold text-red-800">Upgrade Requirement</h4>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <p className="text-red-500 font-bold text-3xl">₹16000 INR</p>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" className="injected-svg" color="#ef4444">
                                                        <path d="M17.5 6.5L6 18" stroke="#ef4444" strokeWidth="2" strokeLinecap="square"></path>
                                                        <path d="M8 6H18V16" stroke="#ef4444" strokeWidth="2" strokeLinecap="square"></path>
                                                    </svg>
                                                </div>
                                                <p className="text-gray-700 mt-2">
                                                    The first <span className="font-bold">₹16000 INR</span> must be sent to upgrade to the Upline Network.
                                                </p>
                                                <table className="w-full border-collapse border border-gray-300 mt-2">
                                                    <thead>
                                                        <tr className="bg-red-100">
                                                            <th className="border px-4 py-2 text-left text-red-700">Upgrade Payment To</th>
                                                            <th className="border px-4 py-2"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td className="border px-4 py-2 font-bold">Name</td>
                                                            <td className="border px-4 py-2 font-semibold">{'Hope Community Trust'}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="border px-4 py-2 font-bold">Contact</td>
                                                            <td className="border px-4 py-2 font-semibold">{'9740609159'}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="border px-4 py-2 font-bold">Amount</td>
                                                            <td className="border px-4 py-2 font-bold text-red-600">₹16000 INR</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                            {/* Payment Confirmation Box */}
                                            <div className="bg-green-100 border border-green-300 rounded-lg mt-4 shadow-md">
                                                <p className="text-green-800 m-4 font-semibold">
                                                    After making the payment, send the screenshot to
                                                    <span className="font-bold"> 9740609159 on WhatsApp</span>
                                                </p>
                                                <p className="text-green-800 m-4 font-semibold">
                                                    ಪಾವತಿ ಮಾಡಿದ ನಂತರ, ಸ್ಕ್ರೀನ್‌ಶಾಟ್ ಅನ್ನು ಈ ಸಂಖ್ಯೆಗೆ ಕಳುಹಿಸಿ
                                                    <span className="font-bold"> 9740609159 WhatsApp ನಲ್ಲಿ</span>
                                                </p>


                                                <div className="mt-4 p-4 bg-green-200 shadow-inner">
                                                    <div className="text-green-900 font-medium text-lg">
                                                        {paid6 ? <Paymentstatus x={paidStatus6} /> : "Payment Done?"}
                                                    </div>

                                                    {!paid6 && (
                                                        <button
                                                            onClick={() => handlepaid6(16000)}
                                                            className="mt-3 px-5 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
                                                        >
                                                            Yes
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>}

                                    {/* User's Profit Section */}
                                    <div className="bg-green-50 rounded-lg p-4 shadow-md mt-4">
                                        <h4 className="text-lg font-bold text-green-600">Your Income</h4>
                                        <p className="text-gray-700">
                                            After upgrading, you will receive <span className="font-bold">₹496000 INR</span> as your personal income.
                                        </p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <p className="text-green-500 font-bold text-3xl">₹496000 INR</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={36} height={36} color={"#22c55e"} fill={"none"}>
                                                <path d="M3 8.5H15C17.8284 8.5 19.2426 8.5 20.1213 9.37868C21 10.2574 21 11.6716 21 14.5V15.5C21 18.3284 21 19.7426 20.1213 20.6213C19.2426 21.5 17.8284 21.5 15 21.5H9C6.17157 21.5 4.75736 21.5 3.87868 20.6213C3 19.7426 3 18.3284 3 15.5V8.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round" />
                                                <path d="M15 8.49833V4.1103C15 3.22096 14.279 2.5 13.3897 2.5C13.1336 2.5 12.8812 2.56108 12.6534 2.67818L3.7623 7.24927C3.29424 7.48991 3 7.97203 3 8.49833" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}
