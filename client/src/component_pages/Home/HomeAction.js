"use strict";
var url = "http://localhost:8000";     


const Action = (dispatch) => ({
    getPokemons(lastId, options){
      fetch(url + `/pokemons?lastId=${lastId}&amount=${options.amount}`)
      .then(res => res.json())
      .then(res => {
        dispatch({type: "GET_FROM_SERVER", payload: res})
      })
      .catch(err => console.log(err) )
    },
    
})

module.exports = Action;
