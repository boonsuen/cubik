import React from 'react';
import { Head } from 'react-static';
import styled, { keyframes } from 'styled-components';
import Sidebar from './Sidebar';
import Content from './Content';

import auth from '../firebase/auth';
import db from '../firebase/db';
import { AuthContext } from '../App';

const LoaderWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const loader = keyframes`
  0% {
    opacity: .2;
    height: 60%;
  }
  50% {
    opacity: 1;
    height: 100%;
  }
  100% {
    opacity: .2;
    height: 60%;
  }
`;

const StyledLoader = styled.div`
  width: 40px;
  height: 44px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;

  .loader-items {
    width: 20%;
    background-color: #8EC5FC;
    background-image: linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%);
    animation-name: ${loader};
    animation-iteration-count: infinite;
    animation-duration: 0.6s;
  }

  .loader__2 {
    animation-delay: 0.15s;
  }
  
  .loader__3 {
    animation-delay: 0.3s;
  }
`;

const StyledApp = styled.div`
  display: flex;
  height: 100%;
`;

export const InitialDataContext = React.createContext({});

class InitialLoading extends React.Component {
  componentDidMount() {
    const loadFirebaseAuthState = new Promise((resolve, reject) => {
      auth.onAuthStateChanged(user => {
        let status = 'unverified';
        if (user) {
          status = 'verified';
          console.log(
            `%c AUTH %c Logged in `,
            "background: #00d334; color: #fff; padding: 3px;", "background: #7cffc0; padding: 3px; color: #777;",
            user
          );
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
      this.props.toggleAuth(user.auth, 'done');
      if (user.auth === true) {
        this.props.doneLoadingFirebaseAuth(user.auth, user.id, user.lists, user.links);
      }
    }));
  }
  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Loading...</title>
        </Head>
        <LoaderWrapper>
          <StyledLoader>
            <div className="loader-items"></div>
            <div className="loader-items loader__2"></div>
            <div className="loader-items loader__3"></div>
          </StyledLoader>
        </LoaderWrapper>
      </React.Fragment>
    );
  }
}

class CubikApp extends React.Component {
  doneLoadingFirebaseAuth = (authStatus, userId, lists, links) => {
    this.setState({
      loadingFirebaseAuth: !authStatus,
      user: {
        id: userId
      },
      lists: lists.sort((a, b) => a.order - b.order),
      links
    });
  }
  handleModal = (boolean) => {
    this.setState({showModal: boolean});
  }
  state = {
    loadingFirebaseAuth: true,
    user: {
      id: ''
    },
    lists: [],
    links: [],
    showModal: false,
    allLinks: {
      id: 'allLinks',
      ungrouppedLinks: [{}],
      sublists: [{
        id: 'allLinksSublist',
        title: 'Home GraphQL',
        links: [{
          id: 'nene',
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
          <title>Dashboard - Cubik</title>
        </Head>
        <AuthContext.Consumer>
          {toggleAuth => {
            return this.state.loadingFirebaseAuth 
              ? <InitialLoading 
                  loadingFirebaseAuth={this.state.loadingFirebaseAuth}
                  doneLoadingFirebaseAuth={this.doneLoadingFirebaseAuth}
                  toggleAuth={toggleAuth}
                  routeListId={this.props.routeListId}
                /> 
              : (
                <InitialDataContext.Provider value={{
                  user: {
                    id: this.state.user.id
                  },
                  lists: this.state.lists, 
                  links: this.state.links,
                  allLinks: this.state.allLinks
                }}>             
                  <StyledApp>
                    <Sidebar toggleAuth={toggleAuth} openModal={this.handleModal} />
                    <Content /> 
                  </StyledApp>
                </InitialDataContext.Provider>
              )
            }
          }
        </AuthContext.Consumer>
      </React.Fragment>
    );
  }
}

export default CubikApp;
