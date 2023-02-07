# Molecule IP-NFT

This a project to mint IP-NFTs and support researches. Any brightlisted researched can fill the form and mint their IP-NFTs.

You need to create your Alchemy and Infura account keys.

Project link: https://molecule-ip-nft.vercel.app/

Goerli Etherscan link: https://goerli.etherscan.io/address/0x8b9FfeB16CbFe9e21ACb20e2e4cd8df3a8e03680

One NFT already minted, you can check from the tokenURI under https://goerli.etherscan.io/address/0x8b9FfeB16CbFe9e21ACb20e2e4cd8df3a8e03680#readContract

Contact me to brightlist your address.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env.local file in frontend folder and .env file in backend folder. You can find example env variables under env.example file.

Backend:

- `ALCHEMY_API_KEY={YOUR_ALCHEMY_KEY}`
- `ETHERSCAN_API_KEY={YOUR_ETHERSCAN_KEY}`
- `PRIVATE_KEY={YOUR_GOERLI_ACCOUNT_KEY}`

Frontend:

- `NEXT_PUBLIC_ALCHEMY_API_KEY={YOUR_ALCHEMY_KEY}`
- `NEXT_PUBLIC_ALCHEMY_NETWORK=ETH_MAINNET`
- `NEXT_PUBLIC_DEFAULT_CHAIN=goerli`
- `NEXT_PUBLIC_IPFS_PROJECT_ID={YOUR_IPFS_PROJECT_ID}`
- `NEXT_PUBLIC_IPFS_PROJECT_SECRET={YOUR_IPFS_PROJECT_SECRET}`

## Run Locally

- Clone the repo to your local

```bash
  git clone https://github.com/firattale/molecule-ip-nft.git
```

- Install backend and frontend dependencies

```bash
  cd backend
  npm i
  ..
  cd frontend
  npm i
```

- Deploy smart contracts to Hardhat network in backend folder

```bash
  npm run build
  npm run node (keep it running)
  npm run deploy-local (in another terminal same folder)
```

Here you need to see contract deployment and its address successfully. Copy the contract address and paste it to here
https://github.com/firattale/molecule-ip-nft/blob/4377fd290bc7e193f4a6a48f4c105e4539e7e895/frontend/contract/config.js#L3

- Frontend

```bash
  cd frontend
  npm run dev
```

- You need to have a Metamask extension on your browser and import your locally running first account to your Metamask in order to use frontend as a deployer. Check FAQ.

## Deployment

To deploy this project's smart contract, get into the backend folder and run:

```bash
  Mainnet: npm run deploy
  Goerli: npm run deploy-testnet
  Hardhat: npm run deploy-local
```

## FAQ

#### How can I add my locally running Hardhat account to Metamask?

When you run your Hardhat node by npx hardhat node, it gives you 20 account filled with fake ETH.

Copy the first account private key (Account #0). Click on Import account on Metamask and paste the key there. Now you have the Hardhat account on your Metamask, but you need to also switch to Hardhat Network on the wallet.
https://support.chainstack.com/hc/en-us/articles/4408642503449-Using-MetaMask-with-a-Hardhat-node

## Roadmap

- Optimize gas consumption in smart contracts (merkle tree proof for whitelisting, use Bitmaps...)

- Add pausing mechanism

- Add Typescript and add Synpress to interact with Metamask e2e tests to Frontend
  https://github.com/Synthetixio/synpress

## Authors

- [@firattale](https://www.github.com/firattale)

## Documentation

[Documentation](https://github.com/firattale/molecule-ip-nft/tree/main/backend/docs)
