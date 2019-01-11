import React from 'react';
import styled from 'styled-components';

const Body = styled.div`
  width: 100%;
  min-height: 100%;
  padding-top: 50px;
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
`;

const Header = styled.header`
  h1 {
    color: #1a2e51;
    font-size: 35px;
  }
`;

const WhiteBox = styled.div`
  width: 100%;
  margin-bottom: 20px;
  padding: 30px 45px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(200, 200, 200, .5);
`;

const H2 = styled.h2`
  color: #151d4f;
  font-size: 30px;
  font-weight: 600;
`;

const Label = styled.label`
  display: block;
  color: #7c7f91;
  font-size: 18px;
  font-weight: 500;
`;

const InputText = styled.input`
  box-sizing: border-box;
  height: 42px;
  border: 2px solid #dadfe6;
  border-radius: 4px;
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
`;

const H3 = styled.h3`
  font-size: 25px;
  font-weight: 600;
`;

const DeleteAccBtn = styled.button`
  width: 150px;
  height: 42px;
  border: 1px solid #ff9494;
  color: #eb5656;
`;

class AccountView extends React.Component {
  render() {
    return (
      <Body>
        <Container>
          <Header>
            <GoBack type="button" onClick={() => {
              this.props.history.goBack();
            }}>
              Go back
            </GoBack>
            <h1>Account Settings</h1>
          </Header>
          <WhiteBox>
            <H2>Profile</H2>
            <Label>Display Name</Label>
            <InputText type="text" />
            <Label>Email</Label>
            <InputText type="email" />
            <Label>Password</Label>
            <ChangePasswordBtn type="button">Change password</ChangePasswordBtn>
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

export default AccountView;