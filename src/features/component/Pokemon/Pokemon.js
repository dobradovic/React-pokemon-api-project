import React, { useState, useEffect } from "react";
import classes from "./Pokemon.module.scss";
import axiosPokemons from "../../../axios/axiosPokemons";
import PokemonImg from "../../../assets/images/pokemon1.jpg";
import Loader from "../UI/Loader/Loader";

function Pokemon(props) {
	const { name } = props.match.params;

	const [pokemon, setPokemon] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		axiosPokemons
			.get(`/pokemon/${name}`)
			.then((res) => {
				setPokemon(res.data);
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setIsLoading(false);
			});
	}, []);
	console.log(pokemon);
	const pokemonType = pokemon.types
		? pokemon.types.map((type) => {
				return (
					<a href="#" key={type.type.name}>
						{type.type.name}
					</a>
				);
		  })
		: "";
	const pokemonAbility = pokemon.abilities
		? pokemon.abilities.map((ability) => {
				return (
					<a href="#" key={ability.ability.name}>
						{ability.ability.name}
					</a>
				);
		  })
		: "";
	return (
		<main>
			{isLoading ? (
				<Loader />
			) : (
				<article className={classes.SinglePokemon}>
					<img src={PokemonImg} alt="img" />
					<div className={classes.PokemonDescription}>
						<h1 className={classes.PokemonTitle}>{pokemon.name}</h1>
					</div>
					<span className={classes.PokemonType}>
						{pokemonType}
						<p className={classes.PokemonAbilityType}>Type : </p>
					</span>
					<span className={classes.PokemonAbility}>
						{pokemonAbility}
						<p className={classes.PokemonAbilityTitle}>Abilities : </p>
					</span>
				</article>
			)}

			<a href="/" className={classes.LinkGoBack}>
				<button className={classes.BtnGoBack}>Go back</button>
			</a>
		</main>
	);
}

export default Pokemon;
