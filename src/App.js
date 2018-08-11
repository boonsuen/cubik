import React from 'react';
import { 
  Router, 
  Link, 
  Route, 
  Head, 
  Switch, 
  Redirect 
} from 'react-static';
import Routes from 'react-static-routes';
import universal from 'react-universal-component';

const CubikApp = universal(import('./components/CubikApp'));
import './styles/public.scss';
import favicon from './img/favicon.png';

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

class App extends React.Component {
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
  state = {
    auth: getLocalAuth('localAuth'),
    firebaseAuth: 'initial',
    toggleAuth: this.toggleAuth
  }
  componentDidMount() {}
  componentDidUpdate(prevProps, prevState) {}
  render() {
    const { auth, firebaseAuth } = this.state;
    return (
      <React.Fragment>
        <Head>
          <title>Cubik</title>
          <link rel="icon" href={favicon} />
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
        <Router>
          <Switch>
            <Route path="/app" render={({location}) => {
              if (firebaseAuth === 'done') {
                return auth
                  ? (
                    <AuthContext.Provider value={this.state}>
                      <CubikApp />
                    </AuthContext.Provider>
                  ) : <Redirect to="/login" />
              } else if (firebaseAuth === 'loading' || firebaseAuth === 'initial') {
                return (
                  <AuthContext.Provider value={this.state}>
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
            <React.Fragment>
              <div className="nav container">
                <Link to="/" className="logo">Cubik</Link>
                <nav className="nav__items">
                  <Link className="nav__item" to="/about">About</Link>
                  <Link className="nav__item" to="/blog">Blog</Link>
                  <Link className="nav__item" to="/login">Login</Link>
                  <Link className="nav__item" to="/signup">Signup</Link>
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