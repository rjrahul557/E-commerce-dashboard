import React, { useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ()=> {

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

    const collectdata = async() =>  {
        console.log(email,password);
        let result = await fetch("http://localhost:5000/login",{
            method:'post',
            body:JSON.stringify({email,password}),
            headers : {
                'Content-Type' : 'application/json'
              },
        });
        result = await result.json();
        console.log(result);

        if(result.auth)
        {
            localStorage.setItem("user",JSON.stringify(result.users));
            localStorage.setItem("token",JSON.stringify(result.auth));
            
            navigate('/');
        }
        else{
            console.log("please Enter correct details")
        }
    }

    return (
        <div className='login'>
            <h1>Login</h1>
            <input 
            className ='inputBox'
            type = 'text' 
            placeholder='Enter your email'
            value = {email}
            onChange = {(e)=>{
                setEmail(e.target.value);
            }}
            />

            <input 
            className ='inputBox' 
            type ='password' 
            placeholder='Enter your password'
            value={password}
            onChange={(e) => {
                setPassword(e.target.value);
            }}
            />

            <button onClick = {collectdata} className="appButton" type='button'>Login</button>
         
        </div>
    )
}

export default Login;