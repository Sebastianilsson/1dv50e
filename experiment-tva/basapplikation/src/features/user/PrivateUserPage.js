import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getIsAuthenticated, getUserEmail, logoutUser } from "./userSlice";
import { Button, Col, Row } from "antd";

const PrivateUserPage = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(getIsAuthenticated);
  const userEmail = useSelector(getUserEmail);

  useEffect(() => {
    window.privatePageRendered = performance.now();
  }, []);

  const logout = async (e) => {
    e.preventDefault();
    await dispatch(logoutUser());
  };

  if (!isAuthenticated) return <Redirect to={"/"} />;
  return (
    <Row
      type="flex"
      justify="center"
      align="middle"
      style={{ marginTop: "5%" }}
    >
      <Col>
        <div className="card">
          <h2 align="center">
            Hej {userEmail}! <br /> Det här är din privata sida
          </h2>
          <Button onClick={logout}>Logga ut</Button>
        </div>
      </Col>
    </Row>
  );
};

export default PrivateUserPage;
