import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "../../styles/Navbar.module.css";
import Link from "next/link";
import { Breadcrumb, BreadcrumbItem, Box, Flex } from "@chakra-ui/react";
import { useOwner } from "../../utils/isOwner";

export default function Navbar() {
	const isOwner = useOwner();
	return (
		<nav className={styles.navbar}>
			<Flex alignItems={"center"}>
				<Link href="/">
					<img className={styles.molecule_logo} src="/molecule_logo.svg"></img>
				</Link>
				<Breadcrumb separator="-" ml={8}>
					{isOwner && (
						<BreadcrumbItem>
							<Link href="/brightlist">Brightlist Page</Link>
						</BreadcrumbItem>
					)}
				</Breadcrumb>
			</Flex>
			<ConnectButton />
		</nav>
	);
}
