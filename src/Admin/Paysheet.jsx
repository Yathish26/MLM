import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Paysheet() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/get-paid`);
        const responseData = Array.isArray(response.data) ? response.data : []; // Ensure response is an array
        setData(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleApprove = async (customerID, amount) => {
    try {
      const amountFieldMap = {
        300: "isPaid",
        600: "isPaid2",
        2000: "isPaid3",
        4000: "isPaid4",
        8000: "isPaid5",
        16000: "isPaid6",
      };

      const fieldToUpdate = amountFieldMap[amount];

      if (!fieldToUpdate) {
        console.error("Invalid amount. No corresponding field found.");
        return;
      }

      const updatePayload = { [fieldToUpdate]: "Paid" };

      await axios.put(`${import.meta.env.VITE_API_URL}/get-paid?customerID=${customerID}&amount=${amount}`, updatePayload);

      setData((prevData) =>
        prevData.map((item) =>
          item.customerID === customerID && item.amount === amount
            ? { ...item, [fieldToUpdate]: "Paid" }
            : item
        )
      );
    } catch (error) {
      console.error("Error approving payment:", error);
    }
  };

  const handleReject = async (customerID, amount) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/get-paid`, {
        params: { customerID, amount },
      });

      setData((prevData) =>
        prevData.filter((item) => !(item.customerID === customerID && item.amount === amount))
      );
    } catch (error) {
      console.error("Error rejecting payment:", error);
    }
  };

  const isPaidFields = ["isPaid", "isPaid2", "isPaid3", "isPaid4", "isPaid5", "isPaid6"];

  // Ensure `data` is an array before calling `filter`
  const approvedPayments = Array.isArray(data)
    ? data.filter((item) => isPaidFields.some((field) => item?.[field] === "Paid"))
    : [];

  const pendingPayments = Array.isArray(data)
    ? data.filter((item) => !isPaidFields.some((field) => item?.[field] === "Paid"))
    : [];


  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-green-700 mb-4">Payment Sheet</h2>

      {loading ? (
        <p className="text-green-700">Loading...</p>
      ) : (
        <>
          {/* Pending Payments */}
          <h3 className="text-xl font-semibold text-red-600 mb-2">Approval List (Pending)</h3>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border border-green-300 text-sm">
              <thead className="bg-red-600 text-white">
                <tr>
                  <th className="border border-green-300 px-4 py-2">Name</th>
                  <th className="border border-green-300 px-4 py-2">Mobile</th>
                  <th className="border border-green-300 px-4 py-2">Customer ID</th>
                  <th className="border border-green-300 px-4 py-2">Receiver</th>
                  <th className="border border-green-300 px-4 py-2">Receiver Mobile</th>
                  <th className="border border-green-300 px-4 py-2">Status</th>
                  <th className="border border-green-300 px-4 py-2">Amount</th>
                  <th className="border border-green-300 px-4 py-2">Date</th>
                  <th className="border border-green-300 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingPayments.length > 0 ? (
                  pendingPayments.map((item) => (
                    <tr key={item.customerID} className="text-center odd:bg-white even:bg-red-100">
                      <td className="border border-green-300 px-4 py-2">{item.name}</td>
                      <td className="border border-green-300 px-4 py-2">{item.mobile}</td>
                      <td className="border border-green-300 px-4 py-2">{item.customerID}</td>
                      <td className="border border-green-300 px-4 py-2">{item.referenceCustomer}</td>
                      <td className="border border-green-300 px-4 py-2">{item.referenceCustomerMobile}</td>
                      <td className="border border-green-300 px-4 py-2 text-red-500 font-semibold">{item.isPaid || item.isPaid2 || item.isPaid3 || item.isPaid4 || item.isPaid5 || item.isPaid6}</td>
                      <td className="border border-green-300 px-4 py-2 font-semibold">{item.amount}</td>
                      <td className="border border-green-300 px-4 py-2">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                      <td className="border border-green-300 px-4 py-2">
                        <button
                          className="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-700"
                          onClick={() => handleApprove(item.customerID, item.amount)}
                        >
                          Approve
                        </button>
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                          onClick={() => handleReject(item.customerID, item.amount)}
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center text-red-500 py-4">
                      No pending approvals
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Approved Payments */}
          <h3 className="text-xl font-semibold text-green-600 mb-2">Approved List</h3>
          <div className="overflow-x-auto">
            <table className="w-full border border-green-300 text-sm">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="border border-green-300 px-4 py-2">Name</th>
                  <th className="border border-green-300 px-4 py-2">Mobile</th>
                  <th className="border border-green-300 px-4 py-2">Customer ID</th>
                  <th className="border border-green-300 px-4 py-2">Receiver</th>
                  <th className="border border-green-300 px-4 py-2">Receiver Mobile</th>
                  <th className="border border-green-300 px-4 py-2">Status</th>
                  <th className="border border-green-300 px-4 py-2">Amount</th>
                  <th className="border border-green-300 px-4 py-2">Date</th>
                  <th className="border border-green-300 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {approvedPayments.length > 0 ? (
                  approvedPayments.map((item) => (
                    <tr key={item.customerID} className="text-center odd:bg-white even:bg-green-100">
                      <td className="border border-green-300 px-4 py-2">{item.name}</td>
                      <td className="border border-green-300 px-4 py-2">{item.mobile}</td>
                      <td className="border border-green-300 px-4 py-2">{item.customerID}</td>
                      <td className="border border-green-300 px-4 py-2">{item.referenceCustomer}</td>
                      <td className="border border-green-300 px-4 py-2">{item.referenceCustomerMobile}</td>
                      <td className="border border-green-300 px-4 py-2 text-green-700 font-semibold">{item.isPaid || item.isPaid2 || item.isPaid3 || item.isPaid4 || item.isPaid5 || item.isPaid6}</td>
                      <td className="border border-green-300 px-4 py-2 text-green-700 font-semibold">{item.amount}</td>
                      <td className="border border-green-300 px-4 py-2">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                      <td className="border border-green-300 px-4 py-2 text-green-600 font-semibold">
                        Approved
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center text-green-500 py-4">
                      No approved payments
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
