import {createStore} from "redux";


const home = (state={}, action) => {
	switch(action.type){
		case "GET_FROM_SERVER":
			var Pokemons = (state.Pokemons) ? state.Pokemons.concat(action.payload) : action.payload;
			return Object.assign({}, state, {Pokemons: Pokemons})
		break;
		default:
			return state;
		break;
	}
}

module.exports = home;