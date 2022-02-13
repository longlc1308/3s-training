import styled from "styled-components";
import './Admin.css';
import { useEffect, useState } from 'react';
import { Layout, Menu, Space } from 'antd';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { persistor } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import UserList from './UserList';
import User from './User';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, deleteUser, updateUser } from '../../redux/callApi';
import { Modal, Form, Input, Select } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
const { Header, Sider, Content, Footer } = Layout;
const { Option } = Select;


const Logo = styled.h1`
    font-weight: bold;
    color: white;
    font-size: 24px;
`;

const Img = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 1rem;
`

const Admin = () => {
    const [dataEdit, setDataEdit] = useState(null);
    const [edit, setEdit] = useState(false)
    const dispatch = useDispatch();
    let navigate = useNavigate();
    useEffect(() => {
        getUsers(dispatch);
    },[dispatch])
    const handleDelUser = async (record) => {
      deleteUser(dispatch, record._id)
    }
    const data = useSelector(state => state.user.users)
    const columns = [
       {
         title: 'Name',
         dataIndex: 'username',
         key: '1',
       },
       {
         title: 'Email',
         dataIndex: 'email',
         key: '2',
       },
       {
         title: 'Role',
         dataIndex: 'role',
         key: '3',
       },
       {
         title: 'Action',
         key: '4',
         render: (record) => (
           <Space size="middle">
             <EditOutlined
              onClick={() => onEditUser(record)}
            />
            <DeleteOutlined
              onClick={() => handleDelUser(record)}
              style={{ color: "red", marginLeft: 12 }}
            />
           </Space>
         ),
       },
    ];
    const handleLogout = () => {
      persistor.purge();
      navigate('/');
      window.location.reload();
    }

    const onEditUser = (record) => {
      setEdit(true);
      setDataEdit({ ...record });
    };
    const resetEditing = () => {
      setEdit(false);
      setDataEdit(null);
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
          >
            <div className="logo"><Logo>Minastik.</Logo></div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1" icon={<UserOutlined />}>
                User
              </Menu.Item>
              <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                Product
              </Menu.Item>
              <Menu.Item key="3" icon={<UploadOutlined />}>
                Others
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }}>
            <div className="user-wrapper">
              <Img src={'https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png'} />
              <div>
                <h4>Admin</h4>
                <small><span onClick={() => handleLogout()}>Logout</span></small>
              </div>
            </div>
            </Header>
            <Content
              className="site-layout-background"
              style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
              }}
            >
              <UserList columns={columns} data={data}/>
              <User />
              <Modal
                title="Edit User"
                visible={edit}
                okText="Save"
                onCancel={() => {
                  resetEditing();
                }}
                onOk={() => {
                  updateUser(dispatch, dataEdit)
                  resetEditing();
                }}
              >
                <Form>
                <Form.Item
                  label="Username"                >
                  <Input value={dataEdit?.username}
                  onChange={(e) => {
                    setDataEdit((pre) => {
                      return { ...pre, username: e.target.value };
                    });
                  }} />
                </Form.Item>
                <Form.Item
                  label="Email"
                >
                <Input
                  value={dataEdit?.email}
                  onChange={(e) => {
                    setDataEdit((pre) => {
                      return { ...pre, email: e.target.value };
                    });
                  }}
                />
                </Form.Item>
                <Form.Item
                  label="Role"
                >
                <Select
                  value={dataEdit?.role}
                  placeholder="Select a option and change input text above"
                  onChange={(e) => {
                    setDataEdit((pre) => {
                      return { ...pre, role: e.target.value };
                    });
                  }}
                  allowClear
                >
                  <Option value="admin">admin</Option>
                  <Option value="member">member</Option>
                </Select>
                </Form.Item>
                </Form>
              </Modal>
            </Content>
            <Footer style={{ textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>
        </Layout>
    )
}

export default Admin;