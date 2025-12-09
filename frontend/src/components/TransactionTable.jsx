import React from "react";

function TransactionTable({ records }) {
  if (!records || !records.length) return null;

  return (
    <div className="table-wrapper">
      <table className="transaction-table">
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Date</th>
            <th>Customer ID</th>
            <th>Customer Name</th>
            <th>Phone Number</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Customer Region</th>
            <th>Product ID</th>
            <th>Product Category</th>
            <th>Quantity</th>
            <th>Total Amount</th>
            <th>Employee Name</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r, idx) => (
            <tr key={`${r.transactionId || idx}-${idx}`}>
              <td>{r.transactionId || "-"}</td>
              <td>{r.date ? new Date(r.date).toLocaleDateString() : "-"}</td>
              <td>{r.customerId || "-"}</td>
              <td>{r.customerName || "-"}</td>
              <td>{r.phoneNumber || "-"}</td>
              <td>{r.gender || "-"}</td>
              <td>{r.age ?? "-"}</td>
              <td>{r.customerRegion || "-"}</td>
              <td>{r.productId || "-"}</td>
              <td>{r.productCategory || "-"}</td>
              <td>{r.quantity ?? "-"}</td>
              <td>{r.totalAmount ?? "-"}</td>
              <td>{r.employeeName || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionTable;
