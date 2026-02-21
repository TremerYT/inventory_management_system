import {useState} from "react";
import {createCustomer, deleteCustomer, updateCustomer} from "../../services/customer.service.js";
import {message} from "antd";

export const useCustomerApi = ({onSuccess, onUpdateSuccess}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [customerOptions, setCustomerOptions] = useState([]);
  const createCustomers = async () => {
    try {
      setIsLoading(true);
      const res = await createCustomer();
      message.success("Customer created successfully");
      if (onSuccess) onSuccess();
      return true
    } catch (e) {
      setIsLoading(false);
      console.error("Failed to create customer", e);
      message.error("Failed to create customer");
      return false;
    } finally {
      setIsLoading(false);
    }
  }

  const fetchCustomers = async () => {
    try {
      setIsLoading(true);
      const res = await fetchCustomers();
      setCustomers(res);
      setCustomerOptions(res.map((customer) => ({label: customer.fullName, value: customer.id})))
      if (onSuccess) onSuccess();
      return true
    } catch (e) {
      console.error("Failed to fetch customers");
    } finally {
      setIsLoading(false);
    }
  }

  const updateCustomers = async (id, data) => {
    try {
      setIsLoading(true);
      await updateCustomer(id, data);
      message.success("Customer updated successfully");
      await fetchCustomers();
      if (onUpdateSuccess) onUpdateSuccess();
      return true;
    } catch (e) {
      message.error("Failed to update customer");
      console.error("Failed to update customer", e);
      return false;
    } finally {
      setIsLoading(false);
    }
  }

  const deleteCustomers = async (id) => {
    try {
      setIsLoading(true);
      await deleteCustomer(id);
      await fetchCustomers();
      message.success("Deleted customer successfully");
      if (onSuccess) onSuccess();
    } catch (e) {
      message.error("Failed to delete customer");
      console.error("Failed to delete customer", e);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    isLoading,
    isEditMode,
    setIsEditMode,
    customers,
    customerOptions,
    deleteCustomers,
    fetchCustomers,
    createCustomers,
    updateCustomers
  }
}