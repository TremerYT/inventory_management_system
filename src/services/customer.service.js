import api from "./api.js";

export const createCustomer = async (data) => {
  try {
    const response = await api.post("/customer/create");
    return response.data;
  } catch (e) {
    console.error("Failed to create customer")
    throw e;
  }
}

export const getCustomers = async () => {
  try {
    const response = await api.get("/customer");
    return response.data
  } catch (e) {
    console.error("Failed to fetch customers");
    throw e;
  }
}

export const updateCustomer = async (id, data) => {
  try {
    const response = await api.put(`/customer/${id}`, data);
    return response.data;
  } catch (e) {
    console.error("Failed to update customer");
    throw escape;
  }
}

export const deleteCustomer = async (id) => {
  try {
    const response = await api.delete(`/customer/${id}`);
    return response.data;
  } catch (e) {
    console.error("Failed to delete customer");
    throw e;
  }
}