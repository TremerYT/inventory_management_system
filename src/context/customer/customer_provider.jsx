import {createContext, useContext} from "react";
import {Form} from "antd";

const CustomerContext = createContext(null);

export const CustomerProvider = ({children}) => {
  const [form] = Form.useForm();
  return (
    <CustomerContext.Provider value={{
      form
    }}>
      {children}
    </CustomerContext.Provider>
  )
}

export const useCustomer = () => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error("useCustomer must be used within a customer context");
  }
  return context;
}