import abi from "./abi.json";

export const contractAddress = "0xf15958278c198fffF512EeB5aA2d7e5AE812BF6F";
// export const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

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
