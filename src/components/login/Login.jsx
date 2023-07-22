import React from 'react';
import './Login.css';
import { Form, Input, Button, Checkbox, Row, Col, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
// import Axios from 'axios';
import axios from '../../api/axios';
const backgroundImage = `/image/backgroundLogin.jpg`;
const loginImage = `/image/img_login.jpeg`;

function Login() {
  const navigation = useNavigate();

  const rd = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  const generate = () => {
    return rd() + rd() + '-' + rd() + '-' + rd() + rd() + '-' + rd();
  };

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    const { username, password } = values;

    let data = {
      username: username,
      password: password,
    };
    axios
      .post(`/auth/user/login`, data)
      .then((res) => {
        console.log('res ', res.data);
        let data = res.data.data;
        localStorage.setItem('token', `Bearer ${data.token}`);
        localStorage.setItem('userId', data.userId);
        console.log(localStorage.getItem('token'))
        notification.success({
          message: 'Log in successfully!',
          style: {
            borderRadius: 15,
            backgroundColor: '#b7eb8f',
          },
          duration: 2,
        });
        setTimeout(() => {
          navigation('/home');
        }, 300);
      })
      .catch((err) => {
        notification.error({
          message: 'Log in fail!',
          style: {
            borderRadius: 15,
            backgroundColor: '#fff2f0',
          },
          duration: 2,
        });
      });
  };

  return (
    <div
      className="wrap-container-login"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '100vh',
      }}
    >
      <Row>
        <Col span={12} style={{ marginTop: '100px', marginLeft: '20px' }}>
          <img
            src={loginImage}
            alt=""
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              opacity: '0.8',
            }}
          />
        </Col>
        <Col span={2}></Col>
        <Col
          span={8}
          style={{
            marginTop: '100px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '10%',
          }}
        >
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: false,
            }}
            style={{ minWidth: '300px' }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your Username!',
                },
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
              Or <Link to="/register">Register now!</Link>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
