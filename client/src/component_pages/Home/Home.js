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
                   //{ filter::Array, selectedFilter::Tuple}
        this.state = { filter: [],    selectedFilter:[] }; 
        /* schema for this.state;
          this.state.filter = [
              {'Type': ['Grass', "Poison", etc]},
              {"Weakness": ["Fire", "Poison", etc]}
           ];
           this.state.selectedFilter = (weaknesses, fire) or (type, Flying)
         */
    }
    componentWillMount() {
        //if no pokemons, then grab it
        (this.props.pokemons.length <= 0) ? this.props.getPokemons(0, {amount: DEFAULT_AMOUNT}) : "";
        //get Filter
        this.props.getFilter(this)
    }

    componentDidUpdate(prevProps, prevState) {
        // infinite list
        var self = this;
        // attach scroll handler, if user is scrolling to bottom page, it will run GET request
        $(window).scroll(function(){
            var mainHeight = $("#main").height() - 120; //the height of one list of pokemon is 120
            if ($(window).scrollTop() + $(window).height() >= mainHeight){
                var pokemons = self.props.pokemons;
                var lastNumId = pokemons[pokemons.length-1].id;

                //unbind the scroll event to prevent continous request to server
                $(window).unbind('scroll');

                // selectedFilter::Tuple = (filterName, filterType) 
                // example selectedFilter = (weaknesses, fire) or (type, Flying)
                // if user has not select any filter, selectedFilter will be undefined and GET will not filter pokemons
                var filter__tuple = (self.state) ? self.state.selectedFilter : undefined;

                // getPokemons will query to url --> ?filterName=selectedFilter[0]&filterValue=selectedFilter[1]
                self.props.getPokemons(lastNumId, {amount: 5, filter: filter__tuple});
            }
        });          
    }
    _Filter(filterName, filterValue){
        if(filterValue === "none"){
            //if none, get all pokemon from server 
            return this.props.getPokemons(0, {amount: DEFAULT_AMOUNT});
        }


        this.setState({selectedFilter: [filterName, filterValue]});  
        this.props.getPokemons(0, {amount: DEFAULT_AMOUNT, filter: [filterName, filterValue]});
    }
    render() {
    	const pokemons = this.props.pokemons;
    	if(!Array.isArray(pokemons)){
    		//if no pokemons yet, show loading
    		return <div> Loading... </div>
    	}
    	const loopPokemon = pokemons.map((p, index) => <List key={p.id} pokemon={p}/> );
        const loopFilter = (this.state.filter.length > 0) ? this.state.filter.map((f,index) => {
            var key = Object.keys(f)[0];
            return (<Filter 
                        key={key} data={f[key]} name={key}
                        onChange={this._Filter.bind(this)}
                    />
            )
        }) : "";
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



/* =================
 * HELPER COMPONENTS
 * =================
 */


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
                <div className="col-md-2">
                <p> Weakness: </p>
                {  poke.weaknesses.map(w => <p key={poke.name+w}><strong>{w}</strong></p>)  }
                </div>
                <div className="col-md-2">
                <p>Type:</p>
                {  poke.type.map(t => <p key={poke.name+t}><strong>{t}</strong></p>)  }
                </div>
              </div>
            </Link>
        </article>
    )
}


const Filter = (props)=>{
    //if props.data not exists return null
    if(!props.data || props.data.length <= 0) return null;
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