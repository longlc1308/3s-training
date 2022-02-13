import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/callApi";

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

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 10px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Aclink = styled.p`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const handleLogin = (e) => {
    e.preventDefault();
    login(dispatch, { email, password });
  }
  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)}/>
          <Button onClick={handleLogin}>LOGIN</Button>
          <Aclink><Link to="/forgot-password" style={{textDecoration: "none", color: "black"}}>DO NOT YOU REMEMBER THE PASSWORD?</Link></Aclink>
          <Aclink><Link to="/register" style={{textDecoration: "none", color: "black"}}>CREATE A NEW ACCOUNT</Link></Aclink>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;