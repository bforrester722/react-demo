import React, {Component, lazy, Suspense} from 'react';

const AppShell = lazy(() => import('./components/AppShell'));

const renderLoader = () => {
  return <p className="loading">Loading</p>
};


class App extends Component {

	render() {

  	const pages = [
  		{
  			index: 		0,
  			link: 		'Home',
  			label: 		'Home',
  			linkType: 'public'
  		},
      {
        index:    1,
        link:     'Lego',
        label:    'Lego',
        linkType: 'public'
      },
  		{
  			index: 		2,
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