import { Button, Col, Form, Input, InputNumber, Row, Select, Switch } from 'antd';
import 'react-phone-number-input/style.css';
import { useCustomer } from '../../context/customer/customer_provider.jsx';

const CustomerForm = () => {
  const { form, createCustomers, isLoading } = useCustomer();
  return (
    <Form form={form} layout="vertical" onFinish={createCustomers}>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true, message: 'First name is required' }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="lastName"
            label="Last name"
            rules={[{ required: true, message: 'Last name is required' }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            name="customerCategory"
            label="Customer Category"
            rules={[{ required: true, message: 'Customer category is required' }]}
          >
            <Select
              options={[
                { value: 'shop_Reseller', label: 'Shop Reseller' },
                { value: 'walk_In_Customer', label: 'Walk-In-Customer' },
                { value: 'wholeSeller', label: 'Wholeseller' },
              ]}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Email is required' }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            name="phoneNumber"
            label="Phone number"
            rules={[
              {
                required: true,
                message: 'Phone number is required',
                pattern: /^(?:\+254|254|0)?(7\d{8}|1\d{8})$/,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="country"
            label="Country"
            rules={[{ required: true, message: 'Country is required' }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            name="city"
            label="City"
            rules={[{ required: true, message: 'city is required' }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="zipCode"
            label="Zip Code"
            rules={[{ required: true, message: 'Zip Code is required' }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item name="rewardPoint" label="Reward Points" initialValue={0}>
            <InputNumber min={0} max={100000} className="w-full!" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: 'Address is required' }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <div className="flex justify-end">
        <Form.Item name="status" label="Status" valuePropName="checked" initialValue={true}>
          <Switch size="default" />
        </Form.Item>
      </div>
      <div className="flex gap-4 justify-end mt-10">
        <Button type="primary" htmlType="submit" size="large" loading={isLoading}>
          Save Customer
        </Button>
        <Button type="primary" size="large" danger onClick={() => form.resetFields()} o>
          Cancel
        </Button>
      </div>
    </Form>
  );
};

export default CustomerForm;
