//load library
import React from 'react';
import homeAction from "./HomeAction"
import { connect } from "react-redux";

//load pages
import { Link } from "react-router";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Home';
    }
    componentWillMount() {
          this.props.getPokemons(0)
    }
    render() {
    	const Pokemons = this.props.Pokemons;
    	if(!Array.isArray(Pokemons)){
    		//if no Pokemons yet, show loading
    		return <div> Loading... </div>
    	}

    	const loopPokemon = Pokemons.map(p => <List key={p.id} pokemon={p}/> )
        return (
        	<div>
        		{loopPokemon}
        	</div>
        );
    }
}


const mapStateToProps = ( ({home}) => home );
const mapDispatchToProps = homeAction;

module.exports = connect(mapStateToProps, mapDispatchToProps)(Home);



//


const List = (props) => {
    const poke = props.pokemon
    return(
        <article className="media">
            <Link to={"/article/"+poke.id} style={{color: "black"}}>
              <div className="media-left">
                <img className="media-object" src={poke.img} alt={poke.img} />
              </div>
              <div className="media-body">
                <h4 className="media-heading">{poke.name}</h4>
                Hello
              </div>
            </Link>
        </article>
    )
}

