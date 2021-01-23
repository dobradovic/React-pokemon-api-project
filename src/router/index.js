import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from "react-router-dom";
import Pokemons from "../features/component/Pokemons/Pokemons";
import HomeWrap from "../features/container/HomeWrap/HomeWrap";

export default () => {
	return (
		<Router>
			<Route path="/:path?">
				<HomeWrap>
					<Switch>
						<Route path="/" exact component={Pokemons} />
					</Switch>
				</HomeWrap>
			</Route>
		</Router>
	);
};
