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
	const [searchByName, setSearchByName] = useState("");
	const [types, setTypes] = useState([]);
	// const [page, setPage] = useState(1);

	useEffect(() => {
		setIsLoading(true);
		axiosPokemons
			.get("pokemon?limit=151")
			.then((res) => {
				console.log(res);
				setPokemons(res.data.results);
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setIsLoading(false);
			});
	}, []);

	const filterName = pokemons.filter((pokemon) => {
		return pokemon.name.toLowerCase().includes(searchByName.toLowerCase());
	});

	let pokemonList = filterName.map((pokemon) => {
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
			{/* <InfiniteScroll
				dataLength={pokemons.length}
				next={fetchData}
				hasMore={true}
				loader={<h4>Loading...</h4>}
				endMessage={
					<p style={{ textAlign: "center" }}>
						<b>Yay! You have seen it all</b>
					</p>
				}
			> */}
			<div className={classes.FilterOptions}>
				<div className={classes.FiltersFormBlock}>
					<label className={classes.FilterLabel}>Search:</label>
					<input
						type="text"
						className={classes.FilterInput}
						placeholder="Pokemon name..."
						onChange={(event) => setSearchByName(event.target.value)}
					></input>
				</div>
				<div className={classes.FiltersFormBlock}>
					<label className={classes.FilterLabel}>Type:</label>
					<select className={classes.FilterInput}>
						<option value="0">All</option>
						{/* {filterType} */}
					</select>
				</div>
				<div className={classes.FiltersFormBlock}>
					<label className={classes.FilterLabel}>Ability:</label>
					<select className={classes.FilterInput}>
						<option value="0">All</option>
						<option>Pokemon 2</option>
						<option>Pokemon 3</option>
						<option>Pokemon 4</option>
					</select>
				</div>
			</div>

			<div className={classes.Pokemons}>
				{isLoading ? <Loader /> : pokemonList}
			</div>
			{/* </InfiniteScroll> */}
		</>
	);
}

export default Pokemons;
