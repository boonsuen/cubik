import React from 'react';
import { Head, Link } from 'react-static';

import auth from '../firebase/auth';
import { AuthContext } from '../App';

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
        <div className="login">
          <h1 className="login__heading"> Welcome back!
            <small className="login__subheading">
              Enter your details below to log in.
            </small>
          </h1>
          <AuthContext.Consumer>
            {(toggleAuth) => (
              <form 
                className="login-form" 
                onSubmit={(e) => { 
                  this.handleLogin(e, toggleAuth);
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
                <div className="login__actions">
                  <button className="login-form__button" type="submit">Log In</button>
                  <div className="login-form__other-links">
                    <Link to="/signup">Don't have an account?</Link>
                    <Link to="/amnesia">Forgot password?</Link>
                  </div>
                </div>
              </form>
            )}
          </AuthContext.Consumer>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;