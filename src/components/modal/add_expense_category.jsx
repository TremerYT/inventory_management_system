import {Modal} from 'antd';
import {useEffect} from 'react';
import {useExpenseCategory} from '../../context/expense_category/expense_category_provider.jsx';
import ExpenseCategoryForm from '../forms/expense_category_form.jsx';

const AddExpenseCategory = ({isOpen, handleCancel, handleOk, loading}) => {
  const {form} = useExpenseCategory();

  useEffect(() => {
    if (!isOpen) {
      form.resetFields();
    }
  }, [isOpen, form]);

  const onFinish = async (values) => {
    try {
      await handleOk(values);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      title="Add Expense Category"
      open={isOpen}
      onOk={() => form.submit()}
      okText="Add Category"
      onCancel={handleCancel}
      okButtonProps={{loading: loading}}
    >
      <ExpenseCategoryForm form={form} onFinish={onFinish} />
    </Modal>
  );
};

export default AddExpenseCategory;
