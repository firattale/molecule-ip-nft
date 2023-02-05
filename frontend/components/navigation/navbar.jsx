import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "../../styles/Navbar.module.css";
export default function Navbar() {
	return (
		<nav className={styles.navbar}>
			<a href="https://molecule.to/" target={"_blank"}>
				<img className={styles.alchemy_logo} src="/molecule_logo.svg"></img>
			</a>
			<ConnectButton />
		</nav>
	);
}
