import React, { useRef } from "react";
import {
  FileText,
  Image,
  Video,
  X,
  AlertCircle,
} from "lucide-react";
import "./StepDocumentUpload.css";

const formatSize = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576)
    return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(1)} MB`;
};


/* File Chip */
const FileChip = ({ file, onRemove }) => (
  <div className="sdu-file-chip">
    <FileText size={16} />
    <span className="sdu-file-name">{file.name}</span>
    <span className="sdu-file-size">
      ({formatSize(file.size)})
    </span>
    <button onClick={onRemove}>
      <X size={14} />
    </button>
  </div>
);

/* Upload Zone */
const UploadZone = ({
  label,
  required,
  accept,
  multiple,
  icon,
  hint,
  onFiles,
}) => {
  const inputRef = useRef();

  return (
    <div className="sdu-upload-field">
      <label>
        {label}
        {required && (
          <span className="sdu-required">*</span>
        )}
      </label>

      <div
        className="sdu-upload-box"
        onClick={() => inputRef.current.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          hidden
          onChange={(e) =>
            e.target.files && onFiles(e.target.files)
          }
        />

        <div className="sdu-upload-content">
          {icon}
          <span>Click to upload</span>
          <small>{hint}</small>
        </div>
      </div>
    </div>
  );
};

const StepDocumentUpload = ({
  documents,
  onDocumentsChange,
}) => {
  const handleSingleFile =
    (key) => (files) => {
      const f = files[0];
      if (f && f.size <= 10 * 1024 * 1024) {
        onDocumentsChange({
          [key]: {
            name: f.name,
            size: f.size,
            type: f.type,
            file: f,
          },
        });
      }
    };

  const handleMultipleFiles = (files) => {
    const newFiles = Array.from(files)
      .filter((f) => f.size <= 10 * 1024 * 1024)
      .map((f) => ({
        name: f.name,
        size: f.size,
        type: f.type,
        file: f,
      }));

    onDocumentsChange({
      problemPhotos: [
        ...documents.problemPhotos,
        ...newFiles,
      ],
    });
  };

  const handleFinalSubmit = async () => {
  const formData = new FormData();

  // ========================
  // TEXT DATA
  // ========================

  formData.append("vehicleId", selectedVehicleId);
  formData.append("customerAddress", customer.address);

  formData.append("category", issue.category);
  formData.append("title", issue.title);
  formData.append("description", issue.description);
  formData.append("issueStartDate", issue.issueStartDate);
  formData.append("odometerReading", issue.odometerReading);

  formData.append(
    "underWarranty",
    issue.underWarranty === "yes"
  );

  formData.append(
    "previousService",
    issue.previousService === "yes"
  );

  formData.append(
    "previousServiceCount",
    issue.previousService === "yes"
      ? issue.previousServiceCount
      : 0
  );

  // ========================
  // FILES
  // ========================

  if (documents.vehicleInvoice?.file)
    formData.append(
      "vehicleInvoice",
      documents.vehicleInvoice.file
    );

  if (documents.rcBook?.file)
    formData.append(
      "rcBook",
      documents.rcBook.file
    );

  if (documents.serviceRecords?.file)
    formData.append(
      "serviceRecords",
      documents.serviceRecords.file
    );

  if (documents.problemVideo?.file)
    formData.append(
      "problemVideo",
      documents.problemVideo.file
    );

  documents.problemPhotos.forEach((photo) => {
    formData.append("problemPhotos", photo.file);
  });

  await axios.post(
    "/api/warranty/create-warranty",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
};
  return (
    <div className="sdu-container">

      {/* Mandatory */}
      <div className="sdu-card">
        <h3>Mandatory Documents</h3>

        <p className="sdu-subtitle sdu-warning">
          <AlertCircle size={14} />
          These documents are required to process your claim
        </p>

        <div className="sdu-grid sdu-two-col">
          <UploadZone
            label="Vehicle Invoice"
            required
            accept=".pdf,.jpg,.png"
            icon={<FileText size={28} />}
            hint="PDF, JPG, PNG — Max 10MB"
            onFiles={handleSingleFile("vehicleInvoice")}
          />

          <UploadZone
            label="RC Book / Registration Copy"
            required
            accept=".pdf,.jpg,.png"
            icon={<FileText size={28} />}
            hint="PDF, JPG, PNG — Max 10MB"
            onFiles={handleSingleFile("rcBook")}
          />
        </div>

        <div className="sdu-chips">
          {documents.vehicleInvoice && (
            <FileChip
              file={documents.vehicleInvoice}
              onRemove={() =>
                onDocumentsChange({
                  vehicleInvoice: null,
                })
              }
            />
          )}
          {documents.rcBook && (
            <FileChip
              file={documents.rcBook}
              onRemove={() =>
                onDocumentsChange({ rcBook: null })
              }
            />
          )}
        </div>
      </div>

      {/* Optional */}
      <div className="sdu-card">
        <h3>Optional Documents</h3>
        <p className="sdu-subtitle">
          Recommended for faster processing
        </p>

        <div className="sdu-grid sdu-two-col">
          <UploadZone
            label="Service Records"
            accept=".pdf,.jpg,.png"
            icon={<FileText size={28} />}
            hint="PDF, JPG, PNG — Max 10MB"
            onFiles={handleSingleFile("serviceRecords")}
          />

          <UploadZone
            label="Problem Photos"
            accept=".jpg,.png"
            multiple
            icon={<Image size={28} />}
            hint="Multiple images — Max 10MB"
            onFiles={handleMultipleFiles}
          />

          <UploadZone
            label="Problem Video"
            accept="video/*"
            icon={<Video size={28} />}
            hint="Max 10MB"
            onFiles={handleSingleFile("problemVideo")}
          />
        </div>

        <div className="sdu-chips">
          {documents.serviceRecords && (
            <FileChip
              file={documents.serviceRecords}
              onRemove={() =>
                onDocumentsChange({
                  serviceRecords: null,
                })
              }
            />
          )}

          {documents.problemPhotos.map((f, i) => (
            <FileChip
              key={i}
              file={f}
              onRemove={() =>
                onDocumentsChange({
                  problemPhotos:
                    documents.problemPhotos.filter(
                      (_, idx) => idx !== i
                    ),
                })
              }
            />
          ))}

          {documents.problemVideo && (
            <FileChip
              file={documents.problemVideo}
              onRemove={() =>
                onDocumentsChange({
                  problemVideo: null,
                })
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default StepDocumentUpload;