import { Form, Input } from 'antd';

const ExpenseCategoryForm = ({ form, onFinish }) => {
  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="name"
        label="Category Name"
        rules={[{ required: true, message: 'Category name is required' }]}
      >
        <Input placeholder="Enter expense category name" />
      </Form.Item>
    </Form>
  );
};

export default ExpenseCategoryForm;
