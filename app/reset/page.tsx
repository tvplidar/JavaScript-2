"use client";

import { Button, Form, Input, Modal } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const validateMessages = {
  required: "${label} is required!",
};

const ResetPassword: React.FC = () => {
  const [form] = Form.useForm();
  const router = useRouter();

  const [modalVisible, setModalVisible] = useState(false);

  const onFinish = (values: any) => {
    const { password } = values;
    console.log("New Password:", password);

    setModalVisible(true);

    // ให้รอ 2 วินาทีก่อน redirect
    setTimeout(() => {
      setModalVisible(false);
      router.push("/login"); // หรือ /login
    }, 2000);
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="rounded-2xl bg-white p-8 shadow-md w-full max-w-md">
          <div className="mb-6 text-2xl font-bold text-center">Reset Password</div>
          <Form
            {...layout}
            form={form}
            name="reset-password"
            onFinish={onFinish}
            validateMessages={validateMessages}
            layout="vertical"
          >
            <Form.Item
              name="password"
              label="New Password"
              rules={[
                { required: true, message: "Please enter your new password!" },
                { min: 8, message: "Password must be at least 8 characters long!" },
              ]}
              hasFeedback
            >
              <Input.Password placeholder="Enter new password" />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match!"));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm new password" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Reset Password
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>

      {/* Modal แสดงผลลัพธ์ */}
      <Modal
        open={modalVisible}
        title="Password Reset Successful"
        centered
        closable={false}
        footer={null}
      >
        <p>You have successfully reset your password. Redirecting to login page...</p>
      </Modal>
    </>
  );
};

export default ResetPassword;