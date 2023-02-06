import abi from "../../backend/artifacts/contracts/IPNFTContract.sol/IP_NFTContract.json";

export const contractAddress = "0x9379d3c72De3132415304b02D8Df0E65d6913aFb";

export const brightlistConfig = {
	address: contractAddress,
	abi: abi.abi,
	functionName: "brightlist",
};

export const ownerConfig = {
	address: contractAddress,
	abi: abi.abi,
	functionName: "owner",
};
export const addToBrightlistConfig = {
	address: contractAddress,
	abi: abi.abi,
	functionName: "addToBrightlist",
};

export const removeFrombrightlistConfig = {
	address: contractAddress,
	abi: abi.abi,
	functionName: "removeFrombrightlist",
};

export const mintConfig = {
	address: contractAddress,
	abi: abi.abi,
	functionName: "safeMint",
	args: ["", ""],
};
