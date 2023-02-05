export const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
import abi from "../../backend/artifacts/contracts/IPNFTContract.sol/IP_NFTContract.json";

export const brightlistConfig = {
	address: contractAddress,
	abi: abi.abi,
	functionName: "brightlist",
};
export const addToBrightlistConfig = {
	address: contractAddress,
	abi: abi.abi,
	functionName: "addToBrightlist",
};

export const mintConfig = {
	address: contractAddress,
	abi: abi.abi,
	functionName: "safeMint",
	args: ["", ""],
};
