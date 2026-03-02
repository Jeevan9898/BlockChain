import React from "react";
import { useLocation } from "react-router-dom";

const Receipts = () => {
  const location = useLocation();
  const { donation, date, fundName } = location.state || {};

  if (!donation) {
    return <h2>No receipt data found.</h2>;
  }

  return (
    <div style={{ padding: "40px" }}>
      <h2>Thank you for your donation to {fundName}</h2>

      <p>
        <strong>Date:</strong> {date}
      </p>

      <p>
        <strong>Donation:</strong> {donation} ETH
      </p>
    </div>
  );
};

export default Receipts;
