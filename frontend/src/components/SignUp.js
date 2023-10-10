import React,{useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect (()=>{
    const auth = localStorage.getItem('user');
    if(auth)
    {
      navigate('/');
    }
  })


  const collectdata = async() => {
    console.log(name, email, password);
    let result = await fetch('http://localhost:5000/register' ,{
      method : 'post',
      body : JSON.stringify({name, email, password}),
      headers : {
        'Content-Type' : 'application/json'
      },
    });
    result = await result.json()
    console.log(result);
    localStorage.setItem("user" , JSON.stringify(result.result));
    localStorage.setItem("token" , JSON.stringify(result.auth));
    navigate('/')
    
  };

  return (
    <>
    <div className="register">
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Enter your Name"
        className="inputBox"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />

      <input
        type="text"
        placeholder="Enter your Email"
        className="inputBox"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />

      <input
        type="password"
        placeholder="Enter your Password"
        className="inputBox"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />

      <button className="appButton" onClick={collectdata}>Sign Up</button>
    </div>
    </>
  )
};

export default SignUp;
