import { createContext } from "react";

export type AlertType = {
    msg: string
    type: string
  }
  
  export type AlertContextType = {
    alert: AlertType | null
    showAlert: (msg: string, type: string) => Promise<void>
  }

const alertContext = createContext({} as AlertContextType);
export default alertContext;
