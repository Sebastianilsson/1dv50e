import React, { useState } from "react";
import validator from "validator";
import { Form, Row, Col, Input, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { authenticateUser, getIsAuthenticated } from "./userSlice";
import { Redirect } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(getIsAuthenticated);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const login = async (values) => {
    setIsLoading(true);
    try {
      await dispatch(authenticateUser(values));
    } catch (e) {
      setIsLoading(false);
    }
  };

  if (isAuthenticated) return <Redirect to={"/privatePage"} />;
  return (
    <Row
      type="flex"
      justify="center"
      align="middle"
      style={{ marginTop: "5%" }}
    >
      <Col>
        <div className="card">
          <h2 align="center" type="primary">
            Logga in
          </h2>
          <Form name="basic" onFinish={login} form={form}>
            <Form.Item
              name="email"
              validateFirst={true}
              rules={[
                {
                  required: true,
                  message: "Du måste ange din emailadress",
                  validateTrigger: "onSubmit",
                },
                {
                  validator(rule, value) {
                    if (validator.isEmail(value)) return Promise.resolve();
                    return Promise.reject(
                      "Du måste ange en giltlig emailadress"
                    );
                  },
                },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item
              name="password"
              validateFirst={true}
              rules={[
                {
                  required: true,
                  message: "Du måste ange ditt lösenord",
                  validateTrigger: "onSubmit",
                },
                {
                  validator(rule, value) {
                    if (value.length >= 6) return Promise.resolve();
                    return Promise.reject(
                      "Ditt lösenord måste vara minst 6 tecken långt"
                    );
                  },
                },
              ]}
            >
              <Input.Password placeholder="Lösenord" />
            </Form.Item>

            <Form.Item style={{ textAlign: "center" }}>
              <Button
                id="submitButton"
                disabled={false}
                loading={isLoading}
                htmlType="submit"
              >
                Logga in!
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default Login;
