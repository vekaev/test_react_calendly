import { useState } from "react";
import { Link } from "react-router-dom";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Form, Input, Button, Typography, App } from "antd";

import { RoutePath } from "~constants";

import { useAuth } from "../hooks/useAuth";
import { Layout } from "../components/Layout";

import styles from "./Auth.module.scss";

export const SignIn = () => {
  const { login } = useAuth();
  const { message } = App.useApp();
  const [loading, setLoading] = useState(false);

  const onSubmit = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      setLoading(true);
      await login(email, password);
    } catch (error) {
      if (error instanceof Error) message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Form
        className={styles.form}
        autoComplete='on'
        onFinish={onSubmit}
        initialValues={{ remember: true }}
      >
        <Typography.Title>Sign in</Typography.Title>
        <Form.Item
          className={styles.formItem}
          name='email'
          rules={[
            {
              type: "email",
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input
            autoComplete='username'
            prefix={<MailOutlined />}
            placeholder='Email'
          />
        </Form.Item>
        <Form.Item
          className={styles.formItem}
          name='password'
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input
            prefix={<LockOutlined />}
            type='password'
            autoComplete='current-password'
            placeholder='Password'
          />
        </Form.Item>
        <Form.Item>
          <Button
            className={styles.submitBtn}
            type='primary'
            htmlType='submit'
            loading={loading}
          >
            Login
          </Button>
        </Form.Item>
        Don't have an account? <Link to={RoutePath.SIGN_UP}>Sign up</Link>
      </Form>
    </Layout>
  );
};
