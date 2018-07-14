import React from 'react'
import { Head } from 'react-static'

import { AuthContext } from '../App';
import { auth } from '../firebase/firebase';

class Login extends React.Component {
  state = {
    email: '',
    password: ''
  }
  handleLogin = (e) => {
    e.preventDefault();

    auth.signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {
      console.log('signin done!!');
    }).catch(function(error) {
      console.log('catch:', 'signInWithEmailAndPassword');
      const { code: errorCode, message: errorMessage } = error;
      console.log(errorCode, errorMessage);
    });
  }
  onEmailChange = (e) => {
    const email = e.target.value;
    this.setState({email})
  }
  onPasswordChange = (e) => {
    const password = e.target.value;
    this.setState(() => ({password}))
  }
  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Login</title>
        </Head>
        <div className="container">
          <div className="login">
            <h1 className="login__heading"> Welcome back!
              <small className="login__subheading">
                Enter your details below to log in.
              </small>
            </h1>
            <AuthContext.Consumer>
              {(toggleAuth) => (
                <form className="login-form" 
                  onSubmit={(event) => { 
                    this.handleLogin(event); 
                    toggleAuth();
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
                  <div className="login-login__actions">
                    <button className="login-form__button" type="submit">Log In</button>
                  </div>
                </form>
              )}
            </AuthContext.Consumer>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;