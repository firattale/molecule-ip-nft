export const contractAddress = "0x59c90eF64Ab67a5760531B84497F9B5562902771";
import abi from "../../backend/artifacts/contracts/IPNFTContract.sol/IP_NFTContract.json";

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
