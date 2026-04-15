import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Form, Input, message, Select } from "antd";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();


  const { data } = useQuery({
    queryKey: ["note", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/notes/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data]);

  const { mutate } = useMutation({
    mutationFn: async (values: any) => {
      await axios.put(`http://localhost:3000/notes/${id}`, values);
    },
    onSuccess: () => {
      message.success("Sửa thành công");
      navigate("/list");
    },
  });

  const onFinish = (values: any) => {
    mutate(values);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Chỉnh sửa</h1>

<Form
  form={form}
  layout="vertical"
  className="space-y-6"
  onFinish={onFinish}
>

  <Form.Item
    label="title"
    name="title"
    rules={[
      { required: true, message: "Không được để trống title" },
      { min: 3, message: "Ít nhất 3 ký tự" },
    ]}
  >
    <Input />
  </Form.Item>

  <Form.Item
    label="content"
    name="content"
    rules={[
      { required: true, message: "Không được để trống content" },
      { min: 5, message: "Ít nhất 5 ký tự" },
    ]}
  >
    <Input />
  </Form.Item>


  <Form.Item
    label="priority"
    name="priority"
    rules={[
      { required: true, message: "Vui lòng chọn priority" },
    ]}
  >
    <Select
      options={[
        { label: "medium", value: "medium" },
        { label: "high", value: "high" },
        { label: "low", value: "low" },
      ]}
    />
  </Form.Item>

  <Form.Item
    label="duration"
    name="duration"
    rules={[
      { required: true, message: "Không được để trống duration" },
      {
        pattern: /^[0-9]+$/,
        message: "Phải là số",
      },
      {
        validator: (_, value) => {
          if (!value || Number(value) > 0) {
            return Promise.resolve();
          }
          return Promise.reject("Phải lớn hơn 0");
        },
      },
    ]}
  >
    <Input />
  </Form.Item>

  <Button type="primary" htmlType="submit">
    Update
  </Button>
</Form>
    </div>
  );
}

export default EditPage;
