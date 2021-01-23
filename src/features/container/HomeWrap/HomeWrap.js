import React from "react";
import classes from "./HomeWrap.module.scss";

function HomeWrap({ children }) {
	return (
		<>
			<header className={classes.Header}>header</header>
			{children}
			<footer className={classes.Footer}>footer</footer>
		</>
	);
}

export default HomeWrap;
