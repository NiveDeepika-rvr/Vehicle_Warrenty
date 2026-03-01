import React from "react";
import { User, AlertTriangle, Upload, Eye, Check } from "lucide-react";
import "./StepperHeader.css";

const steps = [
  { label: "Customer & Vehicle", icon: <User size={18} /> },
  { label: "Issue Details", icon: <AlertTriangle size={18} /> },
  { label: "Documents", icon: <Upload size={18} /> },
  { label: "Preview & Submit", icon: <Eye size={18} /> },
];

const StepperHeader = ({ currentStep }) => {
  return (
    <div className="wc-stepper">
      <div className="wc-stepper-wrapper">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;

          return (
            <div className="wc-stepper-item" key={index}>
              {/* LINE */}
              {index !== 0 && (
                <div
                  className={`wc-stepper-line ${
                    isCompleted
                      ? "wc-line-active"
                      : "wc-line-inactive"
                  }`}
                />
              )}

              {/* ICON */}
              <div
                className={`wc-stepper-circle 
                  ${isCompleted ? "wc-circle-complete" : ""}
                  ${isActive ? "wc-circle-active" : ""}
                  ${
                    !isCompleted && !isActive
                      ? "wc-circle-inactive"
                      : ""
                  }
                `}
              >
                {isCompleted ? <Check size={16} /> : step.icon}
              </div>

              {/* LABEL */}
              <div
                className={`wc-stepper-label 
                  ${isActive ? "wc-label-active" : ""}
                  ${isCompleted ? "wc-label-complete" : ""}
                `}
              >
                {step.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepperHeader;