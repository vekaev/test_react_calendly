import { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button, Typography, App } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";

import { RoutePath } from "~constants";

import { useAuth } from "../hooks/useAuth";
import { Layout } from "../components/Layout";

import styles from "./Auth.module.scss";

export const SignUp = () => {
  const { signUp } = useAuth();
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
      await signUp(email, password);
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
        <Typography.Title>Sign up</Typography.Title>
        <Form.Item
          className={styles.formItem}
          name='email'
          // TODO: MOVE TO CONSTANTS
          // TODO: ADD ZOD VALIDATION
          rules={[
            {
              type: "email",
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder='Email' />
        </Form.Item>
        <Form.Item
          className={styles.formItem}
          name='password'
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input
            prefix={<LockOutlined />}
            type='password'
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
            Sign Up
          </Button>
        </Form.Item>
        Already have an account? <Link to={RoutePath.SIGN_IN}>Log in</Link>
      </Form>
    </Layout>
  );
};
