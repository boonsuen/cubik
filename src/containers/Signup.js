import React from 'react'
import { hot } from 'react-hot-loader'
import { Head } from 'react-static'

export default hot(module)(() => (
  <React.Fragment>
    <Head>
      <title>Sign Up</title>
    </Head>
    <div className="container">
      <div className="login">
        <h1 className="login__heading"> Welcome back!
          <small className="login__subheading">
            Enter your details below to log in.
          </small>
        </h1>
        <form className="login-form">
          <div className="login-form__group">
            <label className="login-form__label">Email</label>
            <input
              className="login-form__input" type="email" 
              placeholder="you@example.com" spellCheck="false" 
            />
          </div>
          <div className="login-form__group">
            <label className="login-form__label">Password</label>
            <input 
              className="login-form__input" type="password" 
              placeholder="Enter your password" spellCheck="false"
            />
          </div>
          <div className="login-login__actions">
            <button className="login-form__button" type="submit">Create Account</button>
          </div>
        </form>
      </div>
    </div>
  </React.Fragment>
))
