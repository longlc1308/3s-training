import styled from "styled-components";
import { addUser } from "../../redux/callApi";
import "./Register.css";
import { Form, Input, Button } from 'antd';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
  },
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://vnn-imgs-f.vgcloud.vn/2021/08/17/17/iphone-13-pro-se-co-man-hinh-phu-o-mat-lung-2.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Register = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };;
  const onRegister = async (value) => {
    addUser(dispatch, value);
    form.resetFields();
  }
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form
        form={form}
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onRegister}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        validateMessages={validateMessages}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email" label="Email" rules={[{ type: 'email' }, { required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>
  
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
  
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
          Register
          </Button>
          &nbsp;&nbsp;
          <Button type="danger">
          <Link to='/login'>Back</Link>
          </Button>
        </Form.Item>
      </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;