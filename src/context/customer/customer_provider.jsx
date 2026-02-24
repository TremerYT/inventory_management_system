import { createContext, useContext } from 'react';
import { Form } from 'antd';
import { useCustomerApi } from '../../hooks/customers/useCustomerApi.js';

const CustomerContext = createContext(null);

export const CustomerProvider = ({ children }) => {
  const [form] = Form.useForm();
  const {
    isLoading,
    isEditMode,
    setIsEditMode,
    customers,
    customerOptions,
    deleteCustomers,
    fetchCustomers,
    createCustomers,
    updateCustomers,
  } = useCustomerApi({
    onSuccess: () => form.resetFields(),
    onUpdateSuccess: () => form.resetFields(),
  });

  return (
    <CustomerContext.Provider
      value={{
        form,
        isLoading,
        isEditMode,
        setIsEditMode,
        customers,
        customerOptions,
        deleteCustomers,
        fetchCustomers,
        createCustomers,
        updateCustomers,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomer = () => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error('useCustomer must be used within a customer context');
  }
  return context;
};
