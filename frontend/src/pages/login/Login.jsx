import { useState } from "react";
import styled from "styled-components";
import { login } from "../../redux/apiCalls";
import { mobile } from "../../responsive.js";
import { useDispatch, useSelector } from "react-redux";
import {Link} from 'react-router-dom'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  /* background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://img.freepik.com/free-vector/online-document-concept-illustration_114360-5453.jpg?w=900&t=st=1673501437~exp=1673502037~hmac=f7a813ace48ce8a1ce1be58c1d1507746faa24876235b9c94f44584380ed1cd5")
      center; */
  background-repeat: no-repeat;
  background-size: contain;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
`;
const TitleNav=styled.h1`
  font-size: 45px;
  font-weight: 200;
  text-align: center;
  margin-bottom: 3vh;
`
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
  ${mobile({border:"1px solid brown"})}
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: #3967bc;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    background-color: #27457e;
    cursor: not-allowed;
  }
`;

const LinkTag = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: none;
`;

const Error = styled.span`
  color: #3f76e5;
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { currentUser, isFetching, error } = useSelector((state) => state.user);
  
  
  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { email, password });
  };
  return (
    <Container>
      <TitleNav>NoteSharing</TitleNav>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button onClick={handleClick} disabled={isFetching}>
            LOGIN
          </Button>
          {error && <Error>Something went wrong...</Error>}

          < LinkTag>
          Need an account
          <Link to="/register" style={{textDecoration:"none"}}>
           <b style={{marginLeft:"5px"}}>SIGN UP</b>
          </Link>
          </ LinkTag>
          < LinkTag>
          <Link to="/">
           <b>Skip</b>
          </Link>
          </ LinkTag>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;