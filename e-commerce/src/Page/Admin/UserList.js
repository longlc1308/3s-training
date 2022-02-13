import styled from "styled-components";
import './UserList.css';
import { Table } from 'antd';


const Title = styled.h1`
    font-weight: bold;
`

const User = ({columns, data}) => {
    return(
        <div>
            <Title>Users management</Title>
            <Table rowKey={obj => obj._id} columns={columns} dataSource={data} />
        </div>
    )
}

export default User;