import {createStore} from "redux";


const home = (state={pokemons: [], types:[]}, action) => {
	switch(action.type){
		case "GET_POKEMON_FROM_SERVER":
			var pokemons = state.pokemons.concat(action.payload);
			return Object.assign({}, {pokemons: pokemons})
		break;
		case "GET_TYPES_FROM_SERVER":
			return Object.assign({}, state, {types: action.payload})
		break;
		default:
			return state;
		break;
	}
}

module.exports = home;