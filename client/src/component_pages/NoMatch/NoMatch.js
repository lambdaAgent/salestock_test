import React from 'react';

class NoMatch extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'NoMatch';
    }
    render() {
        return(
	        <div>
	        	<h1>404</h1> 
	        	NoMatch
	        </div>
        );
    }
}

export default NoMatch;
