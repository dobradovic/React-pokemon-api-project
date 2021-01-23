import axios from "axios";

const axiosPokemons = axios.create({
	baseURL: "https://pokeapi.co/api/v2/",
});

export default axiosPokemons;
