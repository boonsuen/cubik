import React from "react";
import { Router, Link, Route, Head, Switch, Redirect } from "react-static";
import Routes from "react-static-routes";

import CubikApp from "./components/CubikApp";
import "./styles/App.scss";
import favicon from "./img/favicon.png";
import firebase from "./firebase/firebase";

export const AuthContext = React.createContext({
  auth: false,
  toggleAuth: () => {}
});

class App extends React.Component {
  toggleAuth = () => {
    this.setState(state => ({
      auth: !state.auth
    }));
    console.log('toggleAuth');
  }
  state = {
    auth: false,
    toggleAuth: this.toggleAuth
  }
  componentDidMount() {
    console.log('App mounted');
    const localAuth = JSON.parse(localStorage.getItem('localAuth'));
    if (localAuth) {
      console.log('lA is true, do something');
      this.setState({
        auth: true
      });
    } else if (!localAuth) {
      localStorage.setItem('localAuth', this.state.auth);
      this.setState({
        auth: false
      });
    };
    firebase.auth().onAuthStateChanged(user => {
      console.log('App.js:', 'onAuthStateChanged');
      if (user) {
        console.log('App.js:', 'user is logged in');
        console.log(user);
        this.setState({
          auth: true
        }, () => {
          console.log('setState and set lA')
          localStorage.setItem('localAuth', this.state.auth);
        });
      } else {
        console.log('App.js:', 'user is logged out');
        this.setState({
          auth: false
        }, () => {
          localStorage.setItem('localAuth', this.state.auth);
        });
      }
    });
  }
  render() {
    const { auth } = this.state;
    return (
      <React.Fragment>
        <Head>
          <link rel="icon" href={favicon} />
        </Head>
        <Router>
          <Switch>
            <React.Fragment>
              {auth
                ? ( 
                  <Switch>
                    <Route path="/app" component={CubikApp} />
                    <Route path="/" render={() => <Redirect to="/app" />} />
                  </Switch>
                ) : (
                  <React.Fragment>
                    <Route path="/app" render={() => (<Redirect to="/" />)} />
                    <div className="nav container">
                      <Link exact to="/" className="logo">
                        Cubik
                      </Link>
                      <nav className="nav__items">
                        <Link className="nav__item" to="/about">About</Link>
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
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;


