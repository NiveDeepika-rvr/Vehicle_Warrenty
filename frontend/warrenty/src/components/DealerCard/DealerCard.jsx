import React from "react";
import { Card } from "antd";
import {
  FileText,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import "./DealerCard.css";

const DealerCard = ({
  total = 0,
  accepted = 0,
  rejected = 0,
  pending = 0,
}) => {
  const cardData = [
    {
      title: "Total Applications",
      value: total,
      icon: <FileText size={28} />,
      className: "dealer-card-theme-1",
    },
    {
      title: "Approved",
      value: accepted,
      icon: <CheckCircle size={28} />,
      className: "dealer-card-theme-2",
    },
    {
      title: "Rejected",
      value: rejected,
      icon: <XCircle size={28} />,
      className: "dealer-card-theme-3",
    },
    {
      title: "Pending",
      value: pending,
      icon: <Clock size={28} />,
      className: "dealer-card-theme-4",
    },
  ];

  return (
    <div className="dealer-cards-wrapper">
      {cardData.map((card, index) => (
        <Card
          key={index}
          className={`dealer-stat-card ${card.className}`}
          bordered={false}
        >
          <div className="dealer-card-content">
            <div className="dealer-card-icon">
              {card.icon}
            </div>
            <div className="dealer-card-info">
              <h2 className="dealer-card-value">{card.value}</h2>
              <p className="dealer-card-title">{card.title}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default DealerCard;