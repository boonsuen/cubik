import React from "react";
import { Router, Link, Route, Head, Switch, Redirect } from "react-static";
import Routes from "react-static-routes";

import CubikApp from "./components/CubikApp";
import "./styles/App.scss";
import favicon from "./img/favicon.png";
import firebase from "./firebase/firebase";

firebase.auth().onAuthStateChanged(user => {
  console.log('App.js:', 'onAuthStateChanged');
  if (user) {
    console.log('App.js:', 'user is logged in');
  } else {
    console.log('App.js:', 'user is logged out');
  }
});

const AuthContext = React.createContext(true);

class App extends React.Component {
  state = {
    loggedIn: false
  };
  render() {
    const { loggedIn } = this.state;
    return (
      <React.Fragment>
        <Head>
          <title>Cubik</title>
          <link rel="icon" href={favicon} />
        </Head>
        <Router>
          <Switch>
            <Route path="/app" render={() => (
              loggedIn ? <CubikApp /> : <Redirect to="/login" />
            )} />
            {loggedIn && <Redirect to="/app" />}
            <React.Fragment>
              <div className="nav container">
                <Link exact to="/" className="logo">
                  Cubik
                </Link>
                <nav className="nav__items">
                  <Link className="nav__item" to="/about">
                    About
                  </Link>
                  <Link className="nav__item" to="/blog">
                    Blog
                  </Link>
                  <Link className="nav__item" to="/login">
                    Login
                  </Link>
                  <Link className="nav__item" to="/signup">
                    Signup
                  </Link>
                </nav>
              </div>
              <div className="content">
                <Routes />
              </div>
              <div className="footer container">
                <Link to="/about">About</Link>
                <a href="https://twitter.com/SatoshiJS" target="_blank">
                  Twitter
                </a>
              </div>
            </React.Fragment>
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;


