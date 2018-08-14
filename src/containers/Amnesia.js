import React from 'react';
import { Head } from 'react-static';

const ResetPasswordButton = AuthFormButton.extend`
  width: 155px;
`;

import auth from '../firebase/auth';
import {
  AuthFormGroup,
  AuthFormLabel,
  AuthFormInput,
  AuthFormButton
} from './Login';

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
            onSubmit={(e) => { 
              e.preventDefault();
              this.handleSendResetEmail();
            }}
          >
            <AuthFormGroup>
              <AuthFormLabel>Email</AuthFormLabel>
              <AuthFormInput 
                type="email" placeholder="Enter your account's email" 
                spellCheck="false" onChange={this.onEmailChange}
              />
            </AuthFormGroup>
            <ResetPasswordButton type="submit">Get Reset Link</ResetPasswordButton>
          </form>          
        </div>
      </React.Fragment>
    );
  }
};

export default Amnesia;