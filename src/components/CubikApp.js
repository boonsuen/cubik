import React from "react";
import { Head } from "react-static";
import { BrowserRouter } from 'react-router-dom';
import Sidebar from "./Sidebar";
import Content from "./Content";

import { auth } from '../firebase/firebase';
import '../styles/App.scss';

import { AuthContext } from "../App";

class Loading extends React.Component {
  componentDidMount() {
    const loadFirebaseAuthState = new Promise((resolve, reject) => {
      auth.onAuthStateChanged(user => {
        if (user) {
          console.log('App.js: logged in', user);
          resolve(true);
        } else {
          console.log('App.js: logged out');
          resolve(false);
        }
        reject(new Error("Error loading onAuthStateChanged"));
      });
    });

    loadFirebaseAuthState.then((auth => {
      console.log(auth);
      this.props.doneLoadingFirebaseAuth(true);
      this.props.toggleAuth(auth, 'done');
    }));
  }
  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Loading...</title>
        </Head>
        <div className="loader-ctn">
          <div className="loader">
            <div className="loader-items"></div>
            <div className="loader-items loader__2"></div>
            <div className="loader-items loader__3"></div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

class CubikApp extends React.Component {
  doneLoadingFirebaseAuth = () => {
    this.setState({
      loadingFirebaseAuth: false
    });
  }
  componentDidMount() {}
  componentDidUpdate(prevProps, prevState, snapshot) {}
  state = {
    loadingFirebaseAuth: true
  }
  render() {
    return (
      <React.Fragment>
        <Head>
          <title>App</title>
        </Head>
        <AuthContext.Consumer>
        {({auth, firebaseAuth, toggleAuth}) => {
          return this.state.loadingFirebaseAuth 
            ? <Loading 
                loadingFirebaseAuth={this.state.loadingFirebaseAuth} 
                doneLoadingFirebaseAuth={this.doneLoadingFirebaseAuth}
                toggleAuth={toggleAuth}
              /> 
            : (
              <div className="app">
                <Sidebar lists={["JavaScript", "Open Source", "GraphQL"]} />
                <Content />
              </div>
            )
          }
        }
        </AuthContext.Consumer>
      </React.Fragment>
    );
  }
}

export default CubikApp;
