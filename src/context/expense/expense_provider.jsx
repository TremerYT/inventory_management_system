import {Form} from 'antd';
import {createContext, useContext} from 'react';
import dayjs from 'dayjs';
import {useExpenseApi} from '../../hooks/expenses/useExpenseApi.js';

const ExpenseContext = createContext(null);

export const ExpenseProvider = ({children}) => {
  const [form] = Form.useForm();
  const {
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
  } = useExpenseApi({
    onSuccess: () => form.resetFields(),
    onUpdateSuccess: () => form.resetFields(),
  });

  const fetchExpensesById = async (id) => {
    try {
      const data = await fetchExpenseById(id);
      // Convert date to dayjs format for the DatePicker
      if (data.date) {
        data.date = dayjs(data.date);
      }
      form.setFieldsValue(data);
      setIsEditMode(true);
    } catch (e) {
      console.error('Failed to load expense', e);
    }
  };

  return (
    <ExpenseContext.Provider
      value={{
        loadingEdit,
        form,
        isLoading,
        isEditMode,
        setIsEditMode,
        expenses,
        expenseOptions,
        deleteExpenses,
        fetchExpenses,
        fetchExpenseById,
        fetchExpensesById,
        createExpenses,
        updateExpenses,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpense = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpense must be used within an expense context');
  }
  return context;
};
