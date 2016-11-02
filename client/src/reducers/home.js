import {createStore} from "redux";


const home = (state={pokemons: []}, action) => {
	switch(action.type){
		case "GET_FROM_SERVER":
			var pokemons = state.pokemons.concat(action.payload);
			return Object.assign({}, {pokemons: pokemons})
		break;
		default:
			return state;
		break;
	}
}

module.exports = home;