import React from 'react';
import styled from 'styled-components';

const Body = styled.div`
  height: 100%;
  background: #f0f4ff;
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
`;

const Header = styled.header`
  h1 {
    color: #1a2e51;
    font-size: 35px;
  }
`;

const WhiteBox = styled.div`
  width: 100%;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(200, 200, 200, .5);
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
            <h2>Profile</h2>
            <label>Display Name</label>
            <input type="text" />
            <label>Email</label>
            <input type="email" />
            <label>Password</label>
            <input type="text" />
            <h2>Plans & Billings</h2>
            <div>There is no paid plan yet, feel free to use it while in beta.</div>
          </WhiteBox>
          <WhiteBox>
            <h2>Danger zone</h2>
            <div>Delete your account, all of the associated data will be removed, including all your links. You'll get a confirmation email first.</div>
            <button type="button">Delete Account</button>
          </WhiteBox>
        </Container>
      </Body>
    );
  }
}

export default AccountView;