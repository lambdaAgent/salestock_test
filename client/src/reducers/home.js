import {createStore} from "redux";


const home = (state={pokemons: []}, action) => {
	switch(action.type){
		case "GET_FROM_SERVER":
			var pokemons = state.pokemons.concat(action.payload);
						console.log("state reducers", state)

			return Object.assign({}, state, {pokemons: pokemons})
		break;
		default:
			return state;
		break;
	}
}

module.exports = home;