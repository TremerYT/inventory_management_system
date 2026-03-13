import { createContext, useContext } from 'react';
import { Form } from 'antd';
import { useExpenseCategoryApi } from '../../hooks/expense_category/useExpenseCategoryApi.js';
import { useState } from 'react';

const ExpenseCategoryContext = createContext(null);

export const ExpenseCategoryProvider = ({ children }) => {
  const [form] = Form.useForm();
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const {
    expenseCategories,
    isLoading,
    categoryOptions,
    fetchExpenseCategories,
    createExpenseCategory,
  } = useExpenseCategoryApi({
    onSuccess: () => {
      setIsCategoryModalOpen(false);
      form.resetFields();
    },
  });

  const handleOpenModal = () => {
    setIsCategoryModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsCategoryModalOpen(false);
    form.resetFields();
  };

  return (
    <ExpenseCategoryContext.Provider
      value={{
        form,
        expenseCategories,
        isLoading,
        categoryOptions,
        fetchExpenseCategories,
        createExpenseCategory,
        isCategoryModalOpen,
        setIsCategoryModalOpen,
        handleOpenModal,
        handleCloseModal,
      }}
    >
      {children}
    </ExpenseCategoryContext.Provider>
  );
};

export const useExpenseCategory = () => {
  const context = useContext(ExpenseCategoryContext);
  if (!context) {
    throw new Error('useExpenseCategory must be used within an ExpenseCategoryProvider');
  }
  return context;
};
