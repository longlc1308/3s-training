import styled from "styled-components";
import './Admin.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Layout, Menu, Table, Space } from 'antd';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { persistor } from '../redux/store';
import { useNavigate } from 'react-router-dom';
const { Header, Sider, Content, Footer } = Layout;


const Logo = styled.h1`
    font-weight: bold;
    color: white;
    font-size: 24px;
`;

const Title = styled.h1`
    font-weight: bold;
`

const Button = styled.a`
`

const Img = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 1rem;
`

const Admin = () => {
    const [data, setData] = useState([]);
    let navigate = useNavigate();
    useEffect(() => {
        const getUsers = async () => {
         try {
             const res = await axios.get('http://localhost:5000/api/users')
             setData(res.data)
         } catch (error) {
             
         }
        }
        getUsers();
    }, [])
    const handleDelUser = async (record) => {
        try {
            await axios.delete('http://localhost:5000/api/users/' + record._id);
            setData((prev) => {
                return prev.filter((user) => user._id !== record._id)
            })
        } catch (error) {
            
        }
    }
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
         render: (text, record) => (
           <Space size="middle">
             <Button>Edit</Button>
             <Button onClick={() => handleDelUser(record)}>Delete</Button>
           </Space>
         ),
       },
    ];
    const handleLogout = () => {
      persistor.purge();
      navigate('/')
    }
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
              <Title>Users management</Title>
              <Table rowKey={obj => obj._id} columns={columns} dataSource={data} />
            </Content>
            <Footer style={{ textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>
        </Layout>
    )
}

export default Admin;