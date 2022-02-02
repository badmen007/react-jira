import { Form, Input } from "antd";
import { useAuth } from "context/auth-context";
import { FormEvent } from "react";
import { LongButton } from "unauthenticated-app";

export const RegisterScreen = () => {
  const { register } = useAuth();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;
    register({ username, password });
  };

  return (
    <Form onFinish={onSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入你的用户名" }]}
      >
        <Input type={"text"} id={"username"} placeholder={"用户名"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入你的密码" }]}
      >
        <Input type="text" id={"password"} placeholder={"密码"} />
      </Form.Item>
      <Form.Item>
        <LongButton type="primary">注册</LongButton>
      </Form.Item>
    </Form>
  );
};
