import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { ChakraProvider } from "@chakra-ui/react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { goerli, hardhat } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import MainLayout from "../layout/mainLayout";

const { chains, provider } = configureChains(
	[goerli, hardhat],
	[alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY }), publicProvider()]
);

const { connectors } = getDefaultWallets({
	appName: "Molecule IP_NFT",
	chains,
});

const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider,
});

export { WagmiConfig, RainbowKitProvider };
function Molecule_IP_NFT_FE({ Component, pageProps }) {
	return (
		<ChakraProvider>
			<WagmiConfig client={wagmiClient}>
				<RainbowKitProvider modalSize="compact" initialChain={process.env.NEXT_PUBLIC_DEFAULT_CHAIN} chains={chains}>
					<MainLayout>
						<Component {...pageProps} />
					</MainLayout>
				</RainbowKitProvider>
			</WagmiConfig>
		</ChakraProvider>
	);
}

export default Molecule_IP_NFT_FE;
