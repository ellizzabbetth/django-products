import React, { Component } from 'react';
//import '../Login.css';
import axios from 'axios';
import styled, { css } from 'styled-components'
import { Navigate } from 'react-router-dom';


// TODO convert to hook from class component
class Register extends Component {
 
    // first_name = '';
    // last_name = '';
    // email = '';
    // password = '';
    // password_confirm = '';
    // //phone_number = '';
    state = {
        redirect: false
    };

    submit = async (e) => {
        e.preventDefault();
        // localhost:8000/api/admin/register
        await axios.post('register', {
            name: this.name,
            //last_name: this.last_name,
            email: this.email,
            password: this.password,
            password_confirm: this.password_confirm,
        });

        this.setState({
            redirect: true
        });
    }
    render() {
        if (this.state.redirect) {
            return <Navigate to={'/sign-in'} />;
        }
        return (
            <StyledMain>
                 <form onSubmit={this.submit}>
                    <h1 className="h3 mb-3 fw-normal">Please register</h1>

                    <input className="form-control" placeholder="Name" required
                           onChange={e => this.name = e.target.value}
                    />

                    {/* <input className="form-control" placeholder="Last Name" required
                           onChange={e => this.last_name = e.target.value}
                    /> */}

                    <input type="email" className="form-control" placeholder="Email" required
                           onChange={e => this.email = e.target.value}
                    />

                    <input type="password" className="form-control" placeholder="Password" required
                           onChange={e => this.password = e.target.value}
                    />

                    <input type="password" className="form-control" placeholder="Password Confirm" required
                           onChange={e => this.password_confirm = e.target.value}
                    />

                    {/* <input type="tel" className="form-control" placeholder="Phone Number" required
                           onChange={e => this.phone_number = e.target.value}
                    /> */}

                    <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
                </form>
            </StyledMain>
        )
    }
}

export default Register;

const StyledMain = styled.main`
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
`;

const StyledCheckbox = styled.input`
    font-weight: 400;
`;

const StyledFormControl = styled.input`
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
    &:focus {
        z-index: 2;
    }
`;


const InputEmail = styled(StyledFormControl).attrs({ type: 'email' })`
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  &:focus {
      z-index: 2;
  }
}
`;
const InputPassword = styled(StyledFormControl).attrs({ type: 'password' })`
margin-bottom: 10px;
border-top-left-radius: 0;
border-top-right-radius: 0;
&:focus {
    z-index: 2;
}
}
`;