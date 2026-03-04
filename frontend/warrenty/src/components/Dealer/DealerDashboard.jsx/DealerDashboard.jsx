import React from "react";
import { useNavigate } from "react-router-dom";
import "./DealerDashboard.css";

const DealerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dealer-dash-container">
      <div className="dealer-dash-overlay">
        <div className="dealer-dash-content">
          <h1 className="dealer-dash-title">
            Dealer Management Panel
          </h1>

          <div className="dealer-dash-buttons">
            <button
              className="dealer-dash-btn primary-btn"
              onClick={() => navigate("/dealer")}
            >
              View Applications
            </button>

            <button
              className="dealer-dash-btn secondary-btn"
              onClick={() => navigate("/dealer/history")}
            >
              View History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealerDashboard;