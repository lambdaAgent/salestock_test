//load library
import React from 'react';
import homeAction from "./HomeAction"
import { connect } from "react-redux";
import $ from "jquery";

//load pages
import { Link } from "react-router";

/*
 * this is home page,
 * lifecycle: 
    1. this app is full SPA(single Page App).
    2. client will load empty page of html and initiate React's component
    3. next, react will begin fetching pokemons from server
 */


class Home extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        //if no pokemons, then grab it
        if(this.props.pokemons.length <= 0){
           this.props.getPokemons(0, {amount: 10});
        }
    }
    componentDidUpdate(prevProps, prevState) {
        //attach scroll handler here, after the page has been populated
        var self = this;
        $(window).scroll(function(){
            var mainHeight = $("#main").height() - 120; //the height of one list of pokemon is 120
            if ($(window).scrollTop() + $(window).height() >= mainHeight){
                var pokemons = self.props.pokemons;
                var lastNumId = pokemons[pokemons.length-1].id;
                //unbind the scroll event to prevent continous request to server
                $(window).unbind('scroll');
                self.props.getPokemons(lastNumId, {amount: 5});
            }
        });          
    }

    render() {
    	const pokemons = this.props.pokemons;
    	if(!Array.isArray(pokemons)){
    		//if no pokemons yet, show loading
    		return <div> Loading... </div>
    	}
    	const loopPokemon = pokemons.map((p, index) => <List key={p.id} pokemon={p}/> )
        return (
        	<div  id="main">
                <div className="container">
        		  {loopPokemon}
                </div>
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
            <Link to={"/pokemon/"+poke.id} style={{color: "black"}}>
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

