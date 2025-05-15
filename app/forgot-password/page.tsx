'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { MailOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const router = useRouter(); // ✅ Add this
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = (values: { email: string }) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      message.success(`Password reset link sent to ${values.email}`);
      setLoading(false);
      form.resetFields();
      router.push('/verifyotp'); // ✅ Now works correctly
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 bg-white p-10 rounded-xl shadow-lg transform transition-all hover:scale-105 duration-500">
        <div>
          <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">
            Reset Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your email and we'll send you instructions to reset your password
          </p>
        </div>
        
        <div className="mt-8">
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            requiredMark={false}
          >
            <Form.Item
              label="Email Address"
              name="email"
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email address' },
              ]}
            >
              <Input 
                prefix={<MailOutlined className="text-gray-400" />} 
                placeholder="example@email.com"
                size="large"
                className="rounded-lg"
              />
            </Form.Item>
            
            <Form.Item className="mt-6">
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={loading}
                size="large"
                className="h-12 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors duration-300"
              >
                Send Reset Link
              </Button>
            </Form.Item>
          </Form>
          
          <div className="w-full flex items-center justify-center border-t border-gray-200 mt-6 pt-6">
            <Link 
              href="/login" 
              className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-300"
            >
              <ArrowLeftOutlined className="mr-2" /> Back to Login
            </Link>
          </div>
          
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-300">
                Sign up
              </Link>
            </p>
          </div>
        </div>
        
        <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
          <h3 className="text-sm font-medium text-blue-800">Need Help?</h3>
          <p className="text-xs text-blue-700 mt-1">
            If you're having trouble accessing your account, please contact our support team at{' '}
            <a href="mailto:support@example.com" className="underline">support@example.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}
