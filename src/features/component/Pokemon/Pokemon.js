import React, { useState, useEffect } from "react";
import classes from "./Pokemon.module.scss";
import axiosPokemons from "../../../axios/axiosPokemons";

function Pokemon(props) {
	const { name } = props.match.params;

	const [pokemon, setPokemon] = useState([]);

	useEffect(() => {
		axiosPokemons
			.get(`/pokemon/${name}`)
			.then((res) => {
				setPokemon(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	console.log(pokemon);
	const pokemonType = pokemon.types
		? pokemon.types.map((type) => {
				return <p key={type.type.name}>{type.type.name}</p>;
		  })
		: "";
	return (
		<div>
			{pokemon.name}
			<span>{pokemonType}</span>
		</div>
	);
}

export default Pokemon;
