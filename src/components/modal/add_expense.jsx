import {Modal} from 'antd';
import {useEffect} from 'react';
import {useExpense} from '../../context/expense/expense_provider.jsx';
import ExpensesForm from '../forms/expenses_form';

const AddExpense = ({isOpen, handleCancel, onOpenCategoryModal}) => {
  const {form, isEditMode, setIsEditMode, createExpenses, updateExpenses, isLoading} = useExpense();

  useEffect(() => {
    if (!isOpen) {
      setIsEditMode(false);
      form.resetFields();
    }
  }, [isOpen, form, setIsEditMode]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (values.date && values.date.format) {
        values.date = values.date.format('YYYY-MM-DD');
      }

      if (isEditMode) {
        const currentValues = form.getFieldsValue();
        const expenseId = currentValues.id;
        await updateExpenses(expenseId, values);
      } else {
        await createExpenses(values);
      }

      handleCancel();
      setIsEditMode(false);
      form.resetFields();
    } catch (error) {
      console.error('Form validation failed:', error);
    }
  };

  return (
    <Modal
      title={isEditMode ? 'Edit Expense' : 'Add Expense'}
      open={isOpen}
      onOk={handleOk}
      okText={isEditMode ? 'Update' : 'Add'}
      confirmLoading={isLoading}
      onCancel={handleCancel}
      width={600}
    >
      <ExpensesForm form={form} isEditMode={isEditMode} onOpenCategoryModal={onOpenCategoryModal}/>
    </Modal>
  );
};

export default AddExpense;