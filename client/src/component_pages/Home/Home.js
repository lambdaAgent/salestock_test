//load library
import React from 'react';
import homeAction from "./HomeAction"
import { connect } from "react-redux";

//load pages
import { Link } from "react-router";

class Home extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        //if no pokemons, then grab it
        if(this.props.pokemons.length <= 0){
           this.props.getPokemons(0);
        }
    }
    render() {
    	const pokemons = this.props.pokemons;
    	if(!Array.isArray(pokemons)){
    		//if no pokemons yet, show loading
    		return <div> Loading... </div>
    	}

    	const loopPokemon = pokemons.map(p => <List key={p.num} pokemon={p}/> )
        console.log(this.props.pokemons);
        return (
        	<div>
        		{loopPokemon}
        	</div>
        );
    }
}


const mapStateToProps =  ({home}) => home;
const mapDispatchToProps = homeAction;

module.exports = connect(mapStateToProps, mapDispatchToProps)(Home);



//


const List = (props) => {
    const poke = props.pokemon
    return(
        <article className="media">
            <Link to={"/pokemon/"+poke.num} style={{color: "black"}}>
              <div className="media-left">
                <img className="media-object" src={poke.img} alt={poke.img} />
              </div>
              <div className="media-body">
                <h4 className="media-heading">{poke.name}</h4>
                <p> height: {poke.height} </p>
                <p> weight: {poke.weight} </p>
              </div>
            </Link>
        </article>
    )
}

