import React from 'react';
import { Head, Link } from 'react-static';
import styled from 'styled-components';

import auth from '../firebase/auth';
import { AuthContext } from '../App';

export const StyledLogin = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 62px;
`;

export const LoginHeading = styled.h1`
  margin: 0 0 28px 0;
  text-align: center;
`;

export const LoginSubheading = styled.small`
  margin: 10px 0 10px 0;
  display: block;
  font-size: 16px;
  color: #535353;
  font-weight: 400;
`;

const LoginActions = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const AuthFormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0 23px 0;
`;

export const AuthFormLabel = styled.label`
  font-size: 16px;
  font-weight: 500;
  color: #102d3e;
  margin-bottom: 5px;
`;

export const AuthFormInput = styled.input`
  width: 342px;
  height: 48px;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid #c4c8d7;
  padding-left: 14px;
  transition: all 300ms;
  font-size: 14px;

  &:focus {
    border-color: #889fff;
    background-color: #fcfcff;
  }

  &:focus, &:active {
    outline: none;
  }

  &::placeholder {
    color: #d4d4df;
  }
`;

export const AuthFormButton = styled.button`
  background-color: #8096ff;
  color: #fff;
  width: 109px;
`;

const AuthFormOtherLinks = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: right;
  font-size: 14px;

  & a {
    color: #838391;

      &:hover {
        color: #3f3f69;
      }
    }
  }
`;

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    authSignin: 'initial'
  }
  handleLogin = (e, toggleAuth) => {
    e.preventDefault();
    this.setState({authSignin: 'loading'});
    auth.signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => {
      this.setState({authSignin: 'done'});
      toggleAuth(true, 'done');
    })
    .catch(function(error) {
      console.log('catch:', 'signInWithEmailAndPassword');
      const { code: errorCode, message: errorMessage } = error;
      console.log(errorCode, errorMessage);
    });
  }
  onEmailChange = (e) => {
    const email = e.target.value;
    this.setState({email});
  }
  onPasswordChange = (e) => {
    const password = e.target.value;
    this.setState({password});
  }
  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Login</title>
        </Head>
        <StyledLogin>
          <LoginHeading> Welcome back!
            <LoginSubheading>
              Enter your details below to log in.
            </LoginSubheading>
          </LoginHeading>
          <AuthContext.Consumer>
            {(toggleAuth) => (
              <form
                onSubmit={(e) => { 
                  this.handleLogin(e, toggleAuth);
                }}
              >
                <AuthFormGroup>
                  <AuthFormLabel htmlFor="email">Email</AuthFormLabel>
                  <AuthFormInput
                    type="email" placeholder="you@example.com" 
                    spellCheck="false" onChange={this.onEmailChange}
                    id="email"
                  />
                </AuthFormGroup>
                <AuthFormGroup>
                  <AuthFormLabel htmlFor="password">Password</AuthFormLabel>
                  <AuthFormInput 
                    type="password" placeholder="Enter your password" 
                    spellCheck="false" onChange={this.onPasswordChange}
                    id="password"
                  />
                </AuthFormGroup>
                <LoginActions>
                  <AuthFormButton type="submit">Log In</AuthFormButton>
                  <AuthFormOtherLinks>
                    <Link to="/signup">Don't have an account?</Link>
                    <Link to="/amnesia">Forgot password?</Link>
                  </AuthFormOtherLinks>
                </LoginActions>
              </form>
            )}
          </AuthContext.Consumer>
        </StyledLogin>      
      </React.Fragment>
    );
  }
}

export default Login;