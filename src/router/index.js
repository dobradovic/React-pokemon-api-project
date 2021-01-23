import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from "react-router-dom";
import Pokemon from "../features/component/Pokemon/Pokemon";
import Pokemons from "../features/component/Pokemons/Pokemons";
import HomeWrap from "../features/container/HomeWrap/HomeWrap";

export default () => {
	return (
		<Router>
			<Route path="/:path?">
				<HomeWrap>
					<Switch>
						<Route path="/" exact component={Pokemons} />
						<Route path="/pokemon/:name" exact component={Pokemon} />
					</Switch>
				</HomeWrap>
			</Route>
		</Router>
	);
};
