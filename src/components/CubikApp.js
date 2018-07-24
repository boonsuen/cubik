// state = {
//   loadingFirebaseAuth: true,
//   user: {
//     id: ''
//   },
//   lists: [],
//   currentList: {
//     id: 'dheuhe',
//     title: 'GraphQL',
//     ungrouppedLinks: [{}],
//     sublists: [{
//       id: 'jiajia',
//       title: 'Learn GraphQL',
//       links: [{
//         id: 'cnene',
//         title: 'An Introduction to GraphQL',
//         url: 'https://flaviocopes.com/graphql-guide/'
//       }, {
//         id: 'dede',
//         title: 'GraphQL: Everything You Need to Know',
//         url: 'https://medium.com/@weblab_tech/graphql-everything-you-need-to-know-58756ff253d8'
//       }]
//     }]
//   }
// }

import React from "react";
import { Head } from "react-static";
import { BrowserRouter } from 'react-router-dom';
import Sidebar from "./Sidebar";
import Content from "./Content";

import { auth, db } from '../firebase/firebase';
import '../styles/App.scss';

import { AuthContext } from "../App";

export const DataContext = React.createContext({});

class Loading extends React.Component {
  componentDidMount() {
    const loadFirebaseAuthState = new Promise((resolve, reject) => {
      auth.onAuthStateChanged(user => {
        let status = 'unverified';
        if (user) {
          status = 'verified';
          console.log('App.js: logged in', user);
          db.collection(`/users/${user.uid}/lists`).get().then((querySnapshot) => {
            resolve({auth: true, id: user.uid});
            let lists = [];
            querySnapshot.forEach((doc) => {
              lists.push({...doc.data(), id: doc.id});
            });
            this.props.initLists(lists);
          });
        } else {
          status = 'verified';
          console.log('App.js: logged out');
          resolve({auth: false});
        }
        status === 'unverified' && reject(new Error("Error loading data, please try again!"));
      });
    });

    loadFirebaseAuthState.then((user => {
      this.props.doneLoadingFirebaseAuth(!user.auth, user.id);
      this.props.toggleAuth(user.auth, 'done');
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
  doneLoadingFirebaseAuth = (auth, userId) => {
    this.setState({
      loadingFirebaseAuth: auth,
      user: {
        id: userId
      }
    });
  }
  initLists = (lists) => {
    console.log('lists', lists);
    this.setState({
      lists: lists.sort((a, b) => a.order - b.order)
    });
  }
  componentDidMount() {}
  componentDidUpdate(prevProps, prevState, snapshot) {}
  state = {
    loadingFirebaseAuth: true,
    user: {
      id: ''
    },
    lists: [],
    currentList: {
      id: 'dheuhe',
      title: 'GraphQL',
      ungrouppedLinks: [{}],
      sublists: [{
        id: 'jiajia',
        title: 'Learn GraphQL',
        links: [{
          id: 'cnene',
          title: 'An Introduction to GraphQL',
          url: 'https://flaviocopes.com/graphql-guide/'
        }, {
          id: 'dede',
          title: 'GraphQL: Everything You Need to Know',
          url: 'https://medium.com/@weblab_tech/graphql-everything-you-need-to-know-58756ff253d8'
        }]
      }]
    }
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
                initLists={this.initLists} 
                doneLoadingFirebaseAuth={this.doneLoadingFirebaseAuth}
                toggleAuth={toggleAuth}
              /> 
            : (
              <DataContext.Provider value={{
                user: {
                  id: this.state.user.id
                },
                lists: this.state.lists, 
                currentList: this.state.currentList
              }}>             
                <div className="app">
                  <Sidebar
                    toggleAuth={toggleAuth}
                  />
                  <Content />
                </div> 
              </DataContext.Provider>
            )
          }
        }
        </AuthContext.Consumer>
      </React.Fragment>
    );
  }
}

export default CubikApp;
