import React, {Component} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
// import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import {
	Route,
	BrowserRouter as Router,
	Switch,
  useLocation,
	Redirect,
	Link
} from 'react-router-dom';
import Home from '../pages/Home';
import Chat from '../pages/Chat';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Lego from '../lego/Lego';
import { auth } from '../firebase/firebase';


import * as FontAwesome from "react-icons/fa";
// import * from 'react-icons/fc';
import { asyncComponent } from 'react-async-component'
const drawerWidth = 160;

 


const styles =  theme => ({
  root: {
    // display: 'flex',

  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    paddingLeft: 16,
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'space-between',
  },
	drawerLabel: {
		paddingLeft: theme.spacing(3)
	},

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});






 class PersistentDrawerLeft extends Component {
constructor() {
    super();
    // this.getPathName  = this.getPathName.bind(this);
  }

  state = {
    authenticated: false,
    loading: true,
    headerTitle: 'Home'
  }

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

     getPathName() {
    let location = useLocation();

    const name = location.pathname.replace('/', '');
    console.log(name)
//     this.setState ({
//       headerTitle : name
//     })
  }


render() {


  const { classes, pages, theme } = this.props;



  function PrivateRoute({ component: Component, authenticated, ...rest}) {


    return (

      <Route
        {...rest}
        render={(props) => authenticated === true
        ? <Component {...props} /> :
        <Component {...props} />}
        // : <Redirect to={{ pathname: '/login',  }} />}

      /> 
    )
  }

  // If user is not logged in 
  function PublicRoute({ component: Component, authenticated, ...rest }) {

    return (
      <Route
        {...rest}
        render={(props) => authenticated === false
          ? <Component {...props} />
          : <Redirect to={{ pathname: '/chat',  }} />}

      />
    )
}

	const pathsToIcons = {
		'fa': require('react-icons/fa'),
		'fc': require('react-icons/fc')
	}

	const createIconAsync =  ( icon ) => {
		const {color, name, path, size} = icon;
		const imported = pathsToIcons[path];
		if (!imported) { return; }
		 const ass = React.createElement(imported[name]);
		  return (
		    <div style={{ fontSize: size, color: color }}>{ass}</div>
		  );
	}

  const publicLinks = (pages) => {
  	return pages.filter(page => page.linkType === 'public');
  }

	const privateLinks = (pages) => {
  	return pages.filter(page => page.linkType === 'private');
  }


  const handleDrawerOpen = () => {
     this.setState ( { 
          open: true,
     
        })
  };

  const handleDrawerClose = () => {
       this.setState ( { 
          open: false,
     
        })
  };

  const {authenticated} = this.state; 
console.log(this.props.location)

  return (

    <div className={classes.root}>
    		<Router>
		       <Switch>
		         <Route exact path="/home" dddddd={authenticated} component={() => <Home authenticated={authenticated} />} ></Route>
             {/* <PublicRoute path="/home"  authenticated={authenticated} component={Home}></PublicRoute> */}
		         <PrivateRoute path="/chat" authenticated={authenticated} component={Chat}></PrivateRoute>
		         <PublicRoute path="/signup"  authenticated={authenticated} component={Signup}></PublicRoute>
		         <PublicRoute path="/login" authenticated={authenticated} component={Login}></PublicRoute> 
             <PrivateRoute path="/lego" authenticated={authenticated} component={Lego}></PrivateRoute> 
		       </Switch>
		     </Router>
      <CssBaseline />
      <AppBar position="fixed"
              className={clsx(classes.appBar, {
                [classes.appBarShift]: this.state.open})}>
        <Toolbar>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, this.state.open && classes.hide)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {this.state.headerTitle}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={this.state.open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >

        <div className={classes.drawerHeader}>
        	   	MENU
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {publicLinks(pages).map((page, index) => (
            <ListItem button key={page.label} component="a" href={`./${page.label}`}>
            	{createIconAsync(page.icon)}
              <ListItemText className={classes.drawerLabel} primary={page.label} />
              </ListItem>
          ))}
        </List>
        <Divider />
      <List>
          {privateLinks(pages).map((page, index) => (
            <ListItem button key={page.label} component="a" href={`./${page.label}`}>
            	{createIconAsync(page.icon)}
              <ListItemText className={classes.drawerLabel} primary={page.label} />
              </ListItem>
          ))}
        </List>
      </Drawer>

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >

      </main>
    </div>
  );
}
}

export default withStyles(styles, { withTheme: true })(PersistentDrawerLeft);