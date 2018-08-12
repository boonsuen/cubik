import React from 'react';
import { Head } from 'react-static';

import auth from '../firebase/auth';

class Amnesia extends React.Component {
  state = {
    email: ''
  }
  handleSendResetEmail = () => {
    auth.sendPasswordResetEmail(this.state.email).then(function() {
      console.log('email sent');
    }).catch(function(error) {
      console.log(error, 'error happened');
    });
  }
  onEmailChange = (e) => {
    const email = e.target.value;
    this.setState({email});
  }
  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Forgot Password</title>
        </Head>
        <div style={{marginTop: '80px'}}>
          <h1>Reset your password</h1>
          <p>To reset your password, enter the email address you use to sign in.</p>
          <form 
            className="login-form" 
            onSubmit={(e) => { 
              e.preventDefault();
              this.handleSendResetEmail();
            }}
          >
            <div className="login-form__group">
              <label className="login-form__label">Email</label>
              <input 
                className="login-form__input" type="email" 
                placeholder="Enter your account's email" spellCheck="false"
                onChange={this.onEmailChange}
              />
            </div>
            <div className="login__actions">
              <button className="signup-form__button" type="submit">Get Reset Link</button>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
};

export default Amnesia;