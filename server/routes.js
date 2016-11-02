"use strict";
var express = require('express');
var router = express.Router();
var pokedex = require("./pokedex");
var Types = getAllTypes(pokedex);

router.get("/types", (req, res) => {
	//Types contain strings --> ['Grass','Poison']
	console.log(Types)
	res.json(Types);
})

/* this pokemon return certain amount(default=5) of pokemon, after the lastId
 * GET /pokemons?lastId=12 --> [{id:13},{id:14},{id:15},{id:16},{id:17}]
 * GET /pokemons?lastId=0&amount=10 --> get 10 pokemons from {id:0}
 */
router.get("/pokemons", (req, res, next) => {
	const defaultAmount = req.query.amount || 5;
	const lastId = req.query.lastId || 0;
	const filterName = req.query.filterName;
	const filterValue = req.query.filterValue;
	
	var pokemon__array; //this will be the response
	
	//if no filter, just get all the pokemon by defaultAmount(5)
	if(!filterName && !filterValue){
		pokemon__array = pokedex.slice(Number(lastId), Number(defaultAmount)+Number(lastId) );
	} else {
		pokemon__array = pokedex.filter(p => p[filterName].indexOf(filterValue) >= 0 )
		 							.slice(lastId, defaultAmount+lastId);
	}


	res.json(pokemon__array) 

});


/* GET /pokemon/:id
 * will response with one pokemon by id
 */
router.get("/pokemon/:id", (req, res, next) => {
	var pokemon = pokedex.filter(p => p.id === Number(req.params.id))[0];
	res.json(pokemon);
});


module.exports = router;





// ===========
//    LOGIC
// ===========

function getAllTypes(pokedex){
	var Result = {};
	pokedex.map(poke => {
		if(!("type" in poke)){
			//if pokemon has no type, just return
			return;
		}
		poke.type.map(type => {
			if(!(type in Result)){
				Result[type] = true
			}
		});

	});
	return Object.keys(Result)
}