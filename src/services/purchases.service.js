import api from "./api.js";

export const createPurchase = async (data) => {
  try {
    const response = await api.post("/purchases/create", data);
    return response.data;
  } catch (e) {
    console.error("Failed to create purchase");
    throw e;
  }
};

export const getPurchases = async () => {
  try {
    const response = await api.get("/purchases");
    return response.data;
  } catch (e) {
    console.error("Failed to fetch purchases");
    throw e;
  }
};

export const getPurchaseById = async (id) => {
  try {
    const response = await api.get(`/purchases/${id}`);
    return response.data;
  } catch (e) {
    console.error("Failed to fetch purchase");
    throw e;
  }
};

export const updatePurchaseById = async (id, data) => {
  try {
    const response = await api.put(`/purchases/${id}`, data);
    return response.data;
  } catch (e) {
    console.error("Failed to update purchase");
    throw e;
  }
};

export const deletePurchaseById = async (id) => {
  try {
    const response = await api.delete(`/purchases/${id}`);
    return response.data;
  } catch (e) {
    console.error("Failed to delete purchase");
    throw e;
  }
};
