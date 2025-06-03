import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.container}>
				<ul className={styles.links}>
					<li><a href="https://www.facebook.com/"  target="_blank"> Facebook </a></li>
					<li><a href="https://www.twitter.com/"  target="_blank"> Twitter </a></li>
					<li><a href="https://www.instagram.com/"  target="_blank"> Instagram </a></li>
				</ul>
				<div className={styles.copyright}>
					© 2025 ClickCo. Todos los derechos reservados.
				</div>
			</div>
		</footer>
	);
};

export default Footer;