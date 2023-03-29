import React, { useState, useContext } from 'react';
// import './Login.css'
//import styled, { css } from 'styled-components'
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { UserContext } from "../../contexts/user.context";


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
    console.log(redirect)

    const { setCurrentUser } = useContext(UserContext);

    // POST /api/admin/login
    const submit = async (e) => {
        console.log(redirect)
        e.preventDefault();
        // await axios.post('login', {
        //     email,
        //     password
        // }, {withCredentials: true})
        // .then(response => setCurrentUser(response?.data?.user))
        const { data } = await axios.post('login', {
            email,
            password
        }, {withCredentials: true})
        setCurrentUser(data?.user)

        setRedirect(true)
      
        if (redirect) {
            return navigate("/");
        } else {
            console.log('failed')
        }
    }
    return (
        <main className="form-signin">
            <form onSubmit={submit}>
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                <input type="email" className="form-control" placeholder="Email" required
                       onChange={e => setEmail(e.target.value)}
                />

                <input type="password" className="form-control" placeholder="Password" required
                       onChange={e => setPassword(e.target.value)}
                />

                <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
            </form>
        </main>
    )
};

export default SignIn;