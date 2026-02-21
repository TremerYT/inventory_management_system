import {Button, Form, Input, message} from 'antd';
import {useState} from 'react';
import api from '../../services/api.js';
import {useNavigate} from "react-router";

const RegisterForm = () => {
  const [registerForm] = Form.useForm();
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async () => {
    const data = registerForm.getFieldsValue();
    try {
      setloading(true);
      await api.post('/auth/register', data, {skipAuth: true});
      message.success("Account created successfully")
      navigate("/login");
      setloading(false);
    } catch (e) {
      message.error('Something went wrong');
      console.error('Failed to register: ', e);
      setloading(false);
    } finally {
      registerForm.resetFields();
    }
  };
  return (
    <Form form={registerForm} layout="vertical" onFinish={handleSubmit}>
      <Form.Item
        label="Full Name"
        name="fullName"
        rules={[{required: true, message: 'Full name is required'}]}
      >
        <Input size="large" placeholder="Enter your full name"/>
      </Form.Item>

      <Form.Item
        label="Username"
        name="userName"
        rules={[{required: true, message: 'User name is required'}]}
      >
        <Input size="large" placeholder="Enter your user name"/>
      </Form.Item>

      <Form.Item
        name="businessName"
        label="Business Name"
        rules={[{required: true, message: 'Business name is required'}]}
      >
        <Input size="large" placeholder="Enter your business name"/>
      </Form.Item>
      <Form.Item label="Email" name="email" rules={[{required: true, type: 'email'}]}>
        <Input size="large" placeholder="Enter your email"/>
      </Form.Item>

      <Form.Item label="Password" name="password" rules={[{required: true}]}>
        <Input.Password size="large" placeholder="Enter your password"/>
      </Form.Item>

      <Button
        type="primary"
        htmlType="submit"
        size="large"
        loading={loading}
        className="w-full mb-6"
      >
        Register
      </Button>
    </Form>
  );
};

export default RegisterForm;
