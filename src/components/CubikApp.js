import React from "react";
import { Head } from "react-static";
import Sidebar from "./Sidebar";
import Content from "./Content";

import firebase from '../firebase/firebase';

import { AuthContext } from "../App";
import { getLocalItem } from '../localStorage/localStorage';

class Loading extends React.Component {
  componentDidMount() {
    console.log('Loading mounted');

    const loadFirebaseAuthState = new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          console.log('App.js logged in', user);
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
        { this.props.loadingFirebaseAuth ? 'Loading...' : <CubikApp /> }
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
  componentDidMount() {
    console.log('CubikApp mounted');
  }
  componentDidUpdate() {
    console.log('CubikApp updated');
  }
  state = {
    loadingFirebaseAuth: true
  }
  render() {
    return (
      <React.Fragment>
        <Head>
          <link href="/style.css" rel="stylesheet" />
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
                <Sidebar />
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
