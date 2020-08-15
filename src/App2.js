import React, {Component} from 'react';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {
	Route,
	BrowserRouter as Router,
	Switch,
	Redirect
} from 'react-router-dom';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Signup from './pages/Signup';
import AppHeader from './components/AppHeader';
import Lego from './lego/Lego';

// import Login from './pages/Login';
// import { auth } from './firebase/firebase';

// If user is logged in 
// function PrivateRoute({ component: Component, authenticated, ...rest}) {
// 
// 	return (
// 
// 		<Route
// 			{...rest}
// 			render={(props) => authenticated === true
//       ? <Component {...props} />
//       : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
// 
// 		/> 
// 	)
// }
// 
// // If user is not logged in 
// function PublicRoute({ component: Component, authenticated, ...rest }) {
//   return (
//     <Route
//       {...rest}
//       render={(props) => authenticated === false
//         ? <Component {...props} />
//         : <Redirect to={{ pathname: '/chat', state: {ass: 'ass'} }} />}
//     />
//   )
// }

class App extends Component {
	// constructor() {
 //    super();
	state = {
		// authenticated: false,
    title: 'poop',
		loading: false
	};
// }






	render() {


  	const pages = [
  		{
  			index: 		0,
  			icon: 		{name: 'FcHome', path: 'fc', size: 24, color: 'green'},
  			link: 		'Home',
  			label: 		'Home',
  			linkType: 'public'
  		},
  		{
  			index: 		1,
  			icon: 		{name: 'FaMehRollingEyes', path: 'fa', size: 24, color: 'green'},
  			link: 		'Login',
  			label: 		'Login',
  			linkType: 'public'
  		},
  		{
  			index: 		1,
  			icon: 		{name: 'FcAssistant', path: 'fc', size: 24, color: 'green'},
  			link: 		'Chat',
  			label: 		'Chat',
  			linkType: 'private'
  		},
      {
        index:    1,
        icon:     {name: 'FcAssistant', path: 'fc', size: 24, color: 'green'},
        link:     'Lego',
        label:    'Lego',
        linkType: 'private'
      }
  	]
		// console.log(this.state)
	  return this.state.loading === true ? <h2>Loading...</h2> : (
	  	<div>
	  		<AppHeader pages={pages}>

	  		</AppHeader>
    	</div>
	  	

	  );
	}
	
}

export default App;