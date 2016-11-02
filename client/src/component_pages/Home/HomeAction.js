"use strict";
var url = "http://localhost:8000";     


const Action = (dispatch) => ({
    getPokemons(lastId, options){
    	var fetchUrl = (!options.filter || options.filter.length <= 0) 
    						? url + `/pokemons?lastId=${lastId}&amount=${options.amount}` 
    						: url + `/pokemons?lastId=${lastId}&amount=${options.amount}&filterName=${options.filter[0]}&filterValue=${options.filter[1]}`; 
      fetch(fetchUrl)
	      .then(res => res.json())
	      .then(res => {
	      		if(lastId === 0) {
	      			//if no lastId, get pokemon from server and clear all pokemons in reducers
		      		dispatch({type: "GET_INIT_POKEMON_FROM_SERVER", payload: res}) 
		      	} else {
		      		//get pokemon from server and concat to pokemons::Array in reducers
		      		dispatch({type: "GET_NEXT_POKEMON_FROM_SERVER", payload: res}) 
		      	}
	      })
	      .catch(err => console.log(err) )
    },
    getFilter(React){
    	fetch(url + '/filter')
	    	.then(res => res.json())
	    	.then(res => React.setState({filter: res}))
	    	.catch(err => console.log(err))
    },

})

module.exports = Action;
