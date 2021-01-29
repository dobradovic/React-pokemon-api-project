import React, { useState, useEffect } from "react";
import classes from "./Pokemons.module.scss";
import Loader from "../UI/Loader/Loader";
import axiosPokemons from "../../../axios/axiosPokemons";
import { Link } from "react-router-dom";

function Pokemons() {
	const [pokemons, setPokemons] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [searchByName, setSearchByName] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage, setPostsPerPage] = useState(21);

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

	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const pageNumbers = [];
	const totalPokemons = pokemons.length;
	for (let i = 1; i <= Math.ceil(totalPokemons / postsPerPage); i++) {
		pageNumbers.push(i);
	}

	const paginate = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	let filterName = pokemons
		.filter((pokemon) =>
			pokemon.name.toLowerCase().includes(searchByName.toLowerCase())
		)
		.map((pokemon) => {
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

	let pokemonList = pokemons
		.slice(indexOfFirstPost, indexOfLastPost)
		.map((pokemon) => {
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
			</div>
			<div className={classes.Pokemons}>
				{isLoading ? (
					<Loader />
				) : searchByName === "" ? (
					pokemonList
				) : filterName.length > 0 ? (
					filterName
				) : (
					<span className={classes.Message}>no match</span>
				)}
			</div>
			<div className={classes.Pagination}>
				{pageNumbers.map((number) => {
					return (
						<span key={number}>
							<a onClick={() => paginate(number)} href="#">
								{number}
							</a>
						</span>
					);
				})}
			</div>
		</>
	);
}

export default Pokemons;
