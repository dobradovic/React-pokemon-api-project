import { configureStore } from "@reduxjs/toolkit";
// import pokemonsReducer from "../features/counter/counterSlice";

export default configureStore({
	reducer: {
		// pokemons: pokemonsReducer,
		null: () => null,
	},
});
