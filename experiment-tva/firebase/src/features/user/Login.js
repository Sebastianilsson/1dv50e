import React, { useState, useEffect } from "react";
import validator from "validator";
import { Form, Row, Col, Input, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  authenticateUser,
  getIsAuthenticated,
  getAuthSolution,
} from "./userSlice";
import { Redirect } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(getIsAuthenticated);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const login = async (values) => {
    setErrorMessage("");
    setIsLoading(true);
    try {
      await dispatch(authenticateUser(values));
    } catch (e) {
      setErrorMessage(e.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      window.loginClick = performance.now();
      try {
        dispatch(
          authenticateUser({ email: "test@test.se", password: "testtest" })
        );
      } catch (e) {
        setErrorMessage(e.message);
        setIsLoading(false);
      }
    }, 4556);
  }, [dispatch]);

  useEffect(() => {
    window.firstRender = performance.now();
    getAuthSolution();
  }, []);

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

            {errorMessage !== "" && <div id="errorMessage">{errorMessage}</div>}

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
