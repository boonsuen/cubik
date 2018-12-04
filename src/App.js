import React from 'react';
import { 
  Router, 
  Link, 
  Route, 
  Head, 
  Switch, 
  Redirect,
  cleanPath
} from 'react-static';
import Routes from 'react-static-routes';
import universal from 'react-universal-component';
import styled from 'styled-components';

const NoLayout = universal(import('./containers/NoLayout'));
const NonStatic = universal(import('./containers/NonStatic'));
const CubikApp = universal(import('./components/CubikApp'));
import GlobalStyle, { fontFaceRules } from './GlobalStyle.css';
import favicon from './assets/img/favicon.png';
import AvenirNextRegularSubsetWoff2 from './assets/fonts/AvenirNextLTPro-Regular-subset.woff2';
import AvenirNextMediumSubsetWoff2 from './assets/fonts/AvenirNextLTPro-Medium-subset.woff2';
import AvenirNextDemiSubsetWoff2 from './assets/fonts/AvenirNextLTPro-Demi-subset.woff2';
import AvenirNextBoldSubsetWoff2 from './assets/fonts/AvenirNextLTPro-Bold-subset.woff2';

const Logo = styled(Link)`
  font-size: 25px;
  font-weight: 700;
  color: #0d0d59;
`;

const NavWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-top: 60px;
`;

const StyledNav = styled.nav`
  margin-left: auto;
  width: initial;
`;

const NavItem = styled(Link)`
  font-size: 20px;
  font-weight: 500;
  color: #0d0d59;
  margin-left: 38px;
`;

const StyledFooter = styled.div`
  display: flex;
  align-items: center;
  height: 100px;
  color: #0d0d59;
  font-weight: 500;
  font-size: 20px;

  a {
    margin-right: 71px;
  }
`;

export const AuthContext = React.createContext({
  auth: false,
  firebaseAuth: 'initial',
  toggleAuth: () => {}
});

const getLocalAuth = (name) => {
  try {
    const item = localStorage.getItem(name);
    return item !== 'true' || item !== 'false' ? false : JSON.parse(item);
  } catch (err) {
    return undefined;
  }
}

const LayoutWrapper = ({ children, toggleAuth }) => (
  <React.Fragment>
    <NavWrapper className="container">
      <Logo to="/">Cubik</Logo>
      <StyledNav>
        <NavItem to="/about">About</NavItem>
        <NavItem to="/blog">Blog</NavItem>
        <NavItem to="/login">Login</NavItem>
        <NavItem to="/signup">Signup</NavItem>
      </StyledNav>
    </NavWrapper>
    <div className="container">
      <AuthContext.Provider value={toggleAuth}>
        {children}
      </AuthContext.Provider>
    </div>
    <StyledFooter className="container">
      <Link to="/about">About</Link>
      <a href="https://twitter.com/boon_suen" target="_blank">
        Twitter
      </a>
    </StyledFooter>
  </React.Fragment>
);

// The magic :)
const RenderRoutes = ({ getComponentForPath, toggleAuth }) => {
  return (
    <Route
      path="*"
      render={props => {
        // Get the component for the path
        let Comp = getComponentForPath(cleanPath(props.location.pathname));
        if (!Comp) {
          Comp = getComponentForPath('404');
        }
        // If exporting static HTML
        if (typeof document === 'undefined') {
          if (props.location.pathname === '/404') {
            // Not having any prerendered content for non-static routes
            return null;
          }
          return (
            // The flash, the prerendered        
            <LayoutWrapper toggleAuth={toggleAuth}>
              <Comp {...props} />
            </LayoutWrapper>
          );
        } else {
          return (
            // The final, when React hydrated
            <LayoutWrapper toggleAuth={toggleAuth}>
              <Comp {...props} />
            </LayoutWrapper>
          );
        }
      }}
    />
  );
};

export default class App extends React.Component {
  state = {
    auth: getLocalAuth('localAuth'),
    firebaseAuth: 'initial'
  }
  toggleAuth = (auth, firebaseAuth) => {
    this.setState({
      auth,
      firebaseAuth
    }, () => {
      localStorage.setItem('localAuth', this.state.auth);
      localStorage.setItem('preventFlashLoad', this.state.auth);
    });
    console.log('toggleAuth');
  }
  render() {
    const { auth, firebaseAuth } = this.state;
    return (
      <React.Fragment>
        <Head>
          <title>Cubik</title>
          {/* <link rel="preload" as="font" href={AvenirNextRegularSubsetWoff2} type="font/woff2" crossOrigin="anonymous" />
          <link rel="preload" as="font" href={AvenirNextMediumSubsetWoff2} type="font/woff2" crossOrigin="anonymous" />
          <link rel="preload" as="font" href={AvenirNextDemiSubsetWoff2} type="font/woff2" crossOrigin="anonymous" />
          <link rel="preload" as="font" href={AvenirNextBoldSubsetWoff2} type="font/woff2" crossOrigin="anonymous" /> */}
          <link rel="icon" href={favicon} />
          <style>{fontFaceRules}</style>
          <script>
          {`
            const pFL = localStorage.getItem('preventFlashLoad');
            if (pFL === 'false' || pFL === 'true') {
              if (JSON.parse(pFL) && !window.location.pathname.startsWith('/app')) { 
                window.location.pathname = '/app' 
              }
            } else {
              localStorage.setItem('localAuth', false);
              localStorage.setItem('preventFlashLoad', false);
            }
          `}
          </script>
        </Head>      
        <GlobalStyle />
        <Router>
          <Switch>            
            <Route path="/nolayout" render={() => (<NoLayout />)} />
            <Route path="/nonstatic" render={() => (<NonStatic />)} />
            <Route path="/app" render={({ location }) => {
              if (firebaseAuth === 'done') {
                console.log("firebaseAuth === 'done'");
                return auth
                  ? (
                    <AuthContext.Provider value={this.toggleAuth}>
                      <CubikApp routeListId={location.pathname.replace(/\/app\//, '')} />
                    </AuthContext.Provider>
                  ) : <Redirect to="/login" />
              } else if (firebaseAuth === 'loading' || firebaseAuth === 'initial') {
                console.log("firebaseAuth === 'loading' || firebaseAuth === 'initial'");
                return (
                  <AuthContext.Provider value={this.toggleAuth}>
                    <CubikApp routeListId={location.pathname.replace(/\/app\//, '')} />
                  </AuthContext.Provider>
                );
              }
            }} />
            {auth && 
              <Route 
                path="/" 
                render={() => <Redirect to="/app" />} 
              />
            } 
            <Routes render={
              ({ getComponentForPath }) =>
                <RenderRoutes
                  toggleAuth={this.toggleAuth}
                  getComponentForPath={getComponentForPath}
                />
            } />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}