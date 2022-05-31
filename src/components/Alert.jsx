import React, { useEffect, useState } from "react";
import "./Alert.css";
const AlertItem = ({ type, message, setAlerts, index, alertTime }) => {
  const [alertDisabling, setAlertDisabling] = useState(false);

  alertTime = alertTime ? alertTime : 3000;

  const removeSelf = () => {
    
    setAlertDisabling(true)

    setTimeout(() => {
      setAlerts(old => {
        return old.filter((curr,i) => { return i !== index})
      })
    },200)
  }
  useEffect(() => {
    setTimeout(() => {
      //removeSelf();
      console.log(index);
    },alertTime)
  }, []);

  const getStyle = (type) => {
    switch (type) {
      case "error":
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
      className={`alert-item ${ alertDisabling && "poping-out"}`}
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
            setAlerts={setAlerts}
          />
        );
      })}
    </div>
  ) : (
    <></>
  );
}
