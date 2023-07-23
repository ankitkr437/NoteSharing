import styled from "styled-components";
import { mobile } from "../../responsive";
import { useDispatch, useSelector } from "react-redux";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { register } from "../../redux/apiCalls";
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
  ${mobile({paddingTop:"12vh" })}
`;
const TitleNav=styled.h1`
  font-size: 45px;
  font-weight: 200;
  text-align: center;
  margin-bottom: 3vh;
  ${mobile({textAlign:"center",fontSize:"35px",marginBottom:"1vh"})}
`
const Wrapper = styled.div`

  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" , marginTop:"2vh"})}
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  ${mobile({fontSize:"20px"})}
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  ${mobile({flexDirection:"column",flexWrap:"nowrap"})}
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  ${mobile({border:"1px solid brown"})}
`;

const Agreement = styled.span`
  font-size: 10px;
   margin-bottom: 20px;
   margin-top: 5px;
`;

const Button = styled.button`
  width: 40%;
  display: block;
  border: none;
  padding: 15px 20px;
  background-color: #3967bc;
  color: white;
  cursor: pointer;
  &:disabled {
    background-color: #223f74;
    cursor: not-allowed;
  }
`;
const LinkTag = styled.a`
  margin-top: 20px;
  font-size: 12px;
  display: block;
  text-decoration: none;
`;
const Error = styled.span`
  color: red;
`;

const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
 
  const dispatch = useDispatch();
  const { isFetching, error} = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    password=== confirmpassword ?
    register(dispatch,{
      firstname,lastname,username,email, password,
  }) : alert("password is not same")
  
}
   
  return (
    <Container>
       <TitleNav>NoteSharing</TitleNav>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input placeholder="first name" 
            onChange={(e) => setFirstname(e.target.value)}
            type="text"
            required
          />
          <Input placeholder="last name" 
           onChange={(e) => setLastname(e.target.value)}
           type="text"
           required
          />
          <Input placeholder="username" 
           onChange={(e) => setUsername(e.target.value)}
           type="text"
           required
          />
          <Input placeholder="email" 
           onChange={(e) => setEmail(e.target.value)}
           type="email"
           required
          />
          <Input placeholder="password" 
           onChange={(e) => setPassword(e.target.value)}
           type="password"
           required
          />
          <Input placeholder="confirm password" 
           onChange={(e) => setConfirmPassword(e.target.value)}
           type="password"
           required
          />
           <LinkTag>
          Already an user?
          <Link to="/login">
            <b>LOGIN</b>
          </Link>
          </LinkTag>
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={handleClick} disabled={isFetching}>CREATE</Button>
          {error && <Error>Something went wrong...</Error>}
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;