import { Form, Input } from "antd";
import { useAuth } from "context/auth-context";
import { LongButton } from "unauthenticated-app";

export const LoginScreen = () => {
  const { login } = useAuth();

  const onSubmit = (values: { username: string; password: string }) => {
    login(values);
  };

  return (
    <Form onFinish={onSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入你的用户名" }]}
      >
        <Input type="text" id={"username"} placeholder={"用户名"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入你的密码" }]}
      >
        <Input id={"password"} type="text" placeholder={"密码"} />
      </Form.Item>
      <Form.Item>
        <LongButton type="primary" htmlType={"submit"}>
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};
