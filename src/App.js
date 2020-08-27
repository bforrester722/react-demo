import React, {Component, lazy, Suspense} from 'react';

const AppShell = lazy(() => import('./components/AppShell'));


const renderLoader = () => <p>Loading</p>;
class App extends Component {

	render() {

  	const pages = [
  		{
  			index: 		0,
  			icon: 		{name: 'FcHome', path: 'fc', size: 24},
  			link: 		'Home',
  			label: 		'Home',
  			linkType: 'public'
  		},
  		// {
  		// 	index: 		1,
  		// 	icon: 		{name: 'FaMehRollingEyes', path: 'fa', size: 24, color: 'green'},
  		// 	link: 		'Login',
  		// 	label: 		'Login',
  		// 	linkType: 'public'
  		// },
      {
        index:    1,
        icon:     {name: 'FcDecision', path: 'fc', size: 24},
        link:     'Lego',
        label:    'Lego',
        linkType: 'public'
      },
  		{
  			index: 		2,
  			icon: 		{name: 'FcAssistant', path: 'fc', size: 24},
  			link: 		'Chat',
  			label: 		'Chat',
  			linkType: 'private'
  		},
      
  	]

	  return (
      <Suspense fallback={renderLoader()}>
	     
       		<AppShell id="AppShell" pages={pages}>
	     		</AppShell>
    
	  	</Suspense>

	  );
	}
	
}

export default App;