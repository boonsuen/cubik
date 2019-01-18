import React from 'react';
import styled from 'styled-components';
import { withLastLocation } from 'react-router-last-location';

import { EmailAuthProviderCredential } from '../firebase/auth';
import { InitialDataContext } from './CubikApp';

import img_leftArrow from '../assets/img/icons/accountView/left-arrow.svg';
import img_accSetting from '../assets/img/icons/accountView/accsetting.svg';
import img_profile from '../assets/img/icons/accountView/profile.svg';

const Body = styled.div`
  width: 100%;
  min-height: 100%;
  padding: 50px 0;
  background: #f0f4ff;
  overflow: scroll;
`;

const Container = styled.div`
  width: 80%;
  max-width: 515px;
  margin: auto;
`;

const GoBack = styled.button`
  width: 132px;
  height: 44px;
  background: #fff;
  border-radius: 25px;
  color: #657084;

  img {
    margin-right: 5px;
  }

  div {
    margin-top: 2px;
  }
`;

const HeadingCtn = styled.div`
  display: flex;
  align-items: center;
  height: 142px;

  img {
    margin-right: 26px;
  }
`;

const Header = styled.header`
  h1 {
    color: #1a2e51;
    font-size: 35px;
  }
`;

const WhiteBox = styled.div`
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 20px;
  padding: 30px 45px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(200, 200, 200, .5);
`;

const H2 = styled.h2`
  margin: 0 0 15px 0;
  color: #151d4f;
  font-size: 30px;
  font-weight: 600;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #7c7f91;
  font-size: 18px;
  font-weight: 400;
`;

const DisplayNameForm = styled.form`
  display: flex;
  justify-content: space-between;
`;

const InputText = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 42px;
  margin-bottom: 20px;
  padding: 0 10px;
  border: 2px solid #dadfe6;
  border-radius: 4px;
  color: #657084;
  font-size: 16px;
  line-height: 42px;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #d9e1e2;
  }
