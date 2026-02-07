import api from "./api.js";

export const createBrand = async (data) => {
  try {
    const response = await api.post("/brand/create", data);
    return response.data;
  } catch (e) {
    console.error("Failed to create brand");
    throw e;
  }
}

export const getBrands = async () => {
  try {
    const response = await api.get("/brand");
    return response.data;
  } catch (e) {
    console.error("Failed to fetch brands");
    throw e;
  }
}

export const updateBrandById = async (id, data) => {
  try {
    const response = await api.put(`/brand/${id}`, data);
    return response.data;
  } catch (e) {
    console.error("Failed to update brand");
    throw e;
  }
}

export const deleteBrandById = async (id) => {
  try {
    const response = await api.delete(`/brand/${id}`);
    return response.data;
  } catch (e) {
    console.error("Failed to delete brand");
    throw e;
  }
}