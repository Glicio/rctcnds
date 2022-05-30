import React, { useEffect, useState } from "react";
import "./Alert.css";
const AlertItem = ({ type, message, setAlerts, index, alertTime }) => {
  const [alertStatus, setAlertStatus] = useState("");
  useEffect(() => {}, []);

  const getStyle = (type) => {
    switch (type) {
      case "error":
        console.log("ERROR");
        return { backgroundColor: "#c94040" };
      case "info":
        return { backgroundColor: "#4287f5" };
      case "succes":
        return { backgroundColor: "#42f55a" };
      default:
        return { backgroundColor: "#8a8787" };
    }
  };
  return (
    <div
      className="alert-item"
      style={{ ...getStyle(type), top: `calc(${index}*2.1rem)` }}
    >
      {message}
    </div>
  );
};
export default function Alert({ alerts, setAlerts }) {
  return alerts ? (
    <div className="alert">
      {alerts.map((curr, index) => {
        return (
          <AlertItem
            key={index}
            index={index}
            message={curr.message}
            type={curr.type}
            alertTime={3000}
          />
        );
      })}
    </div>
  ) : (
    <></>
  );
}
