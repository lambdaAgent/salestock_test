"use strict";
var url = "http://localhost:8000";     


const Action = (dispatch) => ({
    getPokemons(lastId){
    	console.log("fetching")
      fetch(url + `/pokemons?lastId=${lastId}`)
      .then(res => res.json())
      .then(res => {
        dispatch({type: "GET_FROM_SERVER", payload: res})
      })
      .catch(err => console.log(err) )
    },
    
})

module.exports = Action;
