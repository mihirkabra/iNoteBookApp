import React, { useContext } from "react";
import alertContext from "../context/notes/alertContext";

function Alert() {
  const capitalize = (word: string) => {
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };
  const alertCont = useContext(alertContext);
  const { alert, showAlert } = alertCont;
  return (
    <div className="mx-3 fixed-top" style={{ height: "35px", width: "95%", zIndex:5, marginTop: 70}}>
      {alert && (
        <div
          className={`alert alert-${alert.type} alert-dismissible fade show`}
          role="alert"
        >
          <strong>{capitalize(alert.type)}</strong>: {alert.msg}
        </div>
      )}
    </div>
  );
}

export default Alert;
