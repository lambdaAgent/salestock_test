//load library
import React from 'react';

//pages
import Loading from "../../component_utils/Loading";
import BackButton from "../../component_utils/BackButton";

class Detail extends React.Component {
	constructor(props) {
		super(props);
		this.state = { pokemon : undefined}
	}

	componentDidMount() {
	  var url = "http://localhost:8000";
	  fetch(url + `/pokemon/${this.props.params.id}`)
      .then(res => res.json())
      .then(res => {
      	  this.setState({pokemon: res})
      })
      .catch(err => console.log(err) )
    
	}

	render(){
		const poke = this.state.pokemon;
		console.log(this.state)
		if(!poke) return <Loading />
		return(
			<div>
				<div>
				<BackButton />
					{poke.name}
				</div>
			</div>
		)
	}
};

module.exports =(Detail);
