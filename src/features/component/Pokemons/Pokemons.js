import React, { useState, useEffect } from "react";
import classes from "./Pokemons.module.scss";
import Loader from "../UI/Loader/Loader";
import axiosPokemons from "../../../axios/axiosPokemons";
import { Link } from "react-router-dom";
import Filters from "../Filters/Filters";
import InfiniteScroll from "react-infinite-scroll-component";

function Pokemons() {
	const [pokemons, setPokemons] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		axiosPokemons
			.get("pokemon?limit=151")
			.then((res) => {
				setPokemons(res.data.results);
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setIsLoading(false);
			});
	}, []);

	let pokemonList = pokemons.map((pokemon) => {
		return (
			<Link
				to={`/pokemon/${pokemon.name}`}
				className={classes.Pokemon}
				key={pokemon.name}
			>
				<p className={classes.PokemonTitle}>{pokemon.name}</p>
			</Link>
		);
	});

	return (
		<>
			<Filters></Filters>
			<div className={classes.Pokemons}>
				{isLoading ? <Loader /> : pokemonList}
			</div>
		</>
	);
}

export default Pokemons;
