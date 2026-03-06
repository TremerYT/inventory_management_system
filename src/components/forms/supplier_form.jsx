import {Button, Col, Form, Input, Row, Spin, Switch} from 'antd';
import 'react-phone-number-input/style.css';
import {useParams} from "react-router";
import {useSupplier} from '../../context/supplier/supplier_provider.jsx';

const SupplierForm = () => {
  const {id} = useParams();
  const {form, createSuppliers, updateSuppliers, isEditMode, setIsEditMode, isLoading, loadingEdit} = useSupplier();

  const onFinish = async (values) => {
    if (isEditMode) {
      const success = await updateSuppliers(form.getFieldValue('id'), values);
      if (success) {
        setIsEditMode(false);
      }
    } else {
      await createSuppliers(values);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setIsEditMode(false);
  };

  return (
    <Spin spinning={!!id && loadingEdit}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="id" hidden>
          <Input/>
        </Form.Item>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[{required: true, message: 'First name is required'}]}
            >
              <Input/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="lastName"
              label="Last name"
              rules={[{required: true, message: 'Last name is required'}]}
            >
              <Input/>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              name="companyName"
              label="Company Name"
              rules={[{required: true, message: 'Username is required'}]}
            >
              <Input/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="email"
              label="Email"
              rules={[{required: true, message: 'email is required', type: 'email'}]}
            >
              <Input/>
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
              <Input/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="city"
              label="City"
              rules={[
                {
                  required: true,
                  message: 'City is required',
                },
              ]}
            >
              <Input/>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              name="zipCode"
              label="Zip Code"
              rules={[{required: true, message: 'Zip Code is required'}]}
            >
              <Input/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="address"
              label="Address"
              rules={[{required: true, message: 'Address is required'}]}
            >
              <Input/>
            </Form.Item>
          </Col>
        </Row>
        <div className="flex justify-end">
          <Form.Item name="status" label="Status" valuePropName="checked" initialValue={true}>
            <Switch size="default"/>
          </Form.Item>
        </div>
        <div className="flex gap-4 justify-end mt-10">
          <Button type="primary" htmlType="submit" size="large" loading={isLoading}>
            {isEditMode ? 'Update Supplier' : 'Save Supplier'}
          </Button>
          <Button type="primary" danger size="large" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </Form>
    </Spin>
  );
};

export default SupplierForm;
