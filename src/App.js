import React, {Component, lazy, Suspense} from 'react';

const AppShell = lazy(() => import('./components/AppShell'));

const renderLoader = () => {
  return <p ></p>
};


class App extends Component {

	render() {

  	const pages = [
  		{
  			index: 		0,
  			label: 		'Home',
  			linkType: 'public'
  		},
      {
        index:    1,
        label:    'Lego',
        linkType: 'public'
      },
  		{
  			index: 		2,
  			label: 		'Chat',
  			linkType: 'private'
  		},
      
  	]

	  return (
    
      <Suspense fallback={renderLoader()}>
	   		<AppShell id="AppShell" pages={pages}></AppShell>
     	</Suspense>

	  );
	}
	
}

export default App;