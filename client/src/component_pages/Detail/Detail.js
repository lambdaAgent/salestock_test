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
		if(!poke) return <Loading />
		return(
			<div>
				<div>
					<BackButton />
					<div className="container">
						<ul>
						<li>name: {poke.name}</li>
						<li>picture : <img src={poke.img} /></li>
						<li>Type : {poke.type}</li>
						<li>height : {poke.height}</li>
						<li>weight : {poke.weight}</li>
						</ul>
					</div>
				</div>
			</div>
		)
	}
};

module.exports =(Detail);
