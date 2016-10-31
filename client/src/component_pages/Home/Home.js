import React from 'react';
import homeAction from "./HomeAction"

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Home';
    }
    render() {
        return <div>Home</div>;
    }
}


const mapStateToProps = ( ({home}) => home );
const mapDispatchToProps = homeAction;

module.exports = connect(mapStateToProps, mapDispatchToProps)(Home);