import React, { useState } from "react";
import AlertContext, {AlertType} from "./alertContext";

type AlertStateProps = {
  children: React.ReactNode
}

const AlertState = (props: AlertStateProps) => {
  const [alert, setAlert] = useState<AlertType | null>(null);
  const showAlert = async (msg: string, type: string) => {
    await setAlert({
      msg: msg,
      type: type
    });
    await setTimeout(() => {
      setAlert(null);
    }, 2500);
  };
  return (
    <AlertContext.Provider value={{ alert, showAlert }}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
