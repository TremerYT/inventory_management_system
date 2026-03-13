import api from './api.js';

export const createExpenseCategory = async (data) => {
  try {
    const response = await api.post('/expense-category/create', data);
    return response.data;
  } catch (e) {
    console.error('Failed to create expense category');
    throw e;
  }
};

export const getExpenseCategories = async () => {
  try {
    const response = await api.get('/expense-category');
    return response.data;
  } catch (e) {
    console.error('Failed to fetch expense categories');
    throw e;
  }
};

