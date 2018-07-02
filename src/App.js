import React from "react";
import { Router, Link, Route, Head, Switch, Redirect } from "react-static";
import Routes from "react-static-routes";

import CubikApp from "./components/CubikApp";
import "./styles/App.scss";
import favicon from "./img/favicon.png";
import firebase from "./firebase/firebase";

export const AuthContext = React.createContext({
  authState: false,
  toggleAuth: () => {}
});

class App extends React.Component {
  toggleAuth = () => {
    this.setState(state => ({
      authState: !state.authState
    }));
  }
  state = {
    authState: false,
    firebaseGotAuthState: false,
    toggleAuth: this.toggleAuth
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      console.log('App.js:', 'onAuthStateChanged');
      if (user) {
        console.log('App.js:', 'user is logged in');
        console.log(user);
        this.setState(() => ({
          authState: true,
          firebaseGotAuthState: true
        }));
      } else {
        console.log('App.js:', 'user is logged out');
        this.setState(() => ({
          authState: false,
          firebaseGotAuthState: true
        }));
      }
    });
  }
  render() {
    const { authState, firebaseGotAuthState } = this.state;
    return (
      <React.Fragment>
        <Head>
          <title>Cubik</title>
          <link rel="icon" href={favicon} />
        </Head>
        <Router>
          <Switch>
            {firebaseGotAuthState ? (
                <React.Fragment>
                  {authState 
                    ? ( 
                      <Switch>
                        <Route path="/app" component={CubikApp} />
                        <Route path="/" render={() => <Redirect to="/app" />} />
                      </Switch>
                    ) : (
                      <React.Fragment>
                        <div className="nav container">
                          <Link exact to="/" className="logo">
                            Cubik
                          </Link>
                          <nav className="nav__items">
                            <Link className="nav__item" to="/about"> About</Link>
                            <Link className="nav__item" to="/blog">Blog</Link>
                            <Link className="nav__item" to="/login">Login</Link>
                            <Link className="nav__item" to="/signup">Signup</Link>
                          </nav>
                        </div>
                        <div className="content">
                          <AuthContext.Provider value={this.state.toggleAuth}>
                            <Routes />
                          </AuthContext.Provider>
                        </div>
                        <div className="footer container">
                          <Link to="/about">About</Link>
                          <a href="https://twitter.com/SatoshiJS" target="_blank">Twitter</a>
                        </div>
                      </React.Fragment>
                    )
                  }
                </React.Fragment>
              ) : (
                <React.Fragment>it's loading!!!</React.Fragment>
              )
            }
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;


