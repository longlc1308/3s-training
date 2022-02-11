import styled from "styled-components";
import { useState } from "react";
import { signup } from "../redux/callApi";
import { DatePicker } from "antd";
import "./Register.css";

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

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const ButtonSignUp = styled.button`
  width: 40%;
  border: none;
  padding: 10px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  const dateFormat = 'YYYY/MM/DD';
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthday, setBirthday] = useState('');
  const handleSignup = (e) => {
    e.preventDefault();
    console.log(birthday);
    signup({ username, email, password });
  }
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input placeholder="name" onChange={(e) => setUserName(e.target.value)}  />
          <Input placeholder="email" onChange={(e) => setEmail(e.target.value)}  />
          <Input placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)} />
          <DatePicker placeholder="birthday" onChange={(e) => setBirthday(e._d.getDate() + '/' + (e._d.getMonth() + 1) + '/' + e._d.getFullYear())} format={dateFormat}/>
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <ButtonSignUp onClick={handleSignup}>CREATE</ButtonSignUp>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;