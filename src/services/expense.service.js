import api from './api.js';

export const createExpense = async (data) => {
  try {
    const response = await api.post('/expense/create', data);
    return response.data;
  } catch (e) {
    console.error('Failed to create expense');
    throw e;
  }
};

export const getExpenses = async () => {
  try {
    const response = await api.get('/expense');
    return response.data;
  } catch (e) {
    console.error('Failed to fetch expenses');
    throw e;
  }
};

export const getExpenseById = async (id) => {
  try {
    const response = await api.get(`/expense/${id}`);
    return response.data;
  } catch (e) {
    console.error('Failed to fetch expense');
    throw e;
  }
};

export const updateExpense = async (id, data) => {
  try {
    const response = await api.put(`/expense/${id}`, data);
    return response.data;
  } catch (e) {
    console.error('Failed to update expense');
    throw e;
  }
};

export const deleteExpense = async (id) => {
  try {
    const response = await api.delete(`/expense/${id}`);
    return response.data;
  } catch (e) {
    console.error('Failed to delete expense');
    throw e;
  }
};
