import { Form } from 'antd';
import { createContext, useContext } from 'react';
import { useSupplierApi } from '../../hooks/suppliers/useSupplierApi.js';

const SupplierContext = createContext(null);

export const SupplierProvider = ({ children }) => {
  const [form] = Form.useForm();
  const {
    isLoading,
    isEditMode,
    setIsEditMode,
    suppliers,
    supplierOptions,
    deleteSuppliers,
    fetchSuppliers,
    createSuppliers,
    updateSuppliers,
  } = useSupplierApi({
    onSuccess: () => form.resetFields(),
    onUpdateSuccess: () => form.resetFields(),
  });

  return (
    <SupplierContext.Provider
      value={{
        form,
        isLoading,
        isEditMode,
        setIsEditMode,
        suppliers,
        supplierOptions,
        deleteSuppliers,
        fetchSuppliers,
        createSuppliers,
        updateSuppliers,
      }}
    >
      {children}
    </SupplierContext.Provider>
  );
};

export const useSupplier = () => {
  const context = useContext(SupplierContext);
  if (!context) {
    throw new Error('useSupplier must be used within a supplier context');
  }
  return context;
};
