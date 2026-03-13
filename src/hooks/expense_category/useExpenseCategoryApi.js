import { message } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import {
  createExpenseCategory,
  getExpenseCategories,
} from '../../services/expense_category.service.js';

export const useExpenseCategoryApi = ({ onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);

  const fetchExpenseCategories = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await getExpenseCategories();
      setExpenseCategories(res);
      setCategoryOptions(
        res.map((category) => ({
          label: category.name,
          value: category.id,
        }))
      );
      if (onSuccess) onSuccess();
      return true;
    } catch (e) {
      console.error('Failed to fetch expense categories', e);
    } finally {
      setIsLoading(false);
    }
  }, [onSuccess]);

  const createExpenseCategoryItem = async (data) => {
    try {
      setIsLoading(true);
      await createExpenseCategory(data);
      message.success('Expense category created successfully');
      await fetchExpenseCategories();
      if (onSuccess) onSuccess();
      return true;
    } catch (e) {
      console.error('Failed to create expense category', e);
      message.error('Failed to create expense category');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenseCategories();
  }, []);

  return {
    isLoading,
    expenseCategories,
    categoryOptions,
    fetchExpenseCategories,
    createExpenseCategory: createExpenseCategoryItem,
  };
};
