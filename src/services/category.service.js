import api from "./api.js";


export const createCategory = async (data) => {
  try {
    const response = await api.post("/category/create", data);
    return response.data;
  } catch (e) {
    console.error("Failed to create Category");
    throw e;
  }
}

export const getCategory = async () => {
  try {
    const response = await api.get("/category");
    return response.data;
  } catch (e) {
    console.error("Failed to fetch products");
    throw e;
  }
}


export const updateCategoryById = async (id, data) => {
  try {
    const response = await api.put(`/category/${id}`, data);
    return response.data;
  } catch (e) {
    console.error("Failed to update category");
    throw e;
  }
}

export const getCategoryById = async (id) => {
  try {
    const response = await api.get(`/category/${id}`);
    return response.data;
  } catch (e) {
    console.error("Failed to fetch products");
    throw e;
  }
}

export const deleteCategoryById = async (id) => {
  try {
    const response = await api.delete(`/category/${id}`);
    return response.data;
  } catch (e) {
    console.error("Failed to delete products");
    throw e;
  }
}

