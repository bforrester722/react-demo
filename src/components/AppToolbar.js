import React, {Component} from 'react';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';




const drawerWidth = 160;

const styles =  theme => ({
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
});

class AppToolbar extends Component {
 	
	constructor(props) {
		super(props);
		// pages for drawer items
		this.pages = this.props.pages;
	}

  state = {
    open: false,
  }
 	

	render() {
 		
 		const { classes, pages, theme } = this.props;

	  // for AppShell to know drawer is open
	  const handleDrawer = async () => {
	    await this.setState( prevState => { 
	    	return {open: !prevState.open}
      });
      this.props.onDrawerOpenChange(this.state.open);  
  	};

  	// for importing icons
  	// TODO find away to do this dynamically 
  	const pathsToIcons = {
			'fa': require('react-icons/fa'),
			'fc': require('react-icons/fc')
		}

		// creates icons for drawer can take in size and color
		const createIconAsync =  ( icon ) => {
			const {color, name, path, size} = icon;
			const imported = pathsToIcons[path];
			if (!imported) { return; }
			const createdIcon = React.createElement(imported[name]);
			return ( <div style={{ fontSize: size, color: color }}>{createdIcon}</div> );
		}

 		return (

			<div>
 	 			<AppBar position="fixed"
              	className={clsx(classes.appBar, { [classes.appBarShift]: this.state.open})}>
	        <Toolbar>
	          <IconButton
  	          color="inherit"
    	        aria-label="open drawer"
      	      onClick={handleDrawer}
        	    edge="start"
          	  className={clsx(classes.menuButton, this.state.open && classes.hide)}>
            	<MenuIcon />
          	</IconButton>
          	<Typography variant="h6" noWrap>
            	{this.props.headerTitle}
          	</Typography>
        	</Toolbar>
      	</AppBar>

	      <Drawer className={classes.drawer}
				        variant="persistent"
				        anchor="left"
				        open={this.state.open}
				        classes={{ paper: classes.drawerPaper}}>
	        <div className={classes.drawerHeader}>
	        	   	MENU
	          <IconButton onClick={handleDrawer}>
	            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
	          </IconButton>
	        </div>
	        <Divider />
	        <List>
	          {this.pages.map((page, index) => (
	            <ListItem button key={page.label} component="a" href={`./${page.link}`}>
	            	{createIconAsync(page.icon)}
	              <ListItemText className={classes.drawerLabel} primary={page.label} />
	            </ListItem>
	          ))}
	        </List>
	      </Drawer>
	    </div>
 		
 		)

	}	

}

export default withStyles(styles, { withTheme: true })(AppToolbar);