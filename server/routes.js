"use strict";
var express = require('express');
var router = express.Router();
var pokedex = require("./pokedex");
var Types = getAllTypes(pokedex);


/* this pokemon return certain amount(default=5) of pokemon, after the lastId
 * GET /pokemon?lastId=12 --> [{id:13},{id:14},{id:15},{id:16},{id:17}]
 */
router.get("/pokemon", (req, res, next) => {
	const defaultAmount = 5;
	console.log(req.query)
	const lastId = req.query.lastId || 0;
	getPokemon(lastId, defaultAmount, pokedex)
		.then(pokemon__array => {
			res.json(pokemon__array)
		})
});


module.exports = router;





// ===========
//    LOGIC
// ===========

function getPokemon(lastId, amount, pokedex){
	return  new Promise((resolve, reject) => {
		var Pokemon__array = pokedex.slice(Number(lastId), Number(amount)+Number(lastId) );
		resolve(Pokemon__array)
	})
}

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
	return Result
}