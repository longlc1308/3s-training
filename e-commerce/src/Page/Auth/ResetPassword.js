import styled from "styled-components";
import { resetPassword } from "../../redux/callApi";
import { Form, Input, Button } from 'antd';
import { useLocation } from "react-router-dom";
import './ResetPassword.css'

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

const ResetPassword = () => {
    const location = useLocation();
    const token = location.pathname.split('/')[2];
    const [form] = Form.useForm();
    const onFinish = (values) => {
      if(values.newPassword === values.confirmPassword){
        resetPassword(token, values);
        form.resetFields();
      }
      else {
          alert('Vui long xac nhan lai mat khau')
      }
    };
  
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
    return(
        <Container>
        <Wrapper>
          <Title>Reset Password</Title>
          <Form
            labelCol={{ span: 8 }}
            form={form}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="New Password"
              name="newPassword"
              rules={[{ required: true, message: 'Please input your new password!' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              rules={[{ required: true, message: 'Please input your new password!' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Submit
            </Button>
          </Form.Item>
          </Form>
        </Wrapper>
      </Container>
    )
}

export default ResetPassword;