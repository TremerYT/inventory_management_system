import api from './api.js';

export const createSupplier = async (data) => {
  try {
    const response = await api.post('/supplier/create', data);
    return response.data;
  } catch (e) {
    console.error('Failed to create supplier');
    throw e;
  }
};

export const getSuppliers = async () => {
  try {
    const response = await api.get('/supplier');
    return response.data;
  } catch (e) {
    console.error('Failed to fetch suppliers');
    throw e;
  }
};

export const getSupplierById = async (id) => {
  try {
    const response = await api.get(`/supplier/${id}`);
    return response.data;
  } catch (e) {
    console.error('Failed to fetch supplier');
    throw e;
  }
};

export const updateSupplier = async (id, data) => {
  try {
    const response = await api.put(`/supplier/${id}`, data);
    return response.data;
  } catch (e) {
    console.error('Failed to update supplier');
    throw e;
  }
};

export const deleteSupplier = async (id) => {
  try {
    const response = await api.delete(`/supplier/${id}`);
    return response.data;
  } catch (e) {
    console.error('Failed to delete supplier');
    throw e;
  }
};
