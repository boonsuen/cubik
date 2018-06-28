import React from 'react'
import { Head } from 'react-static'

import firebase from '../firebase/firebase';
import '../styles/Signup.scss';

class Signup extends React.Component {
  state = {
    email: '',
    password: '',
  }
  createUser = (email, password) => {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
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
    const {email, password} = this.state;
    return (
      <React.Fragment>
        <Head>
          <title>Sign Up</title>
        </Head>
        <div className="container">
          <div className="login">
            <h1 className="login__heading"> Sign Up
              <small className="login__subheading">
                Create an account and start collecting links today.
              </small>
            </h1>
            <form className="login-form" onSubmit={this.createUser(email, password)}>
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
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Signup;