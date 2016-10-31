//library
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'

//pages
import Home from "./component_pages/Home/Home";



ReactDOM.render(
	   	<Router history={browserHistory} >
	   		<Route path="/" component={Home} />
			<Route path="*" component={NoMatch}/>
	  	</Router>
  , document.getElementById('root')
);
