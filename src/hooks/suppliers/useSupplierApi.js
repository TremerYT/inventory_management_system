import {message} from 'antd';
import {useCallback, useEffect, useState} from 'react';
import {
  createSupplier,
  deleteSupplier,
  getSupplierById,
  getSuppliers,
  updateSupplier,
} from '../../services/supplier.service.js';

export const useSupplierApi = ({onSuccess, onUpdateSuccess}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [supplierOptions, setSupplierOptions] = useState([]);

  const fetchSuppliers = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await getSuppliers();
      setSuppliers(res);
      setSupplierOptions(
        res.map((supplier) => ({
          label: `${supplier.firstName} ${supplier.lastName}`,
          value: supplier.id,
        }))
      );
      if (onSuccess) onSuccess();
      return true;
    } catch (e) {
      console.error('Failed to fetch suppliers', e);
    } finally {
      setIsLoading(false);
    }
  }, [onSuccess]);

  const fetchSupplierById = async (id) => {
    try {
      setLoadingEdit(true)
      return await getSupplierById(id);
    } catch (error) {
      console.error('Error fetching supplier:', error);
      throw error;
    } finally {
      setLoadingEdit(false);
    }
  };

  const createSuppliers = async (data) => {
    try {
      setIsLoading(true);
      await createSupplier(data);
      message.success('Supplier created successfully');
      await fetchSuppliers();
      if (onSuccess) onSuccess();
      return true;
    } catch (e) {
      setIsLoading(false);
      console.error('Failed to create supplier', e);
      message.error('Failed to create supplier');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateSuppliers = async (id, data) => {
    try {
      setIsLoading(true);
      await updateSupplier(id, data);
      message.success('Supplier updated successfully');
      await fetchSuppliers();
      if (onUpdateSuccess) onUpdateSuccess();
      return true;
    } catch (e) {
      message.error('Failed to update supplier');
      console.error('Failed to update supplier', e);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteSuppliers = async (id) => {
    try {
      setIsLoading(true);
      await deleteSupplier(id);
      await fetchSuppliers();
      message.success('Deleted supplier successfully');
      if (onSuccess) onSuccess();
    } catch (e) {
      message.error('Failed to delete supplier');
      console.error('Failed to delete supplier', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  return {
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
  };
};
