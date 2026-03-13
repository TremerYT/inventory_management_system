import { message } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import {
  createExpense,
  deleteExpense,
  getExpenseById,
  getExpenses,
  updateExpense,
} from '../../services/expense.service.js';
import { getExpenseCategories } from '../../services/expense_category.service.js';

export const useExpenseApi = ({ onSuccess, onUpdateSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [expenseOptions, setExpenseOptions] = useState([]);

  const fetchExpenses = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await getExpenses();

      // Fetch categories to map categoryId to categoryName
      let categories = [];
      try {
        categories = await getExpenseCategories();
      } catch (e) {
        console.error('Failed to fetch categories for mapping', e);
      }

      // Create a map of categoryId to categoryName
      const categoryMap = categories.reduce((map, category) => {
        map[category.id] = category.name;
        return map;
      }, {});

      // Enrich expenses with categoryName
      const enrichedExpenses = res.map((expense) => ({
        ...expense,
        categoryName: categoryMap[expense.expenseCategoryId] || 'Unknown',
      }));

      setExpenses(enrichedExpenses);
      setExpenseOptions(
        res.map((expense) => ({
          label: expense.description || expense.id,
          value: expense.id,
        }))
      );
      if (onSuccess) onSuccess();
      return true;
    } catch (e) {
      console.error('Failed to fetch expenses', e);
    } finally {
      setIsLoading(false);
    }
  }, [onSuccess]);

  const fetchExpenseById = async (id) => {
    try {
      setLoadingEdit(true);
      return await getExpenseById(id);
    } catch (error) {
      console.error('Error fetching expense:', error);
      throw error;
    } finally {
      setLoadingEdit(false);
    }
  };

  const createExpenses = async (data) => {
    try {
      setIsLoading(true);
      await createExpense(data);
      message.success('Expense created successfully');
      await fetchExpenses();
      if (onSuccess) onSuccess();
      return true;
    } catch (e) {
      console.error('Failed to create expense', e);
      message.error('Failed to create expense');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateExpenses = async (id, data) => {
    try {
      setIsLoading(true);
      await updateExpense(id, data);
      message.success('Expense updated successfully');
      await fetchExpenses();
      if (onUpdateSuccess) onUpdateSuccess();
      return true;
    } catch (e) {
      message.error('Failed to update expense');
      console.error('Failed to update expense', e);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteExpenses = async (id) => {
    try {
      setIsLoading(true);
      await deleteExpense(id);
      await fetchExpenses();
      message.success('Deleted expense successfully');
      if (onSuccess) onSuccess();
    } catch (e) {
      message.error('Failed to delete expense');
      console.error('Failed to delete expense', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return {
    loadingEdit,
    isLoading,
    isEditMode,
    setIsEditMode,
    expenses,
    expenseOptions,
    deleteExpenses,
    fetchExpenses,
    fetchExpenseById,
    createExpenses,
    updateExpenses,
  };
};
