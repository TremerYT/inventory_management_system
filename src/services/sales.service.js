import api from "./api.js";

export const createSale = async (data) => {
  try {
    const response = await api.post("/sales/create", data);
    return response.data;
  } catch (e) {
    console.error("Failed to create sale");
    throw e;
  }
};

export const getSales = async () => {
  try {
    const response = await api.get("/sales");
    return response.data;
  } catch (e) {
    console.error("Failed to fetch sales");
    throw e;
  }
};

export const getSaleById = async (id) => {
  try {
    const response = await api.get(`/sales/${id}`);
    return response.data;
  } catch (e) {
    console.error("Failed to fetch sale");
    throw e;
  }
};

export const updateSaleById = async (id, data) => {
  try {
    const response = await api.put(`/sales/${id}`, data);
    return response.data;
  } catch (e) {
    console.error("Failed to update sale");
    throw e;
  }
};

export const deleteSaleById = async (id) => {
  try {
    const response = await api.delete(`/sales/${id}`);
    return response.data;
  } catch (e) {
    console.error("Failed to delete sale");
    throw e;
  }
};
