require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("solidity-coverage");
require("hardhat-docgen");
require("@nomiclabs/hardhat-etherscan");

module.exports = {
	solidity: "0.8.9",
	networks: {
		hardhat: {},
		mainnet: {
			accounts: [`${process.env.PRIVATE_KEY}`],
			url: `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
		},
		goerli: {
			accounts: [`${process.env.PRIVATE_KEY}`],
			url: `https://eth-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
		},
	},
	etherscan: {
		apiKey: `${process.env.ETHERSCAN_API_KEY}`,
	},
	docgen: {
		path: "./docs",
		clear: true,
		runOnCompile: true,
	},
};
