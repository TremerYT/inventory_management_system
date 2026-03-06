import {Form} from 'antd';
import {createContext, useContext} from 'react';
import {useSupplierApi} from '../../hooks/suppliers/useSupplierApi.js';

const SupplierContext = createContext(null);

export const SupplierProvider = ({children}) => {
  const [form] = Form.useForm();
  const {
    loadingEdit,
    isLoading,
    isEditMode,
    setIsEditMode,
    suppliers,
    supplierOptions,
    deleteSuppliers,
    fetchSuppliers,
    fetchSupplierById,
    createSuppliers,
    updateSuppliers,
  } = useSupplierApi({
    onSuccess: () => form.resetFields(),
    onUpdateSuccess: () => form.resetFields(),
  });

  const fetchSuppliersById = async (id) => {
    try {
      const data = await fetchSupplierById(id);
      form.setFieldsValue(data);
      setIsEditMode(true);
    } catch (e) {
      console.error('Failed to load supplier', e);
    }
  };

  return (
    <SupplierContext.Provider
      value={{
        loadingEdit,
        form,
        isLoading,
        isEditMode,
        setIsEditMode,
        suppliers,
        supplierOptions,
        deleteSuppliers,
        fetchSuppliers,
        fetchSupplierById,
        fetchSuppliersById,
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
