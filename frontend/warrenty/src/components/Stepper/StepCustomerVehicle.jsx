import React from "react";
import { Lock } from "lucide-react";
import "./StepCustomerVehicle.css";

const StepCustomerVehicle = ({
  customer,
  vehicle,
  onCustomerChange,
  onVehicleChange,
}) => {
  return (
    <div className="scv-container">
      <div className="scv-card">

        {/* Header */}
        <h3 className="scv-title">Customer & Vehicle Details</h3>
        <p className="scv-subtitle">
          <Lock size={14} /> Some fields are auto-filled from your profile
        </p>

        {/* ================= CUSTOMER ================= */}
        <h4 className="scv-section-title">Customer Details</h4>

        <div className="scv-grid scv-two-col">
          <div className="scv-field">
            <label>Full Name</label>
            <input value={customer.fullName} readOnly className="scv-disabled" />
          </div>

          <div className="scv-field">
            <label>Email</label>
            <input value={customer.email} readOnly className="scv-disabled" />
          </div>

          <div className="scv-field">
            <label>Mobile Number</label>
            <input value={customer.mobile} readOnly className="scv-disabled" />
          </div>

          <div className="scv-field">
            <label>Address (Optional)</label>
            <input
              value={customer.address}
              onChange={(e) =>
                onCustomerChange({ address: e.target.value })
              }
              placeholder="Enter your address"
            />
          </div>
        </div>

        {/* Divider */}
        <div className="scv-divider"></div>

        {/* ================= VEHICLE ================= */}
        <h4 className="scv-section-title">Vehicle Details</h4>

        <div className="scv-grid scv-two-col">
          <div className="scv-field">
            <label>Vehicle Model</label>
            <select
              value={vehicle.model}
              onChange={(e) =>
                onVehicleChange({ model: e.target.value })
              }
            >
              <option value="">Select model</option>
              <option value="sedan-x1">Sedan X1</option>
              <option value="suv-pro">SUV Pro</option>
              <option value="hatchback-lite">Hatchback Lite</option>
              <option value="truck-max">Truck Max</option>
            </select>
          </div>

          <div className="scv-field">
            <label>Vehicle Number</label>
            <input
              value={vehicle.vehicleNumber}
              onChange={(e) =>
                onVehicleChange({ vehicleNumber: e.target.value })
              }
              placeholder="e.g. TN10AB1234"
            />
          </div>

          <div className="scv-field">
            <label>VIN / Chassis Number</label>
            <input
              value={vehicle.vinNumber}
              onChange={(e) =>
                onVehicleChange({ vinNumber: e.target.value })
              }
              placeholder="17-character VIN"
            />
          </div>

          <div className="scv-field">
            <label>Purchase Date</label>
            <input
              type="date"
              value={vehicle.purchaseDate}
              onChange={(e) =>
                onVehicleChange({ purchaseDate: e.target.value })
              }
            />
          </div>

          {/* Full Width */}
          <div className="scv-field scv-full">
            <label>Dealer Name</label>
            <select
              value={vehicle.dealerName}
              onChange={(e) =>
                onVehicleChange({ dealerName: e.target.value })
              }
            >
              <option value="">Select dealer</option>
              <option value="metro-motors">Metro Motors</option>
              <option value="city-auto">City Auto Hub</option>
              <option value="premium-wheels">Premium Wheels</option>
              <option value="highway-cars">Highway Cars</option>
            </select>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StepCustomerVehicle;