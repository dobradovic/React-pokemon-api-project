import React, { useState, useEffect } from "react";
import classes from "./Filters.module.scss";
import axiosPokemons from "../../../axios/axiosPokemons";

function Filters() {
	const searchName = (event) => {
		console.log(event.target.value);
	};

	return (
		<>
			<div className={classes.FilterOptions}>
				<div className={classes.FiltersFormBlock}>
					<label className={classes.FilterLabel}>Search:</label>
					<input
						type="text"
						className={classes.FilterInput}
						placeholder="Pokemon name..."
						onChange={searchName}
					></input>
				</div>
				<div className={classes.FiltersFormBlock}>
					<label className={classes.FilterLabel}>Type:</label>
					<select className={classes.FilterInput}>
						<option value="0">All</option>
						<option>Pokemon 2</option>
						<option>Pokemon 3</option>
						<option>Pokemon 4</option>
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
		</>
	);
}

export default Filters;