`;

const SaveNameBtn = styled.button`
  width: 75px;
  height: 42px;
  margin-left: 20px;
  background: linear-gradient(317.39deg, #6171FF 0%, #927CFF 100%);	
  box-shadow: 0 2px 4px 0 rgba(218,215,238,0.5);
  color: #fff;
  font-size: 14px;
  line-height: 42px;
`;

const ChangePasswordBtn = styled.button`
  color: #828995;
  font-size: 14px;
  font-weight: 500;
  width: 162px;
  height: 42px;
  border: 1px solid #cbd4df;
  border-radius: 4px;
`;

const Description = styled.div`
  color: #828995;
  line-height: 1.3;
`;

const Separator = styled.div`
  height: 1px;
  background: #dfe7ef;
  width: 100%;
  margin: 22px 0;
`;

const H3 = styled.h3`
  margin: 0 0 10px 0;
  font-size: 25px;
  font-weight: 600;
`;

const DeleteAccBtn = styled.button`
  width: 150px;
  height: 42px;
  margin-top: 20px;
  border: 1px solid #ff9494;
  color: #eb5656;
  line-height: 42px;
`;

const ChangePasswordForm = styled.form`
  background-color: #fcfcff;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 4px rgba(212, 251, 255, 0.5);
  padding: 21px 38px;
  border-radius: 4px;

  label {
    color: #444b5e;
    margin-bottom: 3px;
  }

  input {
    font-size: 14px;
    height: 32px;
    border-radius: 4px;
    border: 1px solid #cbd4df;
    outline: none;
    padding: 0 10px;
    line-height: 32px;
    margin-bottom: 11px;
  }

  button {
    width: 80px;
    height: 32px;
    color: #697184;
    display: inline-block;
    margin-right: 10px;
    line-height: 32px;
    font-size: 14px;
    margin-top: 5px;

    &:first-child {
      background: #fff;
      box-shadow: 0 1px 4px #edebf2;
    }

    &:last-child {
      color: #fff;
      background: #995eff;
      box-shadow: 0 1px 4px #ffb8f1;
    }
  }
`;

class ChangePassword extends React.Component {
  state = {
    active: false,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };
  toggleActive = e => {
    this.setState(state => ({ active: !state.active }));
  };
  handleCurrPwChange = e => {
    this.setState({ currentPassword: e.target.value });
  };
  handleNewPwChange = e => {
    this.setState({ newPassword: e.target.value});
  }
  handleConPwChange = e => {
    this.setState({ confirmPassword: e.target.value});
  }
  handleSubmit = e => {
    e.preventDefault();
    const { 
      currentPassword,
      newPassword, 
      confirmPassword 
    } = this.state;
    const { user } = this.props;
    if (newPassword === confirmPassword) {
      const credential = EmailAuthProviderCredential(user.email, currentPassword);
      user.reauthenticateAndRetrieveDataWithCredential(credential).then(function() {
        console.log('user reauthenticated');
        user.updatePassword(newPassword).then(() => {
          console.log('password updated');
        }).catch(error => {
          console.log(error);
        });
      }).catch(error => {
        console.log(error);
      });
    } else {
      console.log('show error');
    };
  }
  render() {
    return (
      <React.Fragment>
      {
        this.state.active ? (
          <ChangePasswordForm onSubmit={this.handleSubmit}>
            <label>Current password</label>
            <input type="password" onChange={this.handleCurrPwChange} />
            <label>New password</label>
            <input type="password" onChange={this.handleNewPwChange} />
            <label>Confirm password</label>
            <input type="password" onChange={this.handleConPwChange} />
            <div>
              <button onClick={this.toggleActive} type="button">Cancel</button>
              <button type="submit">Update</button>
            </div>
            
          </ChangePasswordForm>
        ) : (
          <ChangePasswordBtn 
            onClick={this.toggleActive}
            type="button"
          >
            Change password
          </ChangePasswordBtn>
        )      
      }
      </React.Fragment>
    );
  }
}

class AccountView extends React.Component {
  handleChangeName = e => {
    e.preventDefault();
    const displayName = this.inputDisplayName.value.trim();
    this.props.user.updateProfile({
      displayName,
    }).then(() => {
      console.log('updated');
    }).catch(error => {
      console.log(error);
    });
  };
  render() {
    return (
      <Body>
        <Container>
          <Header>
            <GoBack type="button" onClick={() => {
              const { lastLocation } = this.props;
              console.log(lastLocation);
              if (lastLocation) {
                this.props.history.push(lastLocation.pathname);
              } else {
                this.props.history.push('/app');
              }
            }}>
              <img src={img_leftArrow} /><div>Go back</div>
            </GoBack>
            <HeadingCtn>
              <img src={img_accSetting} />
              <h1>Account Settings</h1>
            </HeadingCtn>
          </Header>
          <WhiteBox>
            <img src={img_profile} style={{marginBottom: "9px"}} />
            <H2>Profile</H2>
            <Label>Display Name</Label>
            <DisplayNameForm onSubmit={this.handleChangeName}>
              <InputText 
                type="text" defaultValue={this.props.user.displayName} 
                ref={el => this.inputDisplayName = el} 
                placeholder="What's your name?" 
              />
              <SaveNameBtn type="submit">Save</SaveNameBtn>
            </DisplayNameForm>
            <Label>Email</Label>
            <InputText 
              type="email" defaultValue={this.props.user.email} 
            />
            <Label>Password</Label>
            <ChangePassword user={this.props.user} />
            <Separator />
            <H2>Plans & Billings</H2>
            <Description>There is no paid plan yet, feel free to use it while in beta.</Description>
          </WhiteBox>        
          <WhiteBox>
            <H3>Danger zone</H3>
            <Description>Delete your account, all of the associated data will be removed, including all your links. You'll get a confirmation email first.</Description>
            <DeleteAccBtn type="button">Delete Account</DeleteAccBtn>
          </WhiteBox>
        </Container>
      </Body>
    );
  }
}

const AccountViewWithContext = props => (
  <InitialDataContext.Consumer>
    {({ userObj }) => (
      <AccountView {...props} user={userObj} />
    )}
  </InitialDataContext.Consumer>
);

export default withLastLocation(AccountViewWithContext);