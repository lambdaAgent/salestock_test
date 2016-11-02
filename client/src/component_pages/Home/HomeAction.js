"use strict";
var url = "http://localhost:8000";     


const Action = (dispatch) => ({
    getPokemons(lastId, options){
    	var fetchUrl = (!options.filter || options.filter.length <= 0) 
    						? url + `/pokemons?lastId=${lastId}&amount=${options.amount}` 
    						: url + `/pokemons?lastId=${lastId}&amount=${options.amount}&filterName=${options.filter[0]}&filterValue=${options.filter[1]}`; 
      fetch(fetchUrl)
      .then(res => res.json())
      .then(res => dispatch({type: "GET_POKEMON_FROM_SERVER", payload: res}) )
      .catch(err => console.log(err) )
    },
    getTypes(React){
    	fetch(url + '/types')
    	.then(res => res.json())
    	.then(res => React.setState({filter: res}))
    	.catch(err => console.log(err))
    },

})

module.exports = Action;
