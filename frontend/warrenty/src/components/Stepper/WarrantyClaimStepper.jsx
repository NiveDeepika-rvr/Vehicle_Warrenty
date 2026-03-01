import React, { useState } from "react";
import { Button, message } from "antd";
import { ArrowLeft, ArrowRight, Send, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./WarrantyClaimStepper.css";

import StepperHeader from "./StpperHeader";
import StepCustomerVehicle from "./StepCustomerVehicle";
import StepIssueDetails from "./StepIssueDetails";
import StepDocumentUpload from "./StepDocumentUpload";
import StepPreviewSubmit from "./StepPreviewSubmit";
import ClaimsTable from "./ClaimTable";
import Navbar from "../Home/Navbar";

const WarrantyClaimStepper = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const [customer, setCustomer] = useState({
    fullName: "Rahul Sharma",
    email: "rahul.sharma@email.com",
    mobile: "+91 98765 43210",
    address: "",
  });

  const [vehicle, setVehicle] = useState({
    model: "",
    vehicleNumber: "",
    vinNumber: "",
    purchaseDate: "",
    dealerName: "",
  });

  const [issue, setIssue] = useState({
    category: "",
    title: "",
    description: "",
    issueStartDate: "",
    odometerReading: "",
    underWarranty: "",
    previousService: "",
    previousServiceCount: "",
  });

  const [documents, setDocuments] = useState({
    vehicleInvoice: null,
    rcBook: null,
    serviceRecords: null,
    problemPhotos: [],
    problemVideo: null,
  });

  const [claims, setClaims] = useState([]);
  const [showTable, setShowTable] = useState(false);

  const totalSteps = 4;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
  const claimId = `WC-${Date.now().toString(36).toUpperCase()}`;

  const newClaim = {
    customer,
    vehicle,
    issue,
    documents,
    submittedAt: new Date().toLocaleDateString(),
    claimId,
    status: "Pending Review",
  };

  setClaims([...claims, newClaim]);

  message.success(`Claim Submitted Successfully! ID: ${claimId}`);

  // Navigate after 2 seconds
  setTimeout(() => {
    navigate("/home");
  }, 2000);
};

  if (showTable) {
    return (
      <div className="wcs-container">
        <ClaimsTable
          claims={claims}
          onNewClaim={() => setShowTable(false)}
        />
      </div>
    );
  }

  const claimData = { customer, vehicle, issue, documents };

  return (
    <>
     <Navbar/>
    <div className="wcs-container">
      {/* HEADER */}
     
      <div className="wcs-header">
        <div className="wcs-badge">
          <Shield size={14} />
          Warranty Claim Portal
        </div>

        <h1>File a Warranty Claim</h1>

        <p>
          Complete the steps below to submit your vehicle warranty claim.
        </p>
      </div>

      {/* STEPPER */}
      <div className="wcs-stepper-wrapper">
        <StepperHeader currentStep={currentStep} />
      </div>

      {/* STEP CONTENT */}
      <div className="wcs-step-content">
        {currentStep === 0 && (
          <StepCustomerVehicle
            customer={customer}
            vehicle={vehicle}
            onCustomerChange={(d) => setCustomer({ ...customer, ...d })}
            onVehicleChange={(d) => setVehicle({ ...vehicle, ...d })}
          />
        )}

        {currentStep === 1 && (
          <StepIssueDetails
            issue={issue}
            onIssueChange={(d) => setIssue({ ...issue, ...d })}
          />
        )}

        {currentStep === 2 && (
          <StepDocumentUpload
            documents={documents}
            onDocumentsChange={(d) =>
              setDocuments({ ...documents, ...d })
            }
          />
        )}

        {currentStep === 3 && (
          <StepPreviewSubmit
            data={claimData}
            onEditStep={(s) => setCurrentStep(s)}
          />
        )}
      </div>

      {/* NAVIGATION */}
      <div className="wcs-nav-buttons">
        <Button
          onClick={handleBack}
          disabled={currentStep === 0}
          icon={<ArrowLeft size={14} />}
        >
          Back
        </Button>

        {currentStep < totalSteps - 1 ? (
          <Button
            type="primary"
            onClick={handleNext}
            icon={<ArrowRight size={14} />}
          >
            Next
          </Button>
        ) : (
          <Button
            type="primary"
            onClick={handleSubmit}
            icon={<Send size={14} />}
            className="wcs-submit-btn"
          >
            Submit Claim
          </Button>
        )}
      </div>

      {/* VIEW CLAIMS */}
      {claims.length > 0 && (
        <div className="wcs-view-claims">
          <Button type="link" onClick={() => setShowTable(true)}>
            View {claims.length} submitted claim(s)
          </Button>
        </div>
      )}
    </div>
    </>
  );
};

export default WarrantyClaimStepper;