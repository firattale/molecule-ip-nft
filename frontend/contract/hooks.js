import { addToBrightlistConfig, removeFrombrightlistConfig, mintConfig } from "./config";
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from "wagmi";
import { useToast } from "@chakra-ui/react";

export const useAddBrightlist = (brightlistValue) => {
	const toast = useToast();

	const { config } = usePrepareContractWrite({ ...addToBrightlistConfig, args: [brightlistValue] });
	const { write, data } = useContractWrite({
		...config,
		onError(error) {
			toast({
				title: "Something went wrong.",
				description: "The user can't be brightlisted.",
				status: "error",
				duration: 8000,
				position: "top",
				isClosable: true,
			});
			console.log("Error", error.message);
		},
	});
	const { isLoading, isSuccess } = useWaitForTransaction({
		hash: data?.hash,
	});

	return {
		addToBrightlist: write,
		addToBrightlistLoading: isLoading,
		addToBrightlistSuccess: isSuccess,
		addToBrightlistData: data,
	};
};

export const useRemoveFromBrightlist = (revokeValue) => {
	const toast = useToast();

	const { config } = usePrepareContractWrite({ ...removeFrombrightlistConfig, args: [revokeValue] });
	const { write, data } = useContractWrite({
		...config,
		onError(error) {
			toast({
				title: "Something went wrong.",
				description: "The user can't be removed from brightlist.",
				status: "error",
				duration: 8000,
				position: "top",
				isClosable: true,
			});
			console.log("Error", error.message);
		},
	});

	const { isLoading, isSuccess } = useWaitForTransaction({
		hash: data?.hash,
	});
	return {
		removeFromBrightlistLoading: isLoading,
		removeFromBrightlist: write,
		removeFromBrightListSuccess: isSuccess,
		removeFromBrightListData: data,
	};
};

export const useMintNFT = () => {
	const toast = useToast();

	const { config } = usePrepareContractWrite(mintConfig);
	const writeConfig = {
		...config,
		args: ["", ""],
		onError(error) {
			toast({
				title: "Something went wrong.",
				description: "The NFT can't be minted.",
				status: "error",
				duration: 8000,
				position: "top",
				isClosable: true,
			});
			console.log("Error", error.message);
		},
	};
	const { write, data } = useContractWrite(writeConfig);

	const { isLoading, isSuccess } = useWaitForTransaction({
		hash: data?.hash,
	});
	return {
		mintNFTLoading: isLoading,
		mintNFT: write,
		mintNFTSuccess: isSuccess,
		mintNFTData: data,
		writeConfig: config,
	};
};
