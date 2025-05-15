"use client";

import { Form, Input, Button, Modal } from "antd";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const App: React.FC = () => {
  const router = useRouter();
  const [form] = Form.useForm();

  const [modal, setModal] = useState({
    open: false,
    title: "",
    content: "",
    isSuccess: false,
  });

  const [loading, setLoading] = useState(false); 
  const [timer, setTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isResendDisabled && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsResendDisabled(false);
    }
    return () => clearInterval(interval);
  }, [isResendDisabled, timer]);

  const handleResendOTP = () => {
    setTimer(30);
    setIsResendDisabled(true);
  };

  const onFinish = (values: any) => {
    const otpValue = values.otp;
    console.log("OTP Entered:", otpValue);

    if (otpValue === "111111") {
      setModal({
        open: true,
        title: "Success",
        content: "OTP is correct. Redirecting...",
        isSuccess: true,
      });

      setLoading(true); 

      setTimeout(() => {
        setLoading(false);
        setModal((prev) => ({ ...prev, open: false }));
        router.push("/reset");
      }, 2000);
    } else {
      setModal({
        open: true,
        title: "Invalid OTP",
        content: "The OTP you entered is incorrect. Please try again.",
        isSuccess: false,
      });

      form.resetFields(["otp"]);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="rounded-2xl bg-white p-8 shadow-md w-full max-w-sm">
          <div className="mb-6 text-2xl font-bold text-center">Enter OTP</div>
          <Form
            form={form}
            name="otp-form"
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              name="otp"
              rules={[{ required: true, message: "Please input your OTP!" }]}
              hasFeedback
              className="flex justify-center"
            >
              <Input.OTP length={6} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Verify OTP
              </Button>
            </Form.Item>
          </Form>

          <div className="text-center mt-4">
            {isResendDisabled ? (
          <span>Resend OTP in 00:{String(timer).padStart(2, '0')}</span>
            ) : (
              <Button type="link" onClick={handleResendOTP}>
                Resend OTP
              </Button>
            )}
          </div>
        </div>
      </div>

      <Modal
        open={modal.open}
        title={modal.title}
        onOk={() => setModal({ ...modal, open: false })}
        onCancel={() => setModal({ ...modal, open: false })}
        centered
        closable={!modal.isSuccess}
        okButtonProps={{
          disabled: modal.isSuccess,
          loading: loading && modal.isSuccess,
        }}
        cancelButtonProps={{ disabled: modal.isSuccess }}
      >
        <p>{modal.content}</p>
      </Modal>
    </>
  );
};

export default App;