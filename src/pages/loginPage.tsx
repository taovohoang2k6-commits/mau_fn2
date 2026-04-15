import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: any) => {
      const res = await axios.post("http://localhost:3000/login", values);
      return res.data;
    },
    onSuccess: (data) => {
      message.success("Đăng nhập thành công");

      localStorage.setItem("user", JSON.stringify(data));

      navigate("/list");
    },
    onError: () => {
      message.error("Sai email hoặc mật khẩu");
    },
  });

  const onFinish = (values: any) => {
    mutate(values);
  };

  return (
    <div className="p-6 max-w-[400px] mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Đăng nhập</h1>

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

        <Button type="primary" htmlType="submit" loading={isPending} block>
          Đăng nhập
        </Button>
      </Form>
    </div>
  );
}

export default Login;
