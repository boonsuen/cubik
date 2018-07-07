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

const loadLocal = () => {
  try {
    const localAuth = localStorage.getItem('localAuth');
    if (localAuth === null) {
      return false;
    }
    return JSON.parse(localAuth);
  } catch (err) {
    return undefined
  }
}

class App extends React.Component {
  toggleAuth = (auth, firebaseAuth) => {
    this.setState({
      auth,
      firebaseAuth
    }, () => {
      localStorage.setItem('localAuth', this.state.auth);
    });
    console.log('toggleAuth');
  }
  state = {
    auth: loadLocal(),
    firebaseAuth: 'initial',
    toggleAuth: this.toggleAuth
  }
  componentDidMount() {
    console.log('App mounted');
    console.log(this.state);
    // if (this.state.localAuth) {
    //   this.setState({auth: true});
    // }
  }
  componentDidUpdate(prevProps, prevState) {
    console.log(this.state, prevState);
    // if (this.state.localAuth !== prevState.localAuth && this.state.localAuth) {
    //   console.log('lA is true, do something');
    //   this.setState({
    //     auth: true
    //   });
    // } else if (this.state.localAuth !== prevState.localAuth && !this.state.localAuth) {
    //   localStorage.setItem('localAuth', false);
    //   this.setState({
    //     auth: false
    //   });
    // }
  }
  render() {
    const { auth, firebaseAuth } = this.state;
    return (
      <React.Fragment>
        <Head>
          <title>Cubik</title>
          <link rel="icon" href={favicon} />
        </Head>
        <Router>
          <Switch>
            <Route path="/app" render={() => {
              if (firebaseAuth === 'done') {
                return auth
                  ? <CubikApp />
                  : <Redirect to="/login" />
              } else if (firebaseAuth === 'loading' || firebaseAuth === 'initial') {
                return (
                  <AuthContext.Provider value={this.state}>
                    <CubikApp />
                  </AuthContext.Provider>
                );
              }
            }} />
            {auth && <Route path="/" render={() => <Redirect to="/app" />} />}
            <React.Fragment>
              <div className="nav container">
                <Link exact to="/" className="logo">Cubik</Link>
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
              <div className="container">
                <AuthContext.Provider value={this.state.toggleAuth}>
                  <Routes />
                </AuthContext.Provider>
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