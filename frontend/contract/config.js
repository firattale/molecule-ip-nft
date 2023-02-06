import abi from "../../backend/artifacts/contracts/IPNFTContract.sol/IP_NFTContract.json";

export const contractAddress = "0x598e6025ef7bd45d3C16e49cEAD88b8a94549B91";

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
