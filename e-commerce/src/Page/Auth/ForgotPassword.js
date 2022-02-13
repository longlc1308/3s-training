import styled from "styled-components";
import { Link } from "react-router-dom";
import { forgotPassword } from "../../redux/callApi";
import { Form, Input, Button } from 'antd';
import './ForgotPassword.css'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://vnn-imgs-f.vgcloud.vn/2021/08/17/17/iphone-13-pro-se-co-man-hinh-phu-o-mat-lung.jpg")
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
  text-transform: uppercase;
`;

const ForgotPassword = () => {
    const [form] = Form.useForm();
    const onFinish = (values) => {
      forgotPassword(values);
      form.resetFields();
    };
  
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
    return(
        <Container>
        <Wrapper>
          <Title>Forgot Password</Title>
          <Form
            form={form}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Submit
            </Button>
            Or <Link to="/login">Sign in now!</Link>
          </Form.Item>
          </Form>
        </Wrapper>
      </Container>
    )
}

export default ForgotPassword;