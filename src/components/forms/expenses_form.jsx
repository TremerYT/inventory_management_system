import { Col, DatePicker, Form, Input, Row, Select, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useExpenseCategory } from '../../context/expense_category/expense_category_provider.jsx';
import dayjs from 'dayjs';

const { TextArea } = Input;

const ExpensesForm = ({ form, isEditMode, onOpenCategoryModal }) => {
  const { categoryOptions, fetchExpenseCategories } = useExpenseCategory();
  return (
    <Form form={form} layout="vertical">
      <Form.Item
        name="expenseName"
        label="Expense"
        rules={[{ required: true, message: 'Expense name is required' }]}
      >
        <Input placeholder="Enter expense name" />
      </Form.Item>
      <Form.Item name="description" label="Description">
        <TextArea rows={4} placeholder="Enter expense description" />
      </Form.Item>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            label="Expense Category"
            name="expenseCategoryId"
            rules={[{ required: true, message: 'Category is Required' }]}
          >
            <Select
              placeholder="Select category"
              allowClear
              options={categoryOptions}
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <div style={{ padding: '8px 4px', borderTop: '1px solid #f0f0f0' }}>
                    <Button
                      type="text"
                      icon={<PlusOutlined />}
                      onClick={onOpenCategoryModal}
                      style={{ width: '100%' }}
                    >
                      Add Category
                    </Button>
                  </div>
                </>
              )}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="date"
            label="Date"
            rules={[{ required: true, message: 'Date is Required' }]}
          >
            <DatePicker
              className="w-full"
              disabledDate={(current) => current && current < dayjs().startOf('day')}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            name="expenseAmount"
            label="Amount"
            rules={[{ required: true, message: 'Amount is Required' }]}
          >
            <Input type="number" placeholder="Enter amount" step="0.01" min="0.01" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'status is Required' }]}
          >
            <Select placeholder="Select status">
              <Select.Option value="PAID">PAID</Select.Option>
              <Select.Option value="PENDING">PENDING</Select.Option>
              <Select.Option value="OVERDUE">OVERDUE</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default ExpensesForm;
