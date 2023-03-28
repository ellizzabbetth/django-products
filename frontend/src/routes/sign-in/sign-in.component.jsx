import React, { useState } from 'react';
// import './Login.css'
//import styled, { css } from 'styled-components'
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';


// const StyledMain = styled.main`
//     width: 100%;
//     max-width: 330px;
//     padding: 15px;
//     margin: auto;
// `;

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    let navigate = useNavigate();


    const submit = async (e) => {
        console.log('here')
        e.preventDefault();
        await axios.post('login', {
            email,
            password
        }, {withCredentials: true});
    
        setRedirect(true)
      
        if (redirect) {
            return navigate("/");
        } else {
            console.log('failed')
        }
    }
    return (
        <main className="form-signin w-100 m-auto">
            <form onSubmit={submit}>
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                <div className="form-floating">
                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                    <label for="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                    <label for="floatingPassword">Password</label>
                </div>

                <div className="checkbox mb-3">
                    <label>
                        <input type="checkbox" value="remember-me"/> Remember me
                    </label>
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                <p className="mt-5 mb-3 text-body-secondary">&copy; 2017–2023</p>
            </form>
        </main>
    );
};

export default SignIn;