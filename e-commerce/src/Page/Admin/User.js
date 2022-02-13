import { Form, Input, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { addUser } from '../../redux/callApi';
import { useDispatch } from 'react-redux';


/* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
    },
};

const User = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };;
  const onAdd = async (value) => {
      addUser(dispatch, value);
      form.resetFields();
  }
    return (
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        initialValues={{ remember: true }}
        onFinish={onAdd}
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
          <PlusOutlined />Add User
          </Button>
        </Form.Item>
      </Form>
    );
  };

export default User;