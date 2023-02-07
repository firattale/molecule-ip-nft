import abi from "./abi.json";

export const contractAddress = "0x8b9FfeB16CbFe9e21ACb20e2e4cd8df3a8e03680";

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
