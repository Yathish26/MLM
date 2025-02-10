import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Paysheet() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/get-paid`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleApprove = async (customerID) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/get-paid?customerID=${customerID}`, {
        isPaid: "Paid",
      });
      setData((prevData) =>
        prevData.map((item) =>
          item.customerID === customerID ? { ...item, isPaid: "Paid" } : item
        )
      );
    } catch (error) {
      console.error("Error approving payment:", error);
    }
  };

  const handleReject = async (customerID) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/get-paid?customerID=${customerID}`);
      setData((prevData) => prevData.filter((item) => item.customerID !== customerID));
    } catch (error) {
      console.error("Error rejecting payment:", error);
    }
  };

  // Separate pending and approved lists
  const pendingPayments = data.filter((item) => item.isPaid !== "Paid");
  const approvedPayments = data.filter((item) => item.isPaid === "Paid");

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
                      <td className="border border-green-300 px-4 py-2 text-red-500 font-semibold">{item.isPaid}</td>
                      <td className="border border-green-300 px-4 py-2">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                      <td className="border border-green-300 px-4 py-2">
                        <button
                          className="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-700"
                          onClick={() => handleApprove(item.customerID)}
                        >
                          Approve
                        </button>
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                          onClick={() => handleReject(item.customerID)}
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
                      <td className="border border-green-300 px-4 py-2 text-green-700 font-semibold">{item.isPaid}</td>
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
