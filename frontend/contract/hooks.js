import { addToBrightlistConfig, removeFrombrightlistConfig } from "./index";
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from "wagmi";
import { useToast } from "@chakra-ui/react";

export const useAddBrightlist = (brightlistValue) => {
	const toast = useToast();

	const { config } = usePrepareContractWrite({ ...addToBrightlistConfig, args: [brightlistValue] });
	const { write, data } = useContractWrite({
		...config,
		onSuccess(data) {
			console.log("Success", data);
			toast({
				description: "The user successfully brightlisted.",
				status: "success",
				duration: 8000,
				position: "top",
				isClosable: true,
			});
		},
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
		onSuccess(data) {
			console.log("Success", data);
			toast({
				description: "The user successfully removed from brightlist.",
				status: "success",
				duration: 8000,
				position: "top",
				isClosable: true,
			});
		},
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
