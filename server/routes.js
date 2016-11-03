"use strict";
var express = require('express');
var router = express.Router();
var pokedex = require("./pokedex");


//Types::Array of String --> ['Grass','Poison']
//Weaknesses::Array of String --> ['Fire', "Water"]
var Types = getAllTypes(pokedex);
var Weaknesses = getAllWeakness(pokedex);

router.get("/filter", (req, res) => {
	var result = [ {type:Types}, {weaknesses: Weaknesses}]

	res.json(result)}
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
	
	var pokemon__array;

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
//    HELPER
// ===========

function getAllTypes(pokedex){
	var Result = {};
	pokedex.map(poke => {
		if(!("type" in poke)){
			//if pokemon has no type, just return
			return;
		}

		//loop each type and store in Result
		// Result = {"Grass": true, "Poison": true};
		poke.type.map(type => {
			if(!(type in Result)){
				Result[type] = true
			}
		});

	});
	return Object.keys(Result)
}

function getAllWeakness(pokedex){
	var Result = {};
	pokedex.map(poke => {
		if(!"weaknesses" in poke) return;
		poke.weaknesses.map(w => {
			if(!(w in Result)){
				Result[w] = true
			}
		})
	});
	return Object.keys(Result)
}