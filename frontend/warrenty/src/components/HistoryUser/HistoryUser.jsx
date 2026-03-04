import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import DealerNav from "../DealerNav/DealerNav";
import "./HistoryUser.css";
import { Modal } from "antd";
import { Eye } from "lucide-react";

const HistoryUser = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState(null);
const [isModalOpen, setIsModalOpen] = useState(false);

const openPreview = (claim) => {
  setSelectedClaim(claim);
  setIsModalOpen(true);
};

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:5000/api/warranty/dealer-history",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setClaims(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const stats = useMemo(() => {
    const total = claims.length;
    const approved = claims.filter(
      (c) => c.status === "approved"
    ).length;
    const rejected = claims.filter(
      (c) => c.status === "rejected"
    ).length;

    return { total, approved, rejected };
  }, [claims]);

  return (
    <>
      <DealerNav />

      <div className="history-container">
        {/* ====== CARDS ====== */}
        <div className="history-cards">
          <div className="history-card total">
            <h4>Total Processed</h4>
            <h2>{stats.total}</h2>
          </div>

          <div className="history-card approved">
            <h4>Approved</h4>
            <h2>{stats.approved}</h2>
          </div>

          <div className="history-card rejected">
            <h4>Rejected</h4>
            <h2>{stats.rejected}</h2>
          </div>
        </div>

        {/* ====== TABLE ====== */}
        <div className="history-table-wrapper">
          <table>
           <thead>
  <tr>
    <th>Vehicle</th>
    <th>Customer</th>
    <th>Issue</th>
    <th>Odometer</th>
    <th>Status</th>
    <th>View</th> {/* NEW COLUMN */}
  </tr>
</thead>

           <tbody>
  {claims.map((claim) => (
    <tr key={claim._id}>
      <td>{claim.vehicle?.vehicleNumber}</td>
      <td>{claim.user?.name}</td>
      <td>{claim.issueTitle}</td>
      <td>{claim.odometerReading}</td>
      <td>
        <span className={`status-badge ${claim.status}`}>
          {claim.status}
        </span>
      </td>

      <td>
        <button
          className="view-btn"
          onClick={() => openPreview(claim)}
        >
          <Eye size={16} />
          All
        </button>
      </td>
    </tr>
  ))}
</tbody>
          </table>
        </div>
      </div>
      {/* ====== VIEW MODAL ====== */}
<Modal
  title="Claim Details"
  open={isModalOpen}
  onCancel={() => setIsModalOpen(false)}
  footer={null}
  width={750}
>
  {selectedClaim && (
    <div className="preview-content">

      <h3>Customer Details</h3>
      <p><b>Name:</b> {selectedClaim.user?.name}</p>
      <p><b>Email:</b> {selectedClaim.user?.email}</p>

      <h3>Vehicle Details</h3>
      <p><b>Number:</b> {selectedClaim.vehicle?.vehicleNumber}</p>
      <p><b>Model:</b> {selectedClaim.vehicle?.model}</p>

      <h3>Issue Details</h3>
      <p><b>Category:</b> {selectedClaim.issueCategory}</p>
      <p><b>Title:</b> {selectedClaim.issueTitle}</p>
      <p><b>Description:</b> {selectedClaim.issueDescription}</p>
      <p><b>Odometer:</b> {selectedClaim.odometerReading}</p>

      <p>
        <b>Status:</b>{" "}
        <span className={`status-badge ${selectedClaim.status}`}>
          {selectedClaim.status}
        </span>
      </p>

    </div>
  )}
</Modal>
    </>
  );
};

export default HistoryUser;