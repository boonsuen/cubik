import React from 'react';
import { Head } from 'react-static';

import auth from '../firebase/auth';
import { AuthContext } from '../App';
import '../styles/Signup.scss';

class Signup extends React.Component {
  state = {
    email: '',
    password: ''
  }
  handleSignup = (e, toggleAuth) => {
    e.preventDefault();
    auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => {
      toggleAuth(true, 'done');
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log('Signup error', errorCode, errorMessage);
    });
  }
  onEmailChange = (e) => {
    const email = e.target.value;
    this.setState(() => ({email}))
  }
  onPasswordChange = (e) => {
    const password = e.target.value;
    this.setState(() => ({password}))
  }
  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Sign Up</title>
        </Head>
        <div className="login">
          <h1 className="login__heading"> Sign Up
            <small className="login__subheading">
              Create an account and start collecting links today.
            </small>
          </h1>
          <AuthContext.Consumer>
            {(toggleAuth) => (
              <form 
                className="login-form" 
                onSubmit={(e) => { 
                  this.handleSignup(e, toggleAuth);
                }}
              >
                <div className="login-form__group">
                  <label className="login-form__label">Email</label>
                  <input
                    className="login-form__input" type="email" 
                    placeholder="you@example.com" spellCheck="false" 
                    onChange={this.onEmailChange}
                  />
                </div>
                <div className="login-form__group">
                  <label className="login-form__label">Password</label>
                  <input 
                    className="login-form__input" type="password" 
                    placeholder="Enter your password" spellCheck="false"
                    onChange={this.onPasswordChange}
                  />
                </div>
                <div className="signup-actions">
                  <button className="signup-form__button" type="submit">Create Account</button>
                </div>
              </form>
            )}
          </AuthContext.Consumer>          
        </div>
      </React.Fragment>
    );
  }
}

export default Signup;