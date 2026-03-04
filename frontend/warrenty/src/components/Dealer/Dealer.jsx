import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { CheckCircle, XCircle, Eye, RefreshCw } from "lucide-react";
import { Modal } from "antd";
import "./Dealer.css";
import DealerNav from "../DealerNav/DealerNav";
import DealerCard from "../DealerCard/DealerCard";

const DealerDashboard = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchClaims();
  }, []);

  const fetchClaims = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:5000/api/warranty/get-warranties",
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

  const updateStatus = async (id, status) => {
    try {
      setLoading(true);

      await axios.put(
        `http://localhost:5000/api/warranty/update-status/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      await fetchClaims();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const openPreview = (claim) => {
    setSelectedClaim(claim);
    setIsModalOpen(true);
  };

  const stats = useMemo(() => {
    const total = claims.length;
    const approved = claims.filter(
      (c) => c.status === "approved"
    ).length;
    const rejected = claims.filter(
      (c) => c.status === "rejected"
    ).length;
    const pending = claims.filter(
      (c) => c.status === "pending"
    ).length;

    return { total, approved, rejected, pending };
  }, [claims]);

  return (
    <>
      <DealerNav />

      <div className="dealer-container">
        <DealerCard
          total={stats.total}
          accepted={stats.approved}
          rejected={stats.rejected}
          pending={stats.pending}
        />
        <div className="table-header">
            <button
              className="refresh-btn"
              onClick={fetchClaims}
              disabled={loading}
            >
              <RefreshCw size={18} className={loading ? "spin" : ""} />
              Refresh
            </button>
          </div>

        <div className="table-wrapper">
          
          <table>
            <thead>
              <tr>
                <th>Vehicle</th>
                <th>Customer</th>
                <th>Issue</th>
                <th>Odometer</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="no-data">
                    Loading...
                  </td>
                </tr>
              ) : claims.length === 0 ? (
                <tr>
                  <td colSpan="6" className="no-data">
                    No Claims Found
                  </td>
                </tr>
              ) : (
                claims.map((claim) => (
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

                    <td className="actions">
                      <button
                        className="preview-btn"
                        onClick={() => openPreview(claim)}
                      >
                        <Eye size={18} /> Preview
                      </button>

                      {claim.status === "pending" && (
                        <>
                          <button
                            className="approve"
                            onClick={() =>
                              updateStatus(claim._id, "approved")
                            }
                          >
                            <CheckCircle size={18} /> Approve
                          </button>

                          <button
                            className="reject"
                            onClick={() =>
                              updateStatus(claim._id, "rejected")
                            }
                          >
                            <XCircle size={18} /> Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ✅ PREVIEW MODAL */}
      <Modal
        title="Claim Details"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={800}
      >
        {selectedClaim && (
          <div className="preview-content">

            {/* ================= Customer ================= */}
            <h3>Customer Details</h3>
            <p><b>Name:</b> {selectedClaim.user?.name}</p>
            <p><b>Email:</b> {selectedClaim.user?.email}</p>

            {/* ================= Vehicle ================= */}
            <h3>Vehicle Details</h3>
            <p><b>Number:</b> {selectedClaim.vehicle?.vehicleNumber}</p>
            <p><b>Model:</b> {selectedClaim.vehicle?.model}</p>

            <p>
              <b>Warranty:</b>{" "}
              <span className={`bool-badge ${selectedClaim.underWarranty ? "yes" : "no"}`}>
                {selectedClaim.underWarranty ? "YES" : "NO"}
              </span>
            </p>

            <p>
              <b>Previous Service:</b>{" "}
              <span
                className={`bool-badge ${selectedClaim.previousService ? "yes" : "no"
                  }`}
              >
                {selectedClaim.previousService ? "YES" : "NO"}
              </span>
            </p>

            {/* ✅ Show Count Only If Previous Service = YES */}
            {selectedClaim.previousService && (
              <p>
                <b>Service Count:</b>{" "}
                <span className="service-count">
                  {selectedClaim.previousServiceCount || 0} times
                </span>
              </p>
            )}

            {/* ================= Issue ================= */}
            <h3>Issue Details</h3>
            <p><b>Category:</b> {selectedClaim.issueCategory}</p>
            <p><b>Title:</b> {selectedClaim.issueTitle}</p>
            <p><b>Description:</b> {selectedClaim.issueDescription}</p>
            <p><b>Odometer:</b> {selectedClaim.odometerReading}</p>

            {/* ================= Files ================= */}
            <h3>Uploaded Files</h3>

            {selectedClaim.vehicleInvoice && (
              <p>
                <a
                  href={`http://localhost:5000/${selectedClaim.vehicleInvoice}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  View Invoice
                </a>
              </p>
            )}

            {selectedClaim.rcBook && (
              <p>
                <a
                  href={`http://localhost:5000/${selectedClaim.rcBook}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  View RC Book
                </a>
              </p>
            )}

            {selectedClaim.serviceRecords && (
              <p>
                <a
                  href={`http://localhost:5000/${selectedClaim.serviceRecords}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  View Service Records
                </a>
              </p>
            )}

            {/* Images */}
            <div className="preview-images">
              {selectedClaim.problemPhotos?.map((photo, index) => (
                <img
                  key={index}
                  src={`http://localhost:5000/${photo}`}
                  alt="Problem"
                  className="preview-image"
                />
              ))}
            </div>

            {/* Video */}
            {selectedClaim.problemVideo && (
              <video
                controls
                width="100%"
                style={{ marginTop: "15px", borderRadius: "8px" }}
                src={`http://localhost:5000/${selectedClaim.problemVideo}`}
              />
            )}

          </div>
        )}
      </Modal>
    </>
  );
};

export default DealerDashboard;