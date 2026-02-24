import { Button, Checkbox, Form, Input, message } from 'antd';
import api from '../../services/api.js';
import { useState } from 'react';
import { useAuth } from '../../context/auth/auth_provider.jsx';

const LoginForm = () => {
  const [loginForm] = Form.useForm();
  const [loading, setloading] = useState(false);
  const { login } = useAuth();
  const handleSubmit = async () => {
    const data = loginForm.getFieldsValue();
    try {
      setloading(true);
      const response = await api.post('/auth/login', data, { skipAuth: true });
      login(response.data.accessToken);
      setloading(false);
    } catch (e) {
      console.error('Failed to login', e);
      message.error('Login Failed');
      setloading(false);
    }
  };

  return (
    <Form form={loginForm} layout="vertical" onFinish={handleSubmit}>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Email is required' }]}
      >
        <Input size="large" placeholder="Enter your email" />
      </Form.Item>

      <Form.Item label="Password" name="password" rules={[{ required: true }]}>
        <Input.Password size="large" placeholder="Enter your password" />
      </Form.Item>

      <div className="flex justify-between items-center mb-4">
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Stay logged in on this device</Checkbox>
        </Form.Item>
        <Button type="link" size="large" color="">
          Forgot Password?
        </Button>
      </div>

      <Button
        type="primary"
        htmlType="submit"
        size="large"
        className="w-full mb-6"
        loading={loading}
      >
        Login
      </Button>
    </Form>
  );
};

export default LoginForm;
