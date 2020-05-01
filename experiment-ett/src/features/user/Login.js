import React, { useState, useEffect } from "react";
import validator from "validator";
import { Form, Row, Col, Input, Button } from "antd";

const Login = () => {
  const [form] = Form.useForm();
  const [loginTime, setLoginTime] = useState(0);
  const setFocus = React.createRef();
  let startTime = null;
  let endTime = null;

  useEffect(() => {
    startTime = performance.now();
    setFocus.current.focus();
  }, []);

  const login = async (values) => {
    endTime = performance.now();
    setLoginTime(endTime - startTime);
  };

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
              <Input placeholder="Email" ref={setFocus} />
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

            {loginTime > 0 && <h2 align="center">Tid: {loginTime} ms</h2>}

            <Form.Item style={{ textAlign: "center" }}>
              <Button disabled={false} htmlType="submit">
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
