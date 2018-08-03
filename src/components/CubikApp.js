import React from "react";
import { Head } from "react-static";
import Sidebar from "./Sidebar";
import Content from "./Content";

import { auth } from '../firebase/auth';
import { db } from '../firebase/db';
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
            let lists = [];
            querySnapshot.forEach((doc) => {
              lists.push({...doc.data(), id: doc.id});
            });
            if (this.props.routeListId !== '/app') {
              db.collection(`/users/${user.uid}/lists/${this.props.routeListId}/links`).get().then((querySnapshot) => {
                let links = [];
                querySnapshot.forEach((doc) => {
                  console.log(doc.id, doc.data());
                  links.push({...doc.data(), id: doc.id});
                });
                resolve({auth: true, id: user.uid, lists, links});
              });
            } else {
              resolve({auth: true, id: user.uid, lists});
            }
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
      this.props.doneLoadingFirebaseAuth(!user.auth, user.id, user.lists, user.links);
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
  doneLoadingFirebaseAuth = (auth, userId, lists, links) => {
    this.setState({
      loadingFirebaseAuth: auth,
      user: {
        id: userId
      },
      lists: lists.sort((a, b) => a.order - b.order),
      links
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
    links: [],
    allLinks: {
      id: 'allLinks',
      ungrouppedLinks: [{}],
      sublists: [{
        id: 'allLinksSublist',
        title: 'Home GraphQL',
        links: [{
          id: 'cnene',
          title: 'Introduction to GraphQL',
          url: 'https://flaviocopes.com/graphql-guide/'
        }, {
          id: 'dede',
          title: 'Everything You Need to Know about GraphQL',
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
                doneLoadingFirebaseAuth={this.doneLoadingFirebaseAuth}
                toggleAuth={toggleAuth}
                routeListId={this.props.routeListId}
              /> 
            : (
              <DataContext.Provider value={{
                user: {
                  id: this.state.user.id
                },
                lists: this.state.lists, 
                links: this.state.links,
                allLinks: this.state.allLinks
              }}>             
                <div className="app">
                  <Sidebar toggleAuth={toggleAuth} />
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
