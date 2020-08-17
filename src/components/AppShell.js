import React, {Component} from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from 'react-router-dom';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import clsx from 'clsx';
import { auth } from '../firebase/firebase';

// TODO find away to dynamically import
import Home from '../pages/Home';
import Chat from '../pages/Chat';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Lego from '../lego/Lego';


import AppToolbar from './AppToolbar'


// TODO figure out if I want to have something happen to main content when drawer is open
// currently does nothing
const styles =  theme => ({
  content: {
    // paddingTop: '64px',
    flexGrow: 1,
    // padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    // marginLeft: 0,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    // marginLeft: drawerWidth,
  },
});



class AppShell extends Component {

  state = {
    authenticated: false,
    headerTitle:   'Home',
    loading:       true,
    open:          false
  }

  // When firebase log in status changed update authenticated
  componentDidMount() {
    auth().onAuthStateChanged(async user => {
      if (user) {
        this.setState ( { 
          authenticated: true,
          loading: false
        })
      } 
      else {
         this.setState ( { 
          authenticated: false,
          loading: false
        })
      }
    });
  }

  // updates apptoolbar title on page change
  // probably doesn't make sense would just want a logo or something
  // but a reference for passing data from child to parent
  handlePageChange = (title) => {
    this.setState(prev => {
      if (prev.headerTitle === title) {
        return;
      }
      document.title = title;
      return { headerTitle: title }
    });
  }

  // gets if drawer open from AppToolbar 
  // will be used to shift page over when drawer open
  handleDrawerOpenChange = (drawer) => {
    this.setState(prev => {
      return { open: drawer }
    });
  }
    

  render() {

    const {classes, pages, theme}      = this.props;
    const {authenticated, headerTitle} = this.state; 
  
    // Route if user is logged in
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


    return this.state.loading === true ? <h2 className="app-shell-loading">Loading...</h2> : (

      <div className={classes.root}>

        <AppToolbar headerTitle={headerTitle}
                    pages={pages} 
                    onDrawerOpenChange={this.handleDrawerOpenChange}/>

        <main className={clsx(classes.content, { [classes.contentShift]: this.state.open } )} >
          <Router>
            <Switch>
              <PublicRoute exact path="/home"  authenticated={authenticated} component={Home}></PublicRoute>
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

export default withStyles(styles, { withTheme: true })(AppShell);