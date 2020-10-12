import React, {Component, lazy} from 'react';
import {
  Route,
  Router,
  Switch,
  Redirect,
  withRouter,
} from 'react-router-dom';
import {auth}   from '../firebase/auth';
import {Helmet} from 'react-helmet';
import history  from '../history';
 
// Lazy components
const AppToolbar  = lazy(() => import('./AppToolbar'));
const CssBaseline = lazy(() => import('@material-ui/core/CssBaseline'));

// Lazy Pages
const Home    = lazy(() => import('../home/Home'));
const Chat    = lazy(() => import('../chat/Chat'));
const Login   = lazy(() => import('../chat/Login'));
const Signup  = lazy(() => import('../chat/Signup'));
const Lego    = lazy(() => import('../lego/Lego'));


class AppShell extends Component {

  state = {
    authenticated: false,
    headerTitle:   'Home'
  }

  // When firebase log in status changed update authenticated
  componentDidMount() {
    auth().onAuthStateChanged(async user => {
      if (user) {
        this.setState ( { 
          authenticated: true,
        })
      } 
      else {
         this.setState ( { 
          authenticated: false,
        })
      }
    });
  }

  // updates document title on page change
  handlePageChange = (title) => {
    this.setState(prev => {
      if (prev.headerTitle === title) {
        return;
      }
      return { headerTitle: title }
    });
  }

  // updates history when link clicked in AppToolbar drawer for navagation
  handleDrawerLinkClicked = (link) => {
    const {pathname} = this.props.location;
    if (pathname === link) { return; }
    this.props.history.push(link);
  }
    

  render() {

    const {pages}      = this.props;
    const {authenticated, headerTitle} = this.state;

    // If user logged in go to chat else to login page
    function PrivateRoute({ component: Component, authenticated, ...rest}) {
      return (
        <Route
          {...rest}
          render={(props) => authenticated === true
          ? <Component {...props}  /> : <Redirect to="/login" />}
        /> 
      )
    }

    // TODO temporary function need to fix
    // prevents auto redirect to chat if user is signed in if trying to view home or lego
    const PublicRoute = ({ component: Component, authenticated, ...rest }) => {
      const {pathname} = window.location;
      return (
        <Route
          {...rest}
          render={(props) => authenticated === false || pathname === '/Lego' || pathname === '/Home'
            ? <Component {...props} onHeaderTitle={this.handlePageChange}/>
            : <Redirect to={{ pathname: '/chat',  }} />}
        />
      )
    }


    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{headerTitle}</title>
          <link rel="canonical" href={`https://forr-resume.web.app/${headerTitle}`} />
          <meta name="description" content="Ben Forrester's React demo page" />
        </Helmet>

        <AppToolbar pages={pages} 
                    onDrawerLinkClicked={this.handleDrawerLinkClicked}/>
        <main >
          <Router history={history}>
            <Switch>
              <PublicRoute exact path="/home" authenticated={authenticated} component={Home}></PublicRoute>
              <PrivateRoute path="/chat" authenticated={authenticated} component={() => <Chat authenticated={authenticated} onHeaderTitle={this.handlePageChange} />}></PrivateRoute>
              <PublicRoute path="/signup"  authenticated={authenticated} component={Signup}></PublicRoute>
              <PublicRoute path="/login" authenticated={authenticated} component={Login}></PublicRoute>
              <PublicRoute path="/lego" authenticated={authenticated} component={Lego}></PublicRoute>
              <Redirect to="/home" />
            </Switch>
          </Router>
          <CssBaseline /> 
        </main>
      </div>

    );

  }

}

export default withRouter(AppShell);