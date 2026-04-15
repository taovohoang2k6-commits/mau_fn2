import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: any) => {
      return await axios.post("http://localhost:3000/register", values);
    },
    onSuccess: () => {
      message.success("Đăng ký thành công");
      navigate("/login");
    },
    onError: () => {
      message.error("Đăng ký thất bại");
    },
  });

  const onFinish = (values: any) => {
    mutate(values);
  };

  return (
    <div className="p-6 max-w-[400px] mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Đăng ký</h1>

      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Không được để trống email" },
            { type: "email", message: "Email không hợp lệ" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Không được để trống password" },
            { min: 6, message: "Ít nhất 6 ký tự" },
          ]}
        >
          <Input.Password />
        </Form.Item>

        {/* Confirm password */}
        <Form.Item
          label="Confirm Password"
          name="confirm"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Xác nhận mật khẩu" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("Mật khẩu không khớp");
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={isPending} block>
          Đăng ký
        </Button>
      </Form>
    </div>
  );
}


export default Register;
