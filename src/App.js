import React from 'react';
import { Router, Link, Route, Head, Switch, Redirect } from 'react-static';
import Routes from 'react-static-routes';

import CubikApp from './components/CubikApp';
import './styles/App.scss'
import favicon from './img/favicon.png'
import firebase from './firebase/firebase';

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log('in');
    console.log(user);
  } else {
    console.log('now redirecting to /signout or /');
  }
});

class App extends React.Component {
  state = {
    loggedin: false
  }
  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Cubik</title>
          <link rel="icon" href={favicon} />
        </Head>
        <Router>
          <Switch>
            <Route path="/app" component={CubikApp} />
            {
              this.state.loggedin 
              && <Redirect to="/app" />
            }
            <React.Fragment>
              <div className="nav container">
                <Link exact to="/" className="logo">Cubik</Link>
                <nav className="nav__items">
                  <Link className="nav__item" to="/about">About</Link>
                  <Link className="nav__item" to="/blog">Blog</Link>
                  <Link className="nav__item" to="/login">Login</Link>
                  <Link className="nav__item" to="/signup">Signup</Link>
                </nav>
              </div>
              <div className="content">
                <Routes />
              </div>
              <div className="footer container">
                <Link to="/about">About</Link>
                <a href="https://twitter.com/SatoshiJS" target="_blank">Twitter</a>
              </div>
            </React.Fragment>
          </Switch>
        </Router>
      </React.Fragment>
    );
  };
}

export default App;

var user = firebase.auth().currentUser;
console.log(user);
let name, email, photoUrl, uid, emailVerified;

if (user != null) {
  name = user.displayName;
  console.log(name);
  email = user.email;
  console.log(email);
  photoUrl = user.photoURL;
  emailVerified = user.emailVerified;
  uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                   // this value to authenticate with your backend server, if
                   // you have one. Use User.getToken() instead.
}