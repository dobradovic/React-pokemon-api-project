import React, { useState, useEffect } from "react";
import classes from "./Pokemon.module.scss";
import axiosPokemons from "../../../axios/axiosPokemons";
import Loader from "../UI/Loader/Loader";
import { Modal, useModal, ModalTransition } from "react-simple-hook-modal";
import "react-simple-hook-modal/dist/styles.css";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Pokemon(props) {
	const { name } = props.match.params;
	const { isModalOpen, openModal, closeModal } = useModal();
	const [pokemonsByType, setPokemonsByType] = useState([]);

	const [pokemon, setPokemon] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const modalStyle = {
		color: "gold",
		textAlign: "center",
		marginBottom: "1rem",
	};

	const modalStylePokemons = {
		color: "orange",
		display: "flex",
		flexDirection: "column",
		textAlign: "center",
	};

	var settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
	};

	useEffect(() => {
		setIsLoading(true);
		axiosPokemons
			.get(`/pokemon/${name}`)
			.then((res) => {
				console.log(res);
				setPokemon(res.data);
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setIsLoading(false);
			});
	}, []);

	const typeHandler = (event) => {
		setIsLoading(true);
		axiosPokemons
			.get(`type/${event.target.innerText}`)
			.then((res) => {
				setPokemonsByType(res.data.pokemon);
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setIsLoading(false);
			});
		openModal();
	};

	const pokemonByTypeShow = pokemonsByType.map((pokemon) => {
		return <span key={pokemon.pokemon.name}>{pokemon.pokemon.name}</span>;
	});

	const pokemonType = pokemon.types
		? pokemon.types.map((type) => {
				return (
					<span
						key={type.type.name}
						className={classes.ShowPokemonsByType}
						onClick={typeHandler}
					>
						{type.type.name}
					</span>
				);
		  })
		: "";

	const pokemonAbility = pokemon.abilities
		? pokemon.abilities.map((ability) => {
				return <span key={ability.ability.name}>{ability.ability.name}</span>;
		  })
		: "";

	return (
		<>
			<Modal
				id="any-unique-identifier"
				isOpen={isModalOpen}
				transition={ModalTransition.BOTTOM_UP}
			>
				<button onClick={closeModal}>X</button>
				{isLoading ? (
					<Loader />
				) : (
					<div>
						<h3 style={modalStyle}>
							Pokemons by choosen type: - {pokemonByTypeShow.length}
						</h3>
						<div style={modalStylePokemons}>{pokemonByTypeShow}</div>
					</div>
				)}
			</Modal>

			<main>
				{isLoading ? (
					<Loader />
				) : (
					<article className={classes.SinglePokemon}>
						<Slider {...settings}>
							{pokemon.sprites
								? Object.entries(pokemon.sprites).map(([key, value]) => {
										if (value && typeof value === "string")
											return (
												<div className="sliderWrap" key={key}>
													<img
														key={key}
														src={value}
														width="100%"
														height="100%"
														className="yours-custom-class"
													/>
												</div>
											);
								  })
								: ""}
						</Slider>
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
		</>
	);
}

export default Pokemon;
