import React from "react";
import { Table, Tag, Button } from "antd";
import { Plus, FileText } from "lucide-react";
import "./ClaimTable.css";

const ClaimsTable = ({ claims, onNewClaim }) => {
  const columns = [
    {
      title: "Claim ID",
      dataIndex: "claimId",
      key: "claimId",
      render: (text) => <span className="ct-claim-id">{text}</span>,
    },
    {
      title: "Vehicle",
      key: "vehicle",
      render: (_, record) => (
        <div>
          <div className="ct-vehicle-model">{record.vehicle.model}</div>
          <div className="ct-vehicle-number">
            {record.vehicle.vehicleNumber}
          </div>
        </div>
      ),
    },
    {
      title: "Issue",
      dataIndex: ["issue", "title"],
      key: "issue",
      render: (text) => <span className="ct-issue-text">{text}</span>,
    },
    {
      title: "Category",
      key: "category",
      render: (_, record) => (
        <Tag className="ct-category-tag">
          {record.issue.category}
        </Tag>
      ),
    },
    {
      title: "Status",
      key: "status",
      render: (_, record) => (
        <Tag className="ct-status-tag">{record.status}</Tag>
      ),
    },
    {
      title: "Submitted",
      dataIndex: "submittedAt",
      key: "submittedAt",
      render: (text) => (
        <span className="ct-submitted-date">{text}</span>
      ),
    },
    {
      title: "Documents",
      key: "documents",
      align: "right",
      render: (_, record) => {
        const docCount =
          [
            record.documents.vehicleInvoice,
            record.documents.rcBook,
            record.documents.serviceRecords,
            record.documents.problemVideo,
          ].filter(Boolean).length +
          record.documents.problemPhotos.length;

        return (
          <div className="ct-doc-count">
            <FileText size={14} />
            {docCount}
          </div>
        );
      },
    },
  ];

  return (
    <div className="ct-wrapper">
      {/* Header */}
      <div className="ct-header">
        <div>
          <h2 className="ct-title">Warranty Claims</h2>
          <p className="ct-subtitle">
            {claims.length} claim(s) submitted
          </p>
        </div>

        <Button
          type="primary"
          className="ct-new-btn"
          onClick={onNewClaim}
        >
          <Plus size={16} />
          New Claim
        </Button>
      </div>

      {/* Table */}
      <div className="ct-table">
        <Table
          columns={columns}
          dataSource={claims}
          rowKey="claimId"
          pagination={false}
        />
      </div>
    </div>
  );
};

export default ClaimsTable;