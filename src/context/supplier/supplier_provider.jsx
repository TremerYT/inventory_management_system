import {createContext, useContext} from "react";
import {Form} from "antd";

const SupplierContext = createContext(null);
export const SupplierProvider = ({children}) => {
  const {form} = Form.useForm
  return (
    <SupplierContext.Provider value={{form}}>
      {children}
    </SupplierContext.Provider>
  );
}

export const useSupplier = () => {
  const context = useContext(SupplierContext);
  if (!context) {
    throw new Error("Contexet must be within useSupplier")
  }
  return context;
}