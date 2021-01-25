import React from "react";
import classes from "./HomeWrap.module.scss";
import Logo from "../../../assets/images/logo.png";

function HomeWrap({ children }) {
	return (
		<>
			<header className={classes.Header}>
				{/* <h3 className={classes.HeaderTitle}>Cinnamon task - React Developer</h3> */}
				<a href="/">
					<img src={Logo} alt="Logo image" id="logo-img" />
				</a>
			</header>
			{children}
			<footer className={classes.Footer}>
				Cinnamon task - React Developer
			</footer>
		</>
	);
}

export default HomeWrap;
