import styled from "styled-components";
import { Table, Space } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Container = styled.div`
    padding: 50px 20% 0;
`

const Title = styled.h1`
    font-weight: bold;
`

const Button = styled.a`
`

const Admin = () => {
    const [data, setData] = useState([])
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
    return (
        <Container>
            <Title>Users management</Title>
            <Table rowKey={obj => obj._id} columns={columns} dataSource={data} />
        </Container>
    )
}

export default Admin;