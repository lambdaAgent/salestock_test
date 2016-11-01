"use strict";
var url = "http://localhost:8000";     


const Action = (dispatch) => ({
    getPokemons(lastId){
      fetch(url + `/pokemon?lastId=${lastId}`)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        dispatch({type: "GET_FROM_SERVER", payload: res})
      })
      .catch(err => console.log(err) )
    }
})

module.exports = Action;
