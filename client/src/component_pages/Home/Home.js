//load library
import React from 'react';
import homeAction from "./HomeAction"
import { connect } from "react-redux";
import $ from "jquery";

var DEFAULT_AMOUNT = 10;

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
        this.state = { filter: []}; 
        /* schema for this.state.filter;
          this.state.filter = [
              {'Type': ['Grass', "Poison", etc]},
              {"Weakness": ["Fire", "Poison", etc]}
           ];
         */
    }
    componentWillMount() {
        //if no pokemons, then grab it
        (this.props.pokemons.length <= 0) ? this.props.getPokemons(0, {amount: DEFAULT_AMOUNT}) : "";
        //if no filter, then grab it
        this.props.getTypes(this)
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
                //TODO: 1. add selectedFilter::TUPLE to this.state 
                //      2. use selectedFilter instead of this.state.filter
                var filter__tuple = (this.state && "filter" in this.state) ? this.state.filter : undefined;

                self.props.getPokemons(lastNumId, {amount: 5, filter: filter__tuple});
            }
        });          
    }
    _Filter(filterName, filterValue){
        //TODO: 1. add selectedFilter::TUPLE to this.state 
        //      2. update selectedFilter, when user change the value of state
               
        this.props.getPokemons(0, {amount: DEFAULT_AMOUNT, filter: [filterName, filterValue]});
    }
    render() {
    	const pokemons = this.props.pokemons;
    	if(!Array.isArray(pokemons)){
    		//if no pokemons yet, show loading
    		return <div> Loading... </div>
    	}
    	const loopPokemon = pokemons.map((p, index) => <List key={p.id} pokemon={p}/> )
        const loopFilter = this.state.filter.map((f,index) => {
            var key = Object.keys(f)[0];
            console.log("key", f)
            return (<Filter 
                        key={index} data={f[key]} name="type"
                        onChange={this._Filter.bind(this)}
                    />
            )
        })
        return (
        	<div  id="main">
                <div className="container">
                  {loopFilter}
                  {loopPokemon}
                </div>
        	</div>
        );
    }
}


const mapStateToProps =  ({home}) => home;
const mapDispatchToProps = homeAction;

module.exports = connect(mapStateToProps, mapDispatchToProps)(Home);




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


const Filter = (props)=>{
    //if props.data not exists return null
    if(!props.data || props.data.length <= 0) return null;
    console.log("props.data", props.datas)
    const loopFilter = props.data.map((filter, index) => <option key={filter} value={filter}>{filter}</option>)
    return(
        <div>
            <label>{props.name}:</label>
            <select name={props.name} 
                    style={Object.assign({}, {marginLeft: 10}, props.style)}
                    onChange={(e) => props.onChange(props.name, e.target.value)}
                    >
                <option value="none">none</option>
                {loopFilter}
            </select>
        </div>
    )
}